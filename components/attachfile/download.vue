<script lang="ts" setup>
import AttachFile from '~~/types/attachFile';
let {apiOptions} = useMyApi();


interface Props {
    attachFileList?: AttachFile[]
}

const props = withDefaults(defineProps<Props>(),{
})

async function download(attachFile :AttachFile){

    const {data} = await useFetch<Blob>(
                            ()=>`/api/file/download?uuid=${attachFile.uuid}`
                            , apiOptions({
                                method:"get",
                                responseType: 'blob'
                            })
                        )

    const url = window.URL.createObjectURL(data.value);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', attachFile.orginName); //or any other extension
    document.body.appendChild(link);
    link.click();
}
</script>

<template>
    <ol class="input-file-list">
        <li v-if="attachFileList">
            <div v-for="(attachFile, index) in attachFileList" :key="index">
                    <ul v-if="!attachFile.delYn">
                        <a @click="download(attachFile)">
                            {{attachFile.orginName}}
                        </a>
                    </ul> 
            </div>
        </li>
    </ol>
</template>