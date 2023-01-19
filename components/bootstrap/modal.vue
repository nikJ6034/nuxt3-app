<script setup lang="ts">
const {$bs} = useNuxtApp();

type MODAL_SIZE = 'modal-sm'|''|'modal-lg'|'modal-xl'|'modal-fullscreen';
type MODAL_VERTICAL = ''|'modal-dialog-centered'
type MODAL_SCROLLING = ''|'modal-dialog-scrollable'

interface CustomModal {
    modelValue?: any,
    v_headerBtnClose?: boolean,
    v_footerBtnClose?: boolean,
    v_header?: boolean,
    v_footer?: boolean,
    closeBtnName?:string,
    submitBtnName?:string,
    title?:string,
    modalSize?:MODAL_SIZE,
    modalVertical?:MODAL_VERTICAL,
    modalScrolling?:MODAL_SCROLLING
}

const props = withDefaults(defineProps<CustomModal>(),{
    v_headerBtnClose: true,
    v_footerBtnClose: true,
    v_header: true,
    v_footer: true,
    closeBtnName: '닫기',
    submitBtnName:'저장',
    title: '제목',
    modalSize: '',
    modalVertical:'',
    modalScrolling:''
})

const modalRef = ref();
const emits = defineEmits<{
    (e:"submit")
    , (e:"show")
    , (e:"shown")
    , (e:"hide")
    , (e:"hidden")
    , (e:"open")
    , (e:'update:modelValue', modal:any)
}>();

onMounted(function(){
    const modal = new $bs.Modal(modalRef.value);
    emits("update:modelValue", modal)

    modalRef.value.addEventListener('show.bs.modal', function(){
        emits("show")
    })

    modalRef.value.addEventListener('shown.bs.modal', function(){
        emits("shown")
    })

    modalRef.value.addEventListener('hide.bs.modal', function(){
        emits("hide")
    })

    modalRef.value.addEventListener('hidden.bs.modal', function(){
        emits("hidden")
    })

})

function submit(){
    emits("submit")
}



</script>

<template>
    <div ref="modalRef" class="modal fade" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div :class="['modal-dialog', modalSize, modalVertical, modalScrolling]">
            <div class="modal-content">
                <div v-if="v_header" class="modal-header">
                    <slot name="header" >
                            <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
                            <button v-if="v_headerBtnClose" type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </slot>
                </div>
                <div class="modal-body">
                    <slot/>
                </div>
                <div v-if="v_footer" class="modal-footer">
                    <slot name="footer" >
                            <button v-if="v_footerBtnClose" type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{closeBtnName}}</button>
                            <button type="button" class="btn btn-primary" @click="submit">{{submitBtnName}}</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- 
간단 html 예제
<template v-slot:header>
    헤더랍니다~
</template> 
<div>
 바디~~
</div>
<template v-slot:footer>
    푸터~~
</template> 
-->