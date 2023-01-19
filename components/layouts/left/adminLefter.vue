<script lang="ts" setup>
const router = useRouter();
const route = useRoute();
const {removeToken, isLogin, getUserInfo} = useMyAuth();
const adminMenu = useAdminMenu();

function logout(){
    removeToken();
    router.push('/login')
}

const islogin = isLogin();
</script>

<template>
    <div>
        <div class="m-3 userInfo-block">
            <template v-if="islogin">
                <h3>
                    <em class="bi bi-person-square">{{getUserInfo().userName}}</em>
                </h3>
            </template>
            <ul>
                <template v-if="islogin">
                    <li>
                        <button class="btn btn-success" @click="logout()">로그아웃</button>
                    </li>
                </template>
                <template v-else>
                    <li>
                        <NuxtLink class="btn btn-success" to="/login">로그인</NuxtLink>
                    </li>
                </template>
            </ul>
        </div>
        <div class="menu">
            <BootstrapLeftMenu :menus="adminMenu" />
        </div>
    </div>
</template>

<style scoped>
/* .vsm--dropdown {display: block;} */
/* .v-sidebar-menu .vsm--scroll {overflow-y: auto;}
.v-sidebar-menu {background-color: unset;} */
.menu { background-color: #ffffff;}
.userInfo-block {color: antiquewhite;}
</style>