<script setup lang="ts">
import Privilege from '~~/types/privilege';
import PrivilegeGroup from '~~/types/privilegeGroup';
import Role from '~~/types/role';
import {ResultData, ResultType } from '~~/types/resultData';

definePageMeta({
    layout: 'admin'
});

const {apiOptions} = useMyApi();
const selectPrivilegeGroup = ref<PrivilegeGroup>({} as PrivilegeGroup);
const selectedRole = ref<Role>({} as Role);

/**
 * 권한 목록을 조회합니다.
 */
function selectGroupPrivileges(){
    return useFetch<PrivilegeGroup[]>(
                ()=>`/api/group/privileges`
                ,apiOptions({
                    method: "GET"
                })
            );
}

/**
 * 역할별 권한 목록을 조회합니다.
 * @param roleId 
 */
function getRole(roleId: number){
    return useFetch<Role>(
                ()=>`/api/roles/${roleId}`
                ,apiOptions({
                    methods: "GET"
                })
            )
}

const {data: privilegeGroupList, refresh: privilegeGroupListRefresh} = await selectGroupPrivileges();

/**
 * 권한그룹을 클릭 시 일어나는 이벤트
 * @param privilegeGroup
 */
function clickPrivilegeGroup(privilegeGroup: PrivilegeGroup){
    if(selectPrivilegeGroup.value?.priGpName == privilegeGroup.priGpName){
        selectPrivilegeGroup.value = {} as PrivilegeGroup
    }else{
        selectPrivilegeGroup.value = privilegeGroup
    }
}

/**
 * 해당역할이 권한을 가지고 있는지 확인합니다.
 * @param privilege
 */
function hasPrivilege(privilege :Privilege): boolean{
    if(selectedRole.value.privilegeList == null){
        return false;
    }else{
        return selectedRole.value.privilegeList.some(function(item){
            return item == privilege.priValue
        })
    }
}

/**
 * 권한을 추가 또는 삭제합니다.
 * @param privilege
 */
function modifyPrivilege(privilege :Privilege){
    if(hasPrivilege(privilege)){
        const indexOf : number = selectedRole.value.privilegeList.findIndex(function(item){
            return item == privilege.priValue
        })
        selectedRole.value.privilegeList.splice(indexOf,1)
    }else{
        selectedRole.value.privilegeList.push(privilege.priValue)
    }

}

/**
 * 역할 선택 시 발생하는 이벤트
 */
watch(()=>selectedRole.value, async (value)=>{
    if(value.id){
        const {data: role} = await getRole(value.id);
        selectedRole.value.privilegeList = role.value.privilegeList
    }else{
        selectedRole.value.privilegeList = null;
    }
})

/**
 * 선택한 권한의 정보를 모두 저장합니다.
 */
function applyPrivilege(role: Role){
    if(!role?.id){
        alert('권한을 선택해주세요.')
    }else{
        
        $fetch<ResultData<void>>(
            `/api/roles/${role.id}/privileges`
            ,apiOptions({
                method: "POST",
                body: role.privilegeList
            })
        ).then((response)=>{
            alert(response.msg);
        })
        .catch((error)=>alert(error.data.msg))
        
    }
}

function privilegeGroupActive(privilegeGroup: PrivilegeGroup): string{
    if(selectPrivilegeGroup.value?.priGpName == privilegeGroup.priGpName){
        return "active";
    }else{
        return "";
    }
}
</script>

<template>
    <div class="container-ufid card p-2">
        <div class="content">
            <div class="row">
                <div class="col-6" style='height:350px'>
                    <RoleList v-model:selectRole="selectedRole" />
                </div>
                <div class="col-6" style='height:350px'>
                    <div class="card h-100">
                        <div class="text-end bg-warning">
                            <button @click="applyPrivilege(selectedRole)" class="btn btn-sm btn-primary m-2">저장</button>
                        </div>
                        <div class='list-group overflow-auto'>
                            <template v-for="(privilegeGroup) in privilegeGroupList" :key="privilegeGroup.id">
                                <div :class="['list-group-item list-group-item-action']">
                                    <div class="list-group">
                                        <div class="">{{privilegeGroup.priGpName}}</div>
                                        
                                        <template v-for="(privilege) in privilegeGroup.privilegeList">
                                            <div :class="['list-group-item list-group-item-action']">
                                                {{privilege.priName}} / {{privilege.priValue}}
                                                <template v-if="selectedRole.id">
                                                    <input type="checkbox" :checked="hasPrivilege(privilege)" @click="modifyPrivilege(privilege)"/>
                                                </template>
                                            </div>
                                        </template>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row mt-2">
                <div class="col-6" style='height:350px'>
                    <div class="card h-100">
                        <div class="text-end bg-warning">
                            <div>권한그룹 목록</div>
                        </div>
                        <div class="list-group" style='overflow-y:scroll'>
                            <template v-for="(privilegeGroup) in privilegeGroupList" :key="privilegeGroup.priGpName">
                                <div :class="['privilegeGroup-item','list-group-item list-group-item-action', privilegeGroupActive(privilegeGroup)]" >
                                    <div class="row justify-contnet-between" @click.stop="clickPrivilegeGroup(privilegeGroup)">
                                        <div class="col m-auto">
                                            <div >{{privilegeGroup.priGpValue}} / {{privilegeGroup.priGpName}}</div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card">
                        <div class="text-end bg-warning">
                            <div>권한</div>
                        </div>
                        <div class="list-group" style='height:300px; overflow-y:scroll'>
                            <div v-show="selectPrivilegeGroup.priGpName">
                                <div v-for="(privilege) in selectPrivilegeGroup.privilegeList" :key="privilege.priName">
                                    <div class="list-group-item">
                                        <div class="row justify-content-between">
                                            <div class="col my-auto">
                                                {{privilege.priName}} / {{privilege.priValue}}
                                                <template v-if="selectedRole.id">
                                                    <input type="checkbox" :checked="hasPrivilege(privilege)" @click="modifyPrivilege(privilege)"/>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">

.privilegeGroup-item.active {
    background-color: #fdaa10;
}

</style>