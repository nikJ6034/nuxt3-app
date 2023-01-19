s<template>
    <div>
        <NuxtLayout>
            <NuxtPage/>
        </NuxtLayout>
    </div>
</template>
<style>
/* 기본 페이지 전환 효과입니다. */
.page-enter-from{
    opacity: 0;
    transform: translateX(-50%);
}

.page-enter-active,
.page-leave-active {
    transition: all 0.3s;
}
.page-enter,
.page-leave-to {
    opacity: 0;
    transform: translateX(-50%);
}

/* 레이아웃 트랜지션 기본 효과입니다. */
.layout-enter-from{
    opacity: 0;
    transform: translateX(-50%);
}

.layout-enter-active,
.layout-leave-active {
    transition: all 0.3s;
}
.layout-enter,
.layout-leave-to {
    opacity: 0;
    transform: translateX(-50%);
}

/* 기본 트랜지션 그룹 효과입니다. */
.list-move,
.list-enter-active {
    transition: all 0.5s ease;
}

.list-enter-from {
    opacity: 0;
    transform: translateX(-50%);
}

.list-enter,
.list-leave-to {
    opacity: 0;
    transform: translateX(50%);
}
</style>