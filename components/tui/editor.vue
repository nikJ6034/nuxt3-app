<script setup lang="ts">
import { EditorType, PreviewStyle } from '@toast-ui/editor';
import '@toast-ui/editor/dist/toastui-editor.css'
const {$Editor} = useNuxtApp();
const editorBox = ref(null);
let editor = null

interface Props {
    modelValue: string,
    height?: string,
    previewStyle?: PreviewStyle
    initialEditType?: EditorType
}

const props = withDefaults(defineProps<Props>(),{
    height: '500px',
    previewStyle: 'vertical',
    initialEditType: 'wysiwyg',
});

const emit = defineEmits<{
                (e:'update:modelValue', content:string)
            }>()

onMounted(function(){

    editor = new $Editor({
        el: editorBox.value,
        previewStyle: props.previewStyle,
        height: props.height,
        initialValue: props.modelValue,
        initialEditType: props.initialEditType
    })

    editor.on("change", function(editType: EditorType, content: string){
        emit("update:modelValue", editor.getHTML());
    })

});

</script>

<template>
        <div ref="editorBox">

        </div>
</template>
