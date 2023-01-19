<script setup lang="ts">
import { Menu } from '~~/types/menu';
import { ResultData } from '~~/types/resultData';

const {apiOptions} = useMyApi();

interface Props{
    menus: Menu[],
    level?: number
}

const props = withDefaults(defineProps<Props>(),{
    level: 1
});

const emits = defineEmits<{
    (e:"clickRow", menu: Menu),
    (e:"addChildren", menu: Menu),
    (e:"removeRow", menu: Menu),
    (e:"orderUp", menus: Menu[], menu?: Menu),
    (e:"orderDown", menus: Menu[], menu?: Menu),
    (e:"update:menus", menus: Menu[]),
}>();

function clickRow(menu: Menu){
    emits("clickRow", menu);
}

function addChildren(menu: Menu){
    emits("addChildren", menu);
}

function removeRow(menu: Menu){
    emits("removeRow", menu);
}

function listUp(_menus: Menu[], _menu: Menu){
    const indexOf : number = _menus.indexOf(_menu);
    if(indexOf > 0){
        const beforItem = _menus[indexOf-1];
        const beforOrder = beforItem.menuOrder;
        beforItem.menuOrder = _menu.menuOrder;
        _menu.menuOrder = beforOrder;
        const list = useOrderBy(_menus, ['menuOrder'])
        emits("update:menus", list);
        emits("orderUp", list, _menu);
        return list;
    }else{
        return false;
    }
}

function listDown(_menus: Menu[], _menu: Menu){
    const indexOf : number = _menus.indexOf(_menu);
    if(indexOf < _menus.length){
        const afterItem = _menus[indexOf+1];
        const afterOrder = afterItem.menuOrder;
        afterItem.menuOrder = _menu.menuOrder;
        _menu.menuOrder = afterOrder;
        const list = useOrderBy(_menus, ['menuOrder'])
        emits("update:menus", list);
        emits("orderDown", list, _menu);
        return list;
    }else{
        return false;
    }
}

function orderUp(_menus: Menu[], _menu: Menu){
    const list = listUp(_menus,_menu);
    if(list){
        updateOrder(list, _menu, listDown);
    }

}

function orderDown(_menus: Menu[], _menu: Menu){
    const list = listDown(_menus,_menu);
    if(list){
        updateOrder(list, _menu, listUp);
    }
}

async function updateOrder(_menus: Menu[], _menu: Menu, errorCallback: Function){
    const {error} = await useFetch<ResultData<void>>(
                                    ()=>`/api/menus/order`
                                    , apiOptions({
                                        method:"PUT",
                                        body: _menus
                                    })
                                )
    if(error.value){
        alert(error.value.data.msg)
        setTimeout(()=> errorCallback(_menus,_menu), 0)
    }
}

const menuSeIcon = (menu: Menu) : string => {
    if(menu.menuSe == 'DIRECTORY'){
        return "bi-folder";
    }else if(menu.menuSe == 'PAGE'){
        return "bi-file-earmark-post-fill";
    }else if(menu.menuSe == 'LINK'){
        return "bi-link";
    }else if(menu.menuSe == 'CONTENT'){
        return "bi-body-text";
    }else{
        return "";
    }
}

const menuVisibleIcon = (menu: Menu) : string => {
    if(menu.visibleYn){
        return "bi-eye-fill";
    }else{
        return "bi-eye-slash-fill";
    }
}

</script>

<template>
    <ul v-if="menus != null && menus.length > 0" class="list-group">
        <TransitionGroup name="list-menu" tag="li">
            <template v-for="(menu, index) in menus" :key="menu.id">
                <li class="mt-2 list-group-item">
                    <div class="row g-0 menu-row justify-content-between p-1">
                        <div class="col m-auto">
                            <div @click.prevent="clickRow(menu)"><em :class="['me-1 bi', menuSeIcon(menu) ]"></em><em :class="['me-1 bi', menuVisibleIcon(menu) ]"></em>{{menu.menuNm}} <span class="badge rounded-pill bg-success">{{menu.menuPath}}</span> </div>
                        </div>
                        <div class="col-auto">
                            <a href="#" class="text-decoration-none me-2" @click.prevent="addChildren(menu)"><em class="bi bi-plus-square"></em></a>
                            <a href="#" class="text-decoration-none text-danger me-2" @click.prevent="removeRow(menu)"><em class="bi bi-dash-square"></em></a>
                            <template v-if="menus.length > 1">
                                <a v-if="index > 0" href="#" class="text-decoration-none me-1" @click.prevent="orderUp(menus, menu)"><em class="bi bi-arrow-up"></em></a>
                                <a v-if="(index+1) < menus.length" href="#" class="text-decoration-none text-danger" @click.prevent="orderDown(menus, menu)"><em class="bi bi-arrow-down"></em></a>
                            </template>
                        </div>
                    </div>
                    <!-- 재귀 컴포넌트의 경우에는 이벤트를 반드시 함수형으로 불러야합니다. 안그러면 계층별로 전체가 호출되어버림.-->
                    <MenuList v-model:menus="menu.lowerMenu" :level="level+1" @clickRow="clickRow" @addChildren="addChildren" @removeRow="removeRow" @orderUp="()=>orderUp" @orderDown="()=>orderDown" />
                </li>
            </template>
        </TransitionGroup>
    </ul>
</template>

<style scoped lang="scss" >

.list-group {
    padding-left: 1rem;
}

.list-group-item {
    padding: 0;
    border: 0;
}

.menu-row {
    border: 1px solid #918f8f;
}


.list-menu-move,
.list-menu-enter-active,
.list-menu-leave-active {
  transition: all 0.5s ease;
}

.list-menu-enter-from,
.list-menu-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-menu-leave-active {
  position: absolute;
}
</style>