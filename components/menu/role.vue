<script lang="ts" setup>
import { Menu } from '~~/types/menu';
import Role from '~~/types/role';

const {apiOptions} = useMyApi();

interface Props {
    menu: Menu,
    roles: Role[]
}

const props = defineProps<Props>()

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

function hasRole(role: Role): boolean{

    return props.menu.roleList.some(function(item){
        if(item.id == role.id){
            return true;
        }
    })
}

function checkRole(role: Role): void{
    if(hasRole(role)){
        const indexOf : number = props.menu.roleList.findIndex(function(item){
            return item.id == role.id
        })
        props.menu.roleList.splice(indexOf,1)
    }else{
        props.menu.roleList.push(role)
    }
}

</script>

<template>
    <div>
        <div class="container overflow-auto">
            <template v-for="(role) in roles" :key="role.id">
                <div class="row">
                    <div class="col-8">
                        {{role.roleName}} / {{role.roleValue}}
                    </div>
                    <div class="col-4 text-end">
                        <input type="checkbox" :checked="hasRole(role)" @click="checkRole(role)"/>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>