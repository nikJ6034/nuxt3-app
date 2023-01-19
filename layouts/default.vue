<script lang="ts" setup>
const {$router} = useNuxtApp();
const {removeToken, isLogin, getUserInfo} = useMyAuth();

function logout(){
    removeToken();
    $router.push('/login')
}

</script>

<template>
    <div>
        <template v-if="isLogin()">
            <button class="btn btn-success" @click="logout">로그아웃</button>
            <NuxtLink class="btn btn-success ms-2" to="/admin/main">관리자 페이지</NuxtLink>
        </template>
        <template v-else>
            <NuxtLink class="btn btn-success ms-2" to="/login">로그인</NuxtLink> | 
        </template>
        <NuxtLink class="btn btn-success ms-2" to="/">홈</NuxtLink>
        <NuxtLink class="btn btn-success ms-2" to="/map">지도</NuxtLink>
        <slot />
        <div>푸터!</div>
    </div>
</template>
