<script setup lang="ts">

import { ResultData, ResultType, ErrorData} from '~~/types/resultData';
import RoleGroup from '~~/types/roleGroup';

const {apiOptions} = useMyApi();

const roleGroupAddModal = ref(null);
const modifyRoleGroup = ref({} as RoleGroup);

interface Props {
    selectedRoleGroup?: RoleGroup
    roleGroups?: RoleGroup[]
}

const props =  withDefaults(defineProps<Props>(),{
});

const emits = defineEmits<{
    (e:'update:selectedRoleGroup', roleGroup: RoleGroup),
    (e:'clickRow', roleGroup: RoleGroup),
    (e:'update:roleGroups', roleGroups: RoleGroup[])
    }>();

/**
 * 권한 목록을 조회합니다.
 */
function selectRoleGroups(){
    return useFetch<RoleGroup[]>(
        ()=>`/api/roleGroups`
        ,apiOptions({
            method: "GET"
        })
    );
}

const {data: roleGroups, refresh: refresh} = await selectRoleGroups();

emits("update:roleGroups", roleGroups.value);


watch(()=> roleGroups.value, function(value){
    emits("update:roleGroups", value);
});

function clickRow(roleGroup: RoleGroup){
    if(props.selectedRoleGroup.id == roleGroup.id){
        emits("update:selectedRoleGroup",{} as RoleGroup);
    }else{
        emits("update:selectedRoleGroup",roleGroup);
    }
    emits("clickRow",roleGroup);
    
}

const isActive = function(roleGroup: RoleGroup){
    return props.selectedRoleGroup.id == roleGroup.id
}

/**
 * 권한그룹 등록/추가 팝업창을 엽니다.
 * @param role
 */
function addRoleGroup(roleGroup?: RoleGroup){
    if(roleGroup){
        //기존 데이터와 같이 수정되는 것을 막기위해 깊은 복사
        modifyRoleGroup.value = useCloneDeep(roleGroup);
    }else{
        modifyRoleGroup.value =  {} as RoleGroup;
    }
    
    roleGroupAddModal.value.show();
}

/**
 * 권한을 등록/추가 합니다.
 */
async function saveRoleGroup(){

    let method = '';
    let confirmMsg = '';

    if(modifyRoleGroup.value?.id){
        method = 'PUT';
        confirmMsg = '수정하시겠습니까?';
    }else{
        method = 'POST';
        confirmMsg = '등록하시겠습니까?';
    }

    if(confirm(confirmMsg)){

        const {data:result, error} = await useFetch<ResultData<RoleGroup>, ErrorData>(
                                        ()=>`/api/roleGroups`
                                        ,apiOptions({
                                            method,
                                            body:modifyRoleGroup.value,
                                        })
                                    )

        if(error.value){
            const errorData = error.value as ErrorData;
            alert(errorData.data.msg)
            return
        }
        
        if(result.value.resultType == ResultType.SUCCESS){
            modifyRoleGroup.value = {} as RoleGroup;
            refresh();
            roleGroupAddModal.value.hide();

        }
        alert(result.value.msg);
    }
}

/**
 * 권한을 삭제합니다.
 * @param role 
 */
async function removeRoleGroup(roleGroup: RoleGroup){
    if(confirm("삭제하시겠습니까?")){
        const {data:result} = await useFetch<ResultData<RoleGroup>>(
                                ()=>`/api/roleGroups/${roleGroup.id}`
                                ,apiOptions({
                                    method: "DELETE",
                                })
                            )
        alert(result.value.msg);
        refresh();
    }
}

</script>

<template>
    <div class="card h-100">
        <div class="text-end bg-warning">
            <div class="row">
                <div class="col">
                    <span class="m-2 float-start h5">역할그룹 목록</span>
                </div>
                <div class="col">
                    <button @click="addRoleGroup()" class="btn btn-sm btn-primary m-2">역할그룹 추가</button>
                    <BootstrapModal v-model="roleGroupAddModal" @submit="saveRoleGroup" modal-size="modal-lg" title="역할추가">
                        <div class="row">
                            <div class="col-3 text-center">역할그룹 이름</div>
                            <div class="col-9"><input class="form-control" type="text" v-model="modifyRoleGroup.groupName"></div>
                        </div>
                        <div class="row">
                            <div class="col-3 text-center">역할그룹 설명</div>
                            <div class="col-9"><input class="form-control" type="text" v-model="modifyRoleGroup.groupDesc"></div>
                        </div>
                    </BootstrapModal>
                </div>
            </div>
        </div>
        <div class="list-group overflow-auto">
            <template v-for="(roleGroup) in roleGroups" :key="roleGroup.id">
                <div :class="['list-group-item list-group-item-action', isActive(roleGroup)?'active':'' ]" @click.stop="clickRow(roleGroup)">
                    <div class="row justify-content-between">
                        <div class="col my-auto">
                            {{roleGroup.groupName}}
                        </div>
                        <div class="col-auto">
                            <button @click.stop="addRoleGroup(roleGroup)" class="btn btn-sm btn-primary me-1">수정</button>
                            <button @click.stop="removeRoleGroup(roleGroup)" class="btn btn-sm btn-danger">삭제</button>
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