<script setup lang="ts">
import Notice from '~~/types/notice';
import AttachFile from '~~/types/attachFile';
import { ResultData } from '~~/types/resultData';

definePageMeta({
    layout: 'admin'
});

let {apiOptions} = useMyApi();
const router = useRouter();
const route = useRoute();
const notice = ref<Notice>({content:'', attachFileList: [] } as Notice );
const noticeId = ref(route.query.id)
let noticeRefresh = null;
if(noticeId.value){
    const {data: result, refresh} = await useFetch<Notice>(
                                ()=>`/api/notice/${noticeId.value}`
                                , apiOptions({
                                    method:"get"
                                })
                            )
    notice.value = result.value;
    noticeRefresh = refresh;
}

const save = async ()=> {
    let confirmMsg: string;
    let method: string;
    if(!notice.value.id){
        confirmMsg = '등록하시겠습니까?'
        method = "POST"
    }else{
        confirmMsg = '수정하시겠습니까?'
        method = "PUT"
    }

    if(confirm(confirmMsg)){
        let formData = new FormData();
        let noticeBlob = new Blob([JSON.stringify(notice.value)], { type: "application/json"});
        formData.append('notice', noticeBlob);

        notice.value.attachFileList.forEach(function(attachFile : AttachFile){
            formData.append('attachFileList', attachFile.file);
        })

        await $fetch<ResultData<number>>(
                "/api/notice"
                ,apiOptions({
                    method,
                    body: formData
                })
            )
            .then((result)=>{
                alert(result.msg)
                if(result.resultType == "SUCCESS"){
                    noticeRefresh()
                    router.push(`/admin/notice/${result.data}`)
                }
            })
            .catch((error)=> alert(error.data.msg))

    }
}

</script>

<template>
    <div class="container-ufid card p-2">
        <div class="row-table">
            <table class="table">
                <caption>게시물 등록/수정</caption>
                <colgroup>
                    <col>
                    <col>
                </colgroup>
                <tbody>
                    <tr>
                        <th><label for="useYn">사용여부</label><em class="uil-check"></em></th>
                        <td>
                            <select v-model="notice.useYn" class="form-control">
                                <option value="true">사용</option>
                                <option value="false">미사용</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>게시기간<em class="uil-check"></em></th>
                        <td>
                            <Datepicker v-model="notice.beginDt" :format="'yyyy년MM월dd일 HH시'" :locale="'ko-KR'" class="form-control w-25 in-block" />
                            ~
                            <Datepicker v-model="notice.endDt" :format="'yyyy년MM월dd일 HH시'" :locale="'ko-KR'" class="form-control w-25 in-block" />
                        </td>
                    </tr>
                    <tr>
                        <th>제목<em class="uil-check"></em></th>
                        <td><input v-model="notice.title" maxlength="250" class="form-control width-full"/></td>
                    </tr>
                    <tr>
                        <th>내용<em class="uil-check"></em></th>
                        <td>
                            <TuiEditor v-model="notice.content"></TuiEditor>
                        </td>
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td>
                            <AttachfileMultiAttachFile v-model:attachFileList="notice.attachFileList"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="row justify-content-between">
            <div class="col-auto">
                <template v-if="noticeId">
                    <NuxtLink :to="`/admin/notice/${noticeId}`" class="btn btn-danger">취소</NuxtLink>
                </template>
                <template v-else>
                    <NuxtLink to="/admin/notice" class="btn btn-primary">목록</NuxtLink>
                </template>
            </div>
            <div class="col-auto">
                <button type="button" @click.once="save" class="btn btn-primary">저장</button>
            </div>
        </div>
    </div>
</template>