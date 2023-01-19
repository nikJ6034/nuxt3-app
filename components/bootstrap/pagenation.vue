<script setup lang="ts">

interface Props{
    page: any,
    totalElements?: number, //전체 게시물 수
    pageSize?: number,  //페이지네이션 링크 수
    numberOfElements?: number //화면에 보여지는 게시물 수
    pagenationOptions?: any
}

const props = withDefaults(defineProps<Props>(),{
    page: 1,
    totalElements: 0,
    pageSize: 10,
    numberOfElements: 10,
});

const emits = defineEmits<{
    (e:'paginate',value:number)
    (e:'update:page',value:number)
}>();

function paginate(pageNum: number){
    emits('update:page',pageNum)
    emits('paginate', pageNum);
}

//전체 페이지 수
const totalPages = computed<number>(()=> Math.ceil(props.totalElements/props.numberOfElements))
//이전 페이지 블록의 가장 끝 페이지 수
const beforePageBlockNumber = computed<number>(()=> Math.floor((props.page-1)/props.pageSize)*props.pageSize)
//이후 페이지 블록의 가장 첫 페이지 수
const afterPageBlockNumber = computed<number>(()=> (Math.floor((props.page-1)/props.pageSize)+1)*props.pageSize+1)

//첫 블록이 아닌경우 true
const isNotFirstBlock = computed<boolean>(()=> props.page > props.pageSize);

const isNotLastBlock = computed<boolean>(()=> (totalPages.value-afterPageBlockNumber.value) >= 0);

</script>

<template>
    <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
            <li v-if="isNotFirstBlock" class="page-item">
                <button class="page-link" type="button" aria-label="Previous" @click="paginate(1)">
                    <span aria-hidden="true">&lt;&lt;</span>
                </button>
            </li>
            <li v-if="isNotFirstBlock" class="page-item">
                <button class="page-link" type="button" aria-label="Previous" @click="paginate(beforePageBlockNumber)">
                    <span aria-hidden="true">&lt;</span>
                </button>
            </li>
            <template v-for="step in pageSize">
                <template v-if="(beforePageBlockNumber+step) <= totalPages">
                    <template v-if="(beforePageBlockNumber+step) == page">
                        <li class="page-item active" aria-current="page">
                            <span class="page-link">{{beforePageBlockNumber+step}}</span>
                        </li>
                    </template>
                    <template v-else>
                        <li class="page-item"><button class="page-link" type="button" @click="paginate(beforePageBlockNumber+step)">{{beforePageBlockNumber+step}}</button></li>
                    </template>
                </template>
            </template>
            <li v-if="isNotLastBlock" class="page-item">
                <button class="page-link" type="button" aria-label="Previous" @click="paginate(afterPageBlockNumber)">
                    <span aria-hidden="true">&gt;</span>
                </button>
            </li>
            <li v-if="isNotLastBlock" class="page-item">
                <button class="page-link" type="button" aria-label="Next" @click="paginate(totalPages)">
                    <span aria-hidden="true">&gt;&gt;</span>
                </button>
            </li>
        </ul>
    </nav>
</template>