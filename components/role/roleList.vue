<script setup lang="ts">
import { ResultData, ResultType, ErrorData} from '~~/types/resultData';
import Role from '~~/types/role';

const {apiOptions} = useMyApi();

const roleAddModal = ref(null);
const modifyRole = ref({} as Role);

interface Props {
    selectRole?: Role
    roles?: Role[]
}



const props =  withDefaults(defineProps<Props>(),{
});

const emits = defineEmits<{
    (e:'update:selectRole', role: Role),
    (e:'clickRow', role: Role),
    (e:'update:roles', roles: Role[])
    }>();

/**
 * 권한 목록을 조회합니다.
 */
function selectRoles(){
    return useFetch<Role[]>(
        ()=>`/api/roles`
        ,apiOptions({
            method: "GET"
        })
    );
}

const {data: roles, refresh: rolesRefresh} = await selectRoles();
emits("update:roles", roles.value);


watch(()=> roles.value, function(value){
    emits("update:roles", value);
});

/**
 * 권한 등록/추가 팝업창을 엽니다.
 * @param role
 */
function addRole(role?: Role){

    if(role){
        //기존 데이터와 같이 수정되는 것을 막기위해 깊은 복사
        modifyRole.value = useCloneDeep(role);
    }else{
        modifyRole.value =  {} as Role;
    }
    
    roleAddModal.value.show();
}

/**
 * 권한을 등록/추가 합니다.
 */
async function saveRole(){

    let method = '';
    let confirmMsg = '';

    if(modifyRole.value.id){
        method = 'PUT';
        confirmMsg = '수정하시겠습니까?';
    }else{
        method = 'POST';
        confirmMsg = '등록하시겠습니까?';
    }

    if(confirm(confirmMsg)){

        const {data:result, error} = await useFetch<ResultData<Role>, ErrorData>(
                                        ()=>`/api/roles`
                                        ,apiOptions({
                                            method,
                                            body:modifyRole.value,
                                        })
                                    )

        if(error.value){
            const errorData = error.value as ErrorData;
            alert(errorData.data.msg)
            return
        }
        
        if(result.value.resultType == ResultType.SUCCESS){
            modifyRole.value = {} as Role;
            rolesRefresh();
            roleAddModal.value.hide();

        }
        alert(result.value.msg);
    }
}

/**
 * 권한을 삭제합니다.
 * @param role 
 */
async function removeRole(role: Role){
    if(confirm("삭제하시겠습니까?")){
        const {data:result} = await useFetch<ResultData<Role>>(
                                ()=>`/api/roles/${role.id}`
                                ,apiOptions({
                                    method: "DELETE",
                                })
                            )
        alert(result.value.msg);
        rolesRefresh();
    }
}

function clickRow(role: Role){
    if(props.selectRole.id == role.id){
        emits("update:selectRole",{} as Role);
    }else{
        emits("update:selectRole",role);
    }
    
    emits("clickRow",role);
    
}

const isActive = function(role: Role){
    return props.selectRole.id == role.id
}

</script>

<template>
    <div class="card h-100">
        <div class="text-end bg-warning">
            <div class="row">
                <div class="col">
                    <span class="m-2 float-start h5">역할</span>
                </div>
                <div class="col">
                    <button @click="addRole()" class="btn btn-sm btn-primary m-2">역할 추가</button>
                    <BootstrapModal v-model="roleAddModal" @submit="saveRole" modal-size="modal-lg" title="역할추가">
                        <div class="row">
                            <div class="col-3 text-center">역할 이름</div>
                            <div class="col-9"><input class="form-control" type="text" v-model="modifyRole.roleName"></div>
                        </div>
                        <div class="row">
                            <div class="col-3 text-center">역할</div>
                            <div class="col-9"><input class="form-control" :readonly="modifyRole.id!=null" type="text" v-model="modifyRole.roleValue"></div>
                        </div>
                    </BootstrapModal>
                </div>
            </div>
        </div>
        <div class="list-group overflow-auto">
            <template v-for="(role) in roles" :key="role.id">
                <div :class="['list-group-item list-group-item-action', isActive(role)?'active':'' ]" @click.stop="clickRow(role)">
                    <div class="row justify-content-between">
                        <div class="col my-auto">
                            {{role.roleName}} / {{role.roleValue}}
                        </div>
                        <div class="col-auto">
                            <button @click.stop="addRole(role)" class="btn btn-sm btn-primary me-1">수정</button>
                            <button @click.stop="removeRole(role)" class="btn btn-sm btn-danger">삭제</button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<style scoped lang="scss">
.list-group-item.active {
    background-color: #fdaa10;
    border-color: #fdaa10;
    color: #fff;
    z-index: 2;
}
</style>