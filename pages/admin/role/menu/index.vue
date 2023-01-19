<script setup lang="ts">
import { Menu } from '~~/types/menu';
import { ResultData } from '~~/types/resultData';
import Role from '~~/types/role';

const {apiOptions} = useMyApi();

definePageMeta({
    layout: 'admin'
});

const roles = ref([] as Role[])
const seleteRole = ref<Role>({} as Role);

const menuList = ref<Menu[]>([]);
const menuType = ref<string>("");
const selectMenu = ref(initMenu());
const menuRoleModal = ref();

const {data:menuTypeList} = await useFetch<any[]>(
                                ()=>`/api/menuType`
                                , apiOptions({
                                    method: "GET"
                                })
                            )

const {data:menuSeList} = await useFetch<any[]>(
                                ()=>`/api/menuSe`
                                , apiOptions({
                                    method: "GET"
                                })
                            )

function initMenu() : Menu{
    return {"useYn":true, menuOrder:1000, "menuSe":"DIRECTORY", "menuType":menuType.value, upperMenu: {id:null} as Menu, roleList:[], "visibleYn":true } as Menu;
}

async function selectMenuList(tab: string){
    const {data} = await useFetch<Menu[]>(
                        ()=>`/api/menus`
                        , apiOptions({
                            method: "GET",
                            params: {menuType:tab}
                        })
                    )

    menuList.value = data.value;
}

async function tabChange(tab: string){
    await selectMenuList(tab);
    selectMenu.value = initMenu();
}

function clickMenu(_menu: Menu){
    if(selectMenu.value.id == _menu.id){
        menuSelectCancel()
    }else{
        selectMenu.value = useCloneDeep(_menu);
    }
}

function addChildren(_menu: Menu){
    const cloneMenu = useCloneDeep(_menu);
    menuSelectCancel();
    selectMenu.value.menuOrder = cloneMenu.lowerMenu.length+1||1;
    selectMenu.value.upperMenu = cloneMenu;
    selectMenu.value.menuPath = cloneMenu.menuPath;
}

function menuSelectCancel(){
    selectMenu.value = initMenu();
}

function modifyMenu(){

    let method = "";
    let confirmMsg = "";

    if(selectMenu.value.id){
        method = "PUT"
        confirmMsg = "수정하시겠습니까?";
    }else{
        method = "POST"
        confirmMsg = "등록하시겠습니까?";
    }

    if(confirm(confirmMsg)){
        $fetch<ResultData<void>>(`/api/menus`
            , apiOptions({
                method,
                body: selectMenu.value
            })
        )
        .then((response)=>{
            alert(response.msg);
            menuSelectCancel();
            selectMenuList(selectMenu.value.menuType);
        })
        .catch((error)=>alert(error.data.msg))
    }

}

function removeMenu(_menu: Menu){
    if(confirm("삭제하시겠습니까?")){

        $fetch<ResultData<void>>(
            `/api/menus/${_menu.id}`
            , apiOptions({
                method: "DELETE"
            })
        ).then((response)=>{
            alert(response.msg);
            selectMenuList(selectMenu.value.menuType);
        }).catch((error)=>alert(error.data.msg))

    }
}

function openMenuRoleModal(){
    menuRoleModal.value.show();
}

//상위 메뉴를 변경하면 메뉴 오더를 가장마지막값(1000)으로 설정합니다.
function chageUpperMenu(){
    selectMenu.value.menuOrder = 1000
}

</script>

<template>
    <div class="container-ufid card p-2">
        <div class="row">
            <div class="col-6" style='height:350px;'>
                <BootstrapTab :tabs="menuTypeList" @tabChange="tabChange" v-model="menuType">
                    <div class="p-1">
                        <MenuList v-model:menus="menuList" @clickRow="clickMenu" @addChildren="addChildren" @removeRow="removeMenu"></MenuList>
                    </div>
                </BootstrapTab>
            </div>
            <div class="col-6">
                <RoleList v-model:selectRole="seleteRole" v-model:roles="roles" />
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-6" style='height:450px'>
                <input type="hidden" v-model="selectMenu.id">
                <div class="row">
                    <div class="col-3 text-center">상위메뉴</div>
                    <div class="col-9">
                        <MenuSelectBox :menus="menuList" v-model="selectMenu.upperMenu" @change="chageUpperMenu"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 text-center">메뉴구분</div>
                    <div class="col-9">
                        <select class="form-control" v-model="selectMenu.menuSe">
                            <option :selected="index==0"  v-for="(menuSe, index) in menuSeList" :value="menuSe.key">{{menuSe.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 text-center">메뉴이름</div>
                    <div class="col-9"><input class="form-control" type="text" v-model="selectMenu.menuNm"></div>
                </div>
                <div class="row">
                    <div class="col-3 text-center">메뉴경로</div>
                    <div class="col-9"><input class="form-control" type="text" v-model="selectMenu.menuPath"></div>
                </div>
                <div class="row">
                    <div class="col-3 text-center">메뉴설명</div>
                    <div class="col-9"><textarea rows="3" class="form-control" v-model="selectMenu.menuDesc"></textarea></div>
                </div>
                <div class="row">
                    <div class="col-3 text-center">사용여부</div>
                    <div class="col-9">
                        <select class="form-control" v-model="selectMenu.useYn">
                            <option selected value="true">사용</option>
                            <option value="false">미사용</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 text-center">노출여부</div>
                    <div class="col-9">
                        <select class="form-control" v-model="selectMenu.visibleYn">
                            <option selected value="true">예</option>
                            <option value="false">아니오</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 text-center">상속권한</div>
                    <div class="col-9">
                        <template v-for="(role) in selectMenu?.inheritRoleList">
                            <div class="badge bg-primary mt-1 me-1">{{role.roleName}}</div>
                        </template>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3 text-center">
                        <button class="btn btn-sm btn-success" @click="openMenuRoleModal">메뉴권한 추가</button>
                        <BootstrapModal modal-size="modal-lg" :v_footer="false" title="메뉴 권한관리" v-model="menuRoleModal">
                            <MenuRole :menu="selectMenu" :roles="roles"/>
                        </BootstrapModal>
                    </div>
                    <div class="col-9">
                        <template v-for="(role) in selectMenu?.roleList">
                            <div class="badge bg-primary mt-1 me-1">{{role.roleName}}</div>
                        </template>
                    </div>
                </div>
                <div class="row text-end">
                    <div>
                        <button class="btn btn-primary mt-2" @click="modifyMenu">{{(selectMenu.id)?"수정":"등록"}}</button>
                        <button class="btn btn-danger ms-2 mt-2" @click="menuSelectCancel">취소</button>
                    </div>
                </div>
            </div>
            <div class="col-6">
            </div>
        </div>
    </div>
</template>