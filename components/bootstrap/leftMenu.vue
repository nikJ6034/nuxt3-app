<script setup lang="ts">
import {Menu} from '~~/types/menu';
const currentMenu = useCurrentMenu();
const {menuRoleAccess} = useMyMenu();

interface Props{
    menus: Menu[],
    level?: number
}
const props = withDefaults(defineProps<Props>(), {
    level: 1
});

function hasChildDir(menu: Menu){
    return menu.lowerMenu.length > 0 && menu.menuSe == 'DIRECTORY'
}

function isMatch(menu: Menu){
    if(currentMenu.value?.depth){
        return currentMenu.value.depth.indexOf(menu.depth) > -1;
    }
}

function isRender(menu: Menu){
    return menuRoleAccess(menu) && menu.visibleYn
}

const isChild = computed(()=> (props.level > 1)?'children':'')

</script>

<template>
    <template v-for="(menu) in menus" >
        <ul class="m-0 list-group menu-ul">
            <li v-if="isRender(menu)" :class="['list-group-item list-group-item-action', isMatch(menu)?'active':'', isChild]" >
                <div :class="['menu-row', 'row', 'm-0']">
                    <template v-if="hasChildDir(menu)">
                        <div class="col">
                            <div :class="['menu-collaps', !isMatch(menu)?'collapsed':'']" type="button" data-bs-toggle="collapse" :href="`#collapse-${menu.id}`" :aria-expanded="isMatch(menu)">
                                {{menu.menuNm}}
                                <div class="menu-button d-inline-block">
                                    <em class="bi bi-chevron-down"></em>
                                </div>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="col">
                            <NuxtLink :to="menu.menuPath" class="d-block text-decoration-none">
                                {{menu.menuNm}} 
                            </NuxtLink>
                        </div>
                    </template>
                </div>
                <template v-if="hasChildDir(menu)">
                    <div :class="['collapse', isMatch(menu)?'show':'']" :id="`collapse-${menu.id}`" >
                        <BootstrapLeftMenu :menus="menu.lowerMenu" :level="level+1" />
                    </div>
                </template>
            </li>
        </ul>
    </template>
</template>

<style scoped lang="scss">
.list-group-item {
    padding: 0; border: 0;

    &.active a {
        color: #fff
    }

    &.children {
        background-color: #cecece;
        .menu-row {
            padding-left: 0.5rem;
        }
    }

    &.children.active {
        background-color: #494949
    }
}

.menu-row {
    line-height: 3rem;
    border: 1px solid #918f8f;
    .menu-collaps{
        .menu-button {
            transition: transform .2s ease-in-out;
        }
        &:not(.collapsed) {
            .menu-button {
                transform: rotate(-180deg);
            }
        }
    }
}
</style>