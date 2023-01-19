<script setup lang="ts">
import AttachFile from '~~/types/attachFile';

interface Props {
    attachFileList?: AttachFile[]
}

const props = withDefaults(defineProps<Props>(),{
})

const emit = defineEmits<{
    (e:"update:attachFileList", attachFileList:AttachFile[])
}>();

function fileUpdate(event){

    const file: File = event.target.files[0]
    const attachFile: AttachFile = {orginName:file.name,size:file.size, delYn:false, order:props.attachFileList.length+1, file:file};
    props.attachFileList.push(attachFile);
    event.target.files = null
}

function removeFile(attachFile:AttachFile){
    if(attachFile.id){
        attachFile.delYn = true;
    }else{
        const indexOf : number = props.attachFileList.indexOf(attachFile);
        props.attachFileList.splice(indexOf, 1)
    }
}

function oderUp(attachFile:AttachFile){

    const indexOf : number = props.attachFileList.indexOf(attachFile);
    if(indexOf > 0){
        const beforAttachFile = props.attachFileList[indexOf-1];
        const beforOrder = beforAttachFile.order;
        beforAttachFile.order = attachFile.order;
        attachFile.order = beforOrder;
        emit("update:attachFileList",useOrderBy(props.attachFileList, ['order']))
    }
}

function oderDown(attachFile:AttachFile){
    const indexOf : number = props.attachFileList.indexOf(attachFile);
    if(indexOf < props.attachFileList.length){
        const afterAttachFile = props.attachFileList[indexOf+1];
        const afterOrder = afterAttachFile.order;
        afterAttachFile.order = attachFile.order;
        attachFile.order = afterOrder;
        emit("update:attachFileList",useOrderBy(props.attachFileList, ['order']))
    }
}

</script>

<template>
    <ol class="input-file-list">
        <li>
            <div class="file-input mt-2">
                <label>파일선택
                        <input type="file" name="attachFile" @change="fileUpdate">
                </label>
            </div>
        </li>
        <li v-if="attachFileList">
            <TransitionGroup name="list-file" tag="ul">
                <div v-for="(attachFile, index) in attachFileList" :key="attachFile.id">
                        <ul v-if="!attachFile.delYn">
                            {{attachFile.orginName}} <button class="btn btn-danger btn-sm" @click="removeFile(attachFile)">삭제</button>
                            <button class="btn btn-success btn-sm" @click="oderUp(attachFile)"><em class="bi bi-arrow-up"></em></button>
                            <button class="btn btn-danger btn-sm" @click="oderDown(attachFile)"><em class="bi bi-arrow-down"></em></button>
                        </ul> 
                </div>
            </TransitionGroup>
        </li>
    </ol>
</template>

<style scoped>

.list-file-move,
.list-file-enter-active,
.list-file-leave-active {
  transition: all 0.5s ease;
}

.list-file-enter-from,
.list-file-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-file-leave-active {
  position: absolute;
}

</style>