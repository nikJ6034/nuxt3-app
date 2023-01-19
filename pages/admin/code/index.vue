<script lang="ts" setup>
import CommonCode from '~~/types/commonCode';
import Pageable from '~~/types/pageable';
import { ResultData, ResultType } from '~~/types/resultData';
import UpperCode from '~~/types/upperCode';

const {apiOptions} = useMyApi();
definePageMeta({
    layout: 'admin'
});

const page = ref<number>(1);

const selectUpperCode = ref<UpperCode>({} as UpperCode);
const modifyUpperCode = ref<UpperCode>({} as UpperCode);
const upperCodeAddModal = ref(null);


//부모코드 목록을 조회합니다.
const {data:upperCodeList, refresh:upperCodeListRefresh} = await useFetch<Pageable<UpperCode>>( 
                                                                ()=>'/api/code/upperCode'
                                                                , apiOptions({
                                                                    method:"GET"
                                                                })
                                                            );

async function findUpperCode(id: number){
    const {data:upperCode} = await useFetch<UpperCode>(
                                        ()=>`/api/code/upperCode/${id}`
                                        , apiOptions({
                                            method:"GET"
                                        })
                                    );
    return upperCode.value;
}

/**
 * 부모코드를 수정 또는 추가하는 팝업창을 열고 수정할 값을 셋팅합니다.
 */
function addUpperCode(upperCode: UpperCode= {} as UpperCode){
    modifyUpperCode.value = useCloneDeep(upperCode);
    upperCodeAddModal.value.show();
}

/**
 * 부모코드를 수정합니다.
 */
async function saveUpperCode(){
    let method = '';
    let confirmMsg = '';

    if(modifyUpperCode.value.id){
        method = 'PUT';
        confirmMsg = '수정하시겠습니까?';
    }else{
        method = 'POST';
        confirmMsg = '등록하시겠습니까?';
    }

    if(confirm(confirmMsg)){

        $fetch<ResultData<UpperCode>>(
            `/api/code/upperCode`
            ,apiOptions({
                method,
                body:modifyUpperCode.value,
            })
        ).then((response)=>{
            if(response.resultType == ResultType.SUCCESS){
                modifyUpperCode.value = {} as UpperCode;
                upperCodeListRefresh();
                upperCodeAddModal.value.hide();
            }
            alert(response.msg);
        }).catch((error)=>alert(error.data.msg))
    }
}

/**
 * 선택된 값일경우 true를 반환합니다.
 */
function isActive(upperCode: UpperCode){
    return selectUpperCode.value?.id == upperCode.id
}

/**
 * 클릭시 selectUpperCode에 값을 설정합니다.
 */
async function clickRow(upperCode: UpperCode){
    if(selectUpperCode.value.id == upperCode.id){
        selectUpperCode.value = {} as UpperCode;
    }else{
        selectUpperCode.value = upperCode
        const code = await findUpperCode(upperCode.id);
        selectUpperCode.value.codeList = code.codeList
    }
}

/**
 * 부모코드를 삭제합니다.
 */
function removeUpperCode(upperCode: UpperCode){

    if(confirm("삭제하시겠습니까?")){

        $fetch<ResultData<number>>(
            `/api/code/upperCode/${upperCode.id}`
            ,apiOptions({
                method:"DELETE"
            })
        ).then((response)=>{
            if(response.resultType == ResultType.SUCCESS){
                upperCodeListRefresh();
            }
            alert(response.msg);
        }).catch((error)=>alert(error.data.msg))

    }

}

function goPage(props: number){
    page.value = props;
    upperCodeListRefresh()
}



const commonCodeAddModal = ref(null);
const modifyCommonCode = ref<CommonCode>({} as CommonCode);

/**
 * 자식코드를 수정 또는 추가하는 팝업창을 열고 수정할 값을 셋팅합니다.
 */
function addCommonCode(commonCode: CommonCode = {} as CommonCode){
    modifyCommonCode.value = useCloneDeep(commonCode);
    commonCodeAddModal.value.show();
}

/**
 * 자식코드를 수정합니다.
 */
async function saveCommonCode(){
    let method = '';
    let confirmMsg = '';

    if(modifyCommonCode.value.id){
        method = 'PUT';
        confirmMsg = '수정하시겠습니까?';
    }else{
        method = 'POST';
        confirmMsg = '등록하시겠습니까?';

        modifyCommonCode.value.upperCodeId = selectUpperCode.value.id
    }

    if(confirm(confirmMsg)){

        $fetch<ResultData<UpperCode>>(
            `/api/code/commonCode`
            ,apiOptions({
                method,
                body:modifyCommonCode.value,
            })
        ).then(async (response)=>{
            if(response.resultType == ResultType.SUCCESS){
                modifyCommonCode.value = {} as CommonCode;
                const code = await findUpperCode(selectUpperCode.value.id);
                selectUpperCode.value.codeList = code.codeList
                commonCodeAddModal.value.hide();
            }
            alert(response.msg);
        }).catch((error)=>alert(error.data.msg))
    }
}

