<script setup lang="ts">
import { Menu } from '~~/types/menu';


interface Props{
    level?: number
    menus: Menu[],
}

const props = withDefaults(defineProps<Props>(),{
    level: 0
});

</script>

<template>
        <template v-for="(menu) in menus" :key="menu.id" >
            <option :value="menu.id">
                <template v-for="lv in level">&nbsp;&nbsp;&nbsp;&nbsp;</template>
                {{menu.menuNm}}
            </option>
            <MenuOptionBox :menus="menu.lowerMenu" :level="level+1" />
        </template>
</template>