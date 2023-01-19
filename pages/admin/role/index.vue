<script setup lang="ts">
definePageMeta({
    layout: 'admin'
});

</script>

<template>
    <div class="container-ufid p-2 card">
            <div class="row">
                <div class="col-4">
                    <div class="card">
                        <NuxtLink to="/admin/role/group">그룹 권한관리</NuxtLink>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <NuxtLink to="/admin/role/privilege">역할 및 권한관리</NuxtLink>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                        <NuxtLink to="/admin/role/menu">메뉴 권한관리</NuxtLink>
                    </div>
                </div>
        </div>
        <div class="row">
                <div class="col-4">
                    <div class="card">
                        <NuxtLink to="/admin/role/user">유저 권한관리</NuxtLink>
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                    </div>
                </div>
                <div class="col-4">
                    <div class="card">
                    </div>
                </div>
        </div>
    </div>
</template>