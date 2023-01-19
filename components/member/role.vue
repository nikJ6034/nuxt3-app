<script lang="ts" setup>
import Member from '~~/types/member';
import { ResultData } from '~~/types/resultData';
import Role from '~~/types/role';

const {apiOptions} = useMyApi();

interface Props {
    member: Member,
    roles: Role[]
}

const props = defineProps<Props>()

const memberDetail = ref({} as Member);


watch(()=> props.member, async function(member: Member){
    if(member.id){
        const {data} = await useFetch<Member>(
            ()=>`/api/members/${member.id}`
            , apiOptions({
                method: 'get'
            }) 
        )

        memberDetail.value = data.value
    }
})

function hasRole(role: Role): boolean{

    return memberDetail.value.roleList.some(function(item){
        if(item.id == role.id){
            return true;
        }
    })
}

function checkRole(role: Role): void{
    if(hasRole(role)){
        const indexOf : number = memberDetail.value.roleList.findIndex(function(item){
            return item.id == role.id
        })
        memberDetail.value.roleList.splice(indexOf,1)
    }else{
        memberDetail.value.roleList.push(role)
    }
}

async function mdofiyMemberRole(){

    if(confirm('수정하시겠습니까?')){
        const {data, error} = await useFetch<ResultData<void>>(
                                    ()=>`/api/role/members`
                                    , apiOptions({
                                        method: 'POST',
                                        body: memberDetail.value
                                    })
                                )

        if(error.value){
            alert(error.value.data.msg)
            return
        }

        alert(data.value.msg)
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
                        <template v-if="member.id">
                            <input type="checkbox" :checked="hasRole(role)" @click="checkRole(role)"/>
                        </template>
                    </div>
                </div>
            </template>
            <div class="">
                <button class="btn btn-primary" @click="mdofiyMemberRole">저장</button>
            </div>
        </div>
    </div>
</template>