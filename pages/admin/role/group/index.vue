<script lang="ts" setup>
import Privilege from '~~/types/privilege';
import { ErrorData, ResultData, ResultType } from '~~/types/resultData';
import Role from '~~/types/role';
import RoleGroup from '~~/types/roleGroup';


const {apiOptions} = useMyApi();

definePageMeta({
    middleware: ["auth"],
    layout: 'admin'
});

const roleGroups = ref([] as RoleGroup[]);
const selectedRoleGroup = ref({} as RoleGroup);
const privilegeList = ref([] as Privilege[]);


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

const differenceRole = computed(() => {
    return useDifferenceBy(roles.value, selectedRoleGroup.value.roleList, 'id')
})

async function saveRoleGroupRoleList(){

    if(confirm('저장하시겠습니까?')){

        const {data:result, error} = await useFetch<ResultData<RoleGroup>, ErrorData>(
                                        ()=>`/api/roleGroups/${selectedRoleGroup.value.id}/roleList`
                                        ,apiOptions({
                                            method:'POST',
                                            body:selectedRoleGroup.value,
                                        })
                                    )

        if(error.value){
            const errorData = error.value as ErrorData;
            alert(errorData.data.msg)
            return
        }
        
        if(result.value.resultType == ResultType.SUCCESS){
            

        }
        alert(result.value.msg);
    }
}

function removeRole(role: Role){
    useRemove(selectedRoleGroup.value.roleList, function(n){
        return n.id == role.id;
    })
}

function appendRole(role: Role){
    selectedRoleGroup.value.roleList.push(role);
}



</script>

<template>
    <div class="container-ufid card p-2">
        <div class="row">
            <div class="col-6">
                <RoleGroupList v-model:selectedRoleGroup="selectedRoleGroup" v-model:roleGroups="roleGroups"/>
            </div>
            <div class="col-6" style='height:350px'>
                <div class="card h-100">
                    <div class="text-end bg-warning">
                        <div class="row">
                            <div class="col">
                                <span class="m-2 float-start h5">역할그룹별 권한 목록</span>
                            </div>
                        </div>
                    </div>
                    <div class="list-group overflow-auto">
                        <template v-for="(pv) in privilegeList" :key="pv.priValue">
                            <div :class="['list-group-item list-group-item-action']" @click.stop="">
                                <div class="row justify-content-between">
                                    <div class="col my-auto">
                                        {{pv.priName}} / {{pv.priValue}}
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-6">
                <div class="card h-100">
                    <div class="text-end bg-warning">
                        <div class="row">
                            <div class="col">
                                <span class="m-2 float-start h5">역할그룹별 역할 목록</span>
                            </div>
                            <div class="col">
                                <button v-if="selectedRoleGroup.id" @click="saveRoleGroupRoleList()" class="btn btn-sm btn-primary m-2">저장</button>
                            </div>
                        </div>
                    </div>
                    <div class="list-group overflow-auto">
                        <template v-for="(role) in selectedRoleGroup.roleList" :key="role.id">
                            <div :class="['list-group-item list-group-item-action']" @click.stop="">
                                <div class="row justify-content-between">
                                    <div class="col my-auto">
                                        {{role.roleName}} / {{role.roleValue}}
                                    </div>
                                    <div class="col-auto">
                                        <button @click.stop="removeRole(role)" class="btn btn-sm btn-danger">삭제</button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card h-100">
                    <div class="text-end bg-warning">
                        <div class="row">
                            <div class="col">
                                <span class="m-2 float-start h5">역할 목록</span>
                            </div>
                        </div>
                    </div>
                    <div class="list-group overflow-auto">
                        <template v-for="(role) in differenceRole" :key="role.id">
                            <div :class="['list-group-item list-group-item-action']" @click.stop="">
                                <div class="row justify-content-between">
                                    <div class="col my-auto">
                                        {{role.roleName}} / {{role.roleValue}}
                                    </div>
                                    <div class="col-auto">
                                        <button @click.stop="appendRole(role)" class="btn btn-sm btn-primary">추가</button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