/**
 * 자식코드를 삭제합니다.
 */
function removeCommonCode(commonCode: CommonCode){

    if(confirm("삭제하시겠습니까?")){

        $fetch<ResultData<number>>(
            `/api/code/commonCode/${commonCode.id}`
            ,apiOptions({
                method:"DELETE"
            })
        ).then(async (response)=>{
            if(response.resultType == ResultType.SUCCESS){
                const code = await findUpperCode(selectUpperCode.value.id);
                selectUpperCode.value.codeList = code.codeList
            }
            alert(response.msg);
        }).catch((error)=>alert(error.data.msg))
    }

}

</script>

<template>
    <div class="container-ufid card p-2">
        <div class="row">
            <div class="col-6">
                <div class="card h-100">
                    <div class="text-end bg-warning">
                        <button @click="addUpperCode()" class="btn btn-sm btn-primary m-2">부모코드 추가</button>
                        <BootstrapModal v-model="upperCodeAddModal" @submit="saveUpperCode" modal-size="modal-lg" title="부모코드 추가">
                            <div class="row">
                                <div class="col-3 text-center">부모 코드</div>
                                <div class="col-9"><input class="form-control" type="text" :readonly="modifyUpperCode.id!=null" v-model="modifyUpperCode.code"></div>
                            </div>
                            <div class="row">
                                <div class="col-3 text-center">부모코드 이름</div>
                                <div class="col-9"><input class="form-control"  type="text" v-model="modifyUpperCode.name"></div>
                            </div>
                            <div class="row">
                                <div class="col-3 text-center">부모코드 설명</div>
                                <div class="col-9"><textarea class="form-control"  type="text" v-model="modifyUpperCode.desc"></textarea></div>
                            </div>
                        </BootstrapModal>
                    </div>
                    <div class="list-group overflow-auto">
                        <template v-for="(upperCode) in upperCodeList?.content" :key="upperCode.id">
                            <div :class="['list-group-item list-group-item-action', isActive(upperCode)?'active':'' ]" @click.stop="clickRow(upperCode)">
                                <div class="row justify-content-between">
                                    <div class="col my-auto">
                                        {{upperCode.name}} / {{upperCode.code}}
                                    </div>
                                    <div class="col-auto">
                                        <button @click.stop="addUpperCode(upperCode)" class="btn btn-sm btn-primary me-1">수정</button>
                                        <button @click.stop="removeUpperCode(upperCode)" class="btn btn-sm btn-danger">삭제</button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="mt-2">
                        <BootstrapPagenation v-model:page="page" :totalElements="upperCodeList?.totalElements" @paginate="goPage"/>
                    </div>
                </div>
            </div>
            <div class="col-6">
                <div class="card h-100">
                    <div class="text-end bg-warning">
                        <button v-if="selectUpperCode.id" @click="addCommonCode()" class="btn btn-sm btn-primary m-2">자식코드 추가</button>
                        <BootstrapModal v-model="commonCodeAddModal" @submit="saveCommonCode" modal-size="modal-lg" title="자식코드 추가">
                            <div class="row">
                                <div class="col-3 text-center">부모 코드</div>
                                <div class="col-9">{{selectUpperCode.name}}</div>
                            </div>
                            <div class="row">
                                <div class="col-3 text-center">자식 코드</div>
                                <div class="col-9"><input class="form-control" type="text" :readonly="modifyCommonCode.id!=null" v-model="modifyCommonCode.code"></div>
                            </div>
                            <div class="row">
                                <div class="col-3 text-center">자식코드 이름</div>
                                <div class="col-9"><input class="form-control"  type="text" v-model="modifyCommonCode.name"></div>
                            </div>
                            <div class="row">
                                <div class="col-3 text-center">자식코드 설명</div>
                                <div class="col-9"><textarea class="form-control"  type="text" v-model="modifyCommonCode.desc"></textarea></div>
                            </div>
                        </BootstrapModal>
                    </div>
                    <div class="list-group overflow-auto">
                        <template v-for="(commonCode) in selectUpperCode?.codeList" :key="commonCode.id">
                            <div :class="['list-group-item list-group-item-action']">
                                <div class="row justify-content-between">
                                    <div class="col my-auto">
                                        {{commonCode.name}} / {{commonCode.code}}
                                    </div>
                                    <div class="col-auto">
                                        <button @click.stop="addCommonCode(commonCode)" class="btn btn-sm btn-primary me-1">수정</button>
                                        <button @click.stop="removeCommonCode(commonCode)" class="btn btn-sm btn-danger">삭제</button>
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

<style scoped lang="scss">

.list-group-item.active {
    background-color: #fdaa10;
}

</style>
