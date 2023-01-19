<script lang="ts" setup>
import Notice from '~~/types/notice';
const route = useRoute();

definePageMeta({
    layout: 'admin'
});

const {$dayjs, $router} = useNuxtApp()
let {apiOptions} = useMyApi();
const noticeId = ref(route.params.id);

const {data : notice} = await useFetch<Notice>(
                            ()=>`/api/notice/${noticeId.value}`
                            , apiOptions({
                                method:"get"
                            })
                        )


function deleteNotice(){
    alert(`공지사항을 삭제합니다. ${noticeId.value}`)
}

</script>

<template>
    <div class="container-ufid card p-2">
        <h4>공지사항 상세</h4>
        <table class="table">
            <caption>게시물 읽기</caption>
            <tr>
                <td>사용여부</td>
                <td colspan="3">{{(notice?.useYn)?'사용':'미사용'}}</td>
            </tr>
            <tr>
                <td>게시기간</td>
                <td colspan="3">
                    {{$dayjs(notice?.beginDt).format('YYYY년 MM월 DD일 HH시')}} ~
                    {{$dayjs(notice?.endDt).format('YYYY년 MM월 DD일 HH시')}}
                </td>
            </tr>
            <tr>
                <td colspan="4" class="subject">{{notice?.title}}</td>
            </tr>
            <tr>
                <td colspan="4" class="view-info">
                    <ul>
                        <li><strong>등록자</strong>{{notice?.regNm}}</li>
                        <li><strong>등록일</strong>{{$dayjs(notice?.regDt).format('YYYY년 MM월 DD일 HH시')}}</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td colspan="4" class="content" v-html="notice?.content"></td>
            </tr>
            <tr>
                <td>첨부파일</td>
                <td>
                    <AttachfileDownload :attachFileList="notice?.attachFileList" />
                </td>
            </tr>
        </table>
        <div class="row justify-content-between">
            <div class="col-auto">
                <NuxtLink to="/admin/notice/" class="btn btn-dark">목록</NuxtLink>
            </div>
            <div class="col-auto">
                <NuxtLink class="btn btn-primary" :to="`/admin/notice/register?id=${noticeId}`">수정</NuxtLink>
                <button type="button" class="btn btn-light" @click="deleteNotice">삭제</button>
            </div>
        </div>
    </div>
</template>

<style></style>