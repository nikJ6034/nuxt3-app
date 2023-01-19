<script lang="ts" setup>
import Member from '~~/types/member';

definePageMeta({
    layout: 'admin'
});

let {apiUrl, apiOptions} = useMyApi();
const route = useRoute();

const {data: member} = await useFetch<Member>(
                            ()=>`/api/members/${route.params.id}`
                            , apiOptions({
                                method:"get" 
                            })
                        )

</script>

<template>
    <div class="container-ufid card p-2">
        <h4>회원관리 상세정보</h4>
        <table class="table">
            <caption></caption>
            <tbody>
                <tr>
                    <th class="text-center">아이디</th>
                    <td>{{member.memberId}}</td>
                </tr>
                <tr>
                    <th class="text-center">성명</th>
                    <td>{{member.name}}</td>
                </tr>
                <tr>
                    <th class="text-center">비밀번호</th>
                    <td>
                        <button type="button" class="btn btn-outline-dark" onclick="passwdErrCntReset()">비밀번호·오류횟수 초기화</button>
                    </td>
                </tr>
                <tr>
                    <th class="text-center">연락처<em class="uil-check"></em></th>
                    <td>{{member.mobile}}</td>
                </tr>
                <tr>
                    <th class="text-center">이메일<em class="uil-check"></em></th>
                    <td>{{member.email}}</td>
                </tr>
                <tr>
                    <th class="text-center">권한<em class="uil-check"></em></th>
                    <td>
                        <template v-for="(role , index) in member.roleList">
                            <div class="d-inline-block badge bg-secondary me-1">{{role.roleName}}</div>
                        </template>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="row justify-content-between">
            <div class="col-auto">
                <NuxtLink to="/admin/user" class="btn btn-dark">목록</NuxtLink>
            </div>
            <div class="col-auto">
                <button type="button" class="btn btn-warning">수정</button>
            </div>
        </div>
    </div>
</template>