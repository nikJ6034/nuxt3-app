<script setup lang="ts">
import Member from '~~/types/member';
import Pageable from '~~/types/pageable';
import Role from '~~/types/role';

const {apiOptions} = useMyApi();

definePageMeta({
    middleware: ["auth"],
    layout: 'admin'
});

const roles = ref([] as Role[]);
const seleteRole = ref<Role>({} as Role);
const memberPage = ref<number>(1);
const memberSearchKeyword = ref("");
const selectMember = ref<Member>({} as Member)
const memberRoleModal = ref();

const {data : memberPageable} = await useAsyncData<Pageable<Member>>(
                    'member',
                    ()=> $fetch(`/api/members`, apiOptions({
                        method:"get" 
                        , params: {searchKeyword:memberSearchKeyword.value, page:memberPage.value, roleId:seleteRole.value.id}
                    }))
                    ,{initialCache:false}
                )

const refresh = () => refreshNuxtData('member')


async function goMemberPage(props: number){
    memberPage.value = props;
    refresh()
}

watch(()=>seleteRole.value, ()=>{
    refresh();
})

function openMemberRoleModal(member: Member){
    memberRoleModal.value.show();
    selectMember.value = member;
}

function closeMemberRoleModal(){
    selectMember.value = {} as Member;
}
</script>

<template>
    <div class="container-ufid card p-2">
        <div class="row">
            <div class="col-6">
                <RoleList v-model:selectRole="seleteRole" v-model:roles="roles" />
            </div>
            <div class="col-6" style='height:350px'>
                <div class="card h-100">
                    <div class="bg-warning p-2">
                        <div class="row justify-content-between">
                            <div class="col-10">
                                <input type="text" class="form-control" v-model="memberSearchKeyword" @keyup.enter="refresh">
                            </div>
                            <div class="col-auto">
                                <button @click="refresh" class="btn btn-primary">검색</button>
                            </div>
                        </div>
                    </div>
                    <div class='overflow-auto'>
                        <template v-for="(member) in memberPageable.content" :key="member.id">
                            <div class="container">
                                <div class="col">{{member.memberId}} // {{member.name}} // {{member.clientName}} <button class="btn btn-primary btn-sm" @click="openMemberRoleModal(member)">권한변경</button></div>
                            </div>
                        </template>
                    </div>
                    <BootstrapModal @hide="closeMemberRoleModal" modal-size="modal-lg" :v_footer="false" title="유저 권한관리" v-model="memberRoleModal">
                        <MemberRole :member="selectMember" :roles="roles" />
                    </BootstrapModal>
                </div>
            </div>
        </div>
    </div>
</template>