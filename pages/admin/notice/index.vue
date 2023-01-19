<script setup lang="ts">
import Notice from '~~/types/notice';
import Pageable from '~~/types/pageable';

definePageMeta({
    layout: 'admin'
});

const {$dayjs} = useNuxtApp()
const router = useRouter();
const {apiOptions} = useMyApi();
const route = useRoute();
const aRoute = useActiveRoute();
//querystring 속성을 먼저 설정해줘야합니다. 꼭!
const query = ref({page:1, searchKeyword:'', ...aRoute.query});
const {data : noticePageable, refresh} = await useAsyncData<Pageable<Notice>>(
                'noticeList'
                , ()=> $fetch(`/api/notice`, apiOptions({
                    method:"get" 
                    , params:query.value
                })));

// const {data : noticePageable, refresh} = await useFetch<Pageable<Notice>>(
//                 ()=> `/api/notice`, apiOptions({
//                     method:"get" 
//                     , params:query.value
//                     , watch:[query]
//                 }));

//url이 변경되면 (정확히는 querystring) 데이터를 새로고침한다.
//이슈 : 해당 링크가 아닌 다른 페이지로 전환할 경우에도 해당 이벤트가 발생함.
//그럼에도 불구하고 아래 코딩이 있는 이유는 뒤로가기, 앞으로가기 버튼 클릭 시 설정된 파라미터 값이 설정된 후 해당페이지를 리로드해야함.
//부분해결 : useActiveRoute사용하여 다른페이지 전환시에 해양 아벤트가 발생하지않음. 다만 첫페이지 로딩 시 2번조회함.. ㅠㅠ 그래서 initialCache: true로 변경. --지금까지 한것 중 가장 베스트..
watch(()=> aRoute.query, function(){
    query.value = {page:1, searchKeyword:'', ...aRoute.query};
    refresh();
})

function goPage(){
    router.push({path:`/admin/notice`, query:query.value });
    //navigateTo({path:`/admin/notice`, query:{page:query.value.page} })
}

function searchKeyword(){
    query.value.page = 1;
    goPage();
}

function goDetail(id:number){
    router.push({path: `/admin/notice/${id}`})
}

</script>

<template>
    <div class="container-ufid card p-2">
        <h4>공지사항 목록</h4>
        <div class="row gx-1 justify-content-end">
            <div class="col-auto">
                <input v-model="query.searchKeyword" class="form-control" placeholder="검색어를 입력하세요" @keyup.enter="searchKeyword" />
            </div>
            <div class="col-auto">
                <button type="button" @click="searchKeyword" class="btn btn-dark">조회</button>
            </div>
        </div>

        <p class="fw-bold">전체 <em class="d-inline-block me-1">{{noticePageable.totalElements}}</em>건</p>

        <!-- List -->
        <div id="table">
            <table class="table board-list">
                <caption style="visibility:hidden">
                    공지사항 목록
                </caption>
                <colgroup>
                    <col>
                    <col>
                    <col>
                    <col>
                    <col>
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>사용여부</th>
                        <th>등록일</th>
                    </tr>
                </thead>
                <tbody>
                    <transition-group name="list">
                        <template v-for="(item, index) in noticePageable?.content" :key="item.id">
                            <tr @click="goDetail(item.id)">
                                <td>{{index+1}}</td>
                                <td>{{item.title}}</td>
                                <td>{{item.useYn}}</td>
                                <td>{{$dayjs(item.regDt).format('YYYY-MM-DD')}}</td>
                            </tr>
                        </template>
                    </transition-group>
                </tbody>
            </table>
        </div>
        <BootstrapPagenation v-model:page="query.page" :totalElements="noticePageable?.totalElements" @paginate="goPage"/>
        <!-- /List -->
        <div class="text-end">
            <NuxtLink to="/admin/notice/register"  class="btn btn-lg btn-primary">등록</NuxtLink>
        </div>
    </div>
</template>