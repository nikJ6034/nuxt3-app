<script setup lang="ts">
import { Menu } from '~~/types/menu';


interface Props{
    modelValue?: Menu
    menus: Menu[],
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e:"update:modelValue",menu:Menu)
    (e:"upperMenuChage")
}>();

watch(()=> props.modelValue , function(value: Menu){
    emits("update:modelValue", value);
})

function upperMenuChage(){
    emits('upperMenuChage');
}

</script>

<template>
    <select class="form-control" v-model="modelValue.id">
        <option :value="null">-</option>
        <MenuOptionBox :menus="menus" />
    </select>
</template>