<script lang="ts" setup>
import Member from '~~/types/member';
import Pageable from '~~/types/pageable';
const router = useRouter();

definePageMeta({
    layout: 'admin'
});

const searchKeyword = ref("");
let {apiOptions} = useMyApi();

const page = ref<number>(1);

const {data : memberPageable, refresh} = await useFetch<Pageable<Member>>(
                                    ()=>`/api/members`
                                    , apiOptions({
                                        method:"get" 
                                        , params: {searchKeyword:searchKeyword.value, page:page.value}
                                    })
                                )


async function goPage(props: number){
    page.value = props;
    refresh()
}

function goDetail(id:number){
    router.push(`/admin/user/${id}`)
}

</script>

<template>
    <div class="container-ufid card p-2">
        <h4>회원관리 목록</h4>
        <div>
            <div class="row justify-content-end search-area">
                <div class="col-auto">
                    <input type="text" v-model="searchKeyword" class="form-control" placeholder="검색어를 입력해주세요." />
                </div>
                <div class="col-auto">
                    <button type="button" @click="refresh()" class="btn btn-dark">검색</button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="fw-bold">
                전체 <em class="d-inline-block me-1">{{memberPageable.totalElements}}</em>건
            </div>
        </div>

        <div id="table">
            <table id="list" class="table board-list" >
                <caption style="visibility: hidden">
                    회원관리 목록
                </caption>
                <colgroup>
                    <col/>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>목록</th>
                        <th>성명</th>
                        <th>아이디</th>
                        <th>상태</th>
                        <th>비밀번호오류횟수</th>
                        <th>회원가입일</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(item, index) in memberPageable.content" :key="item.id">
                        <tr @click="goDetail(item.id)">
                            <td>{{index}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.memberId}}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
        <BootstrapPagenation v-model:page="page" :totalElements="memberPageable?.totalElements" @paginate="goPage"/>
        <div class="text-end">
            <NuxtLink to="/admin/user/register" class="btn btn-orange">추가</NuxtLink>
        </div>
    </div>
</template>