<script setup>
const map = ref(null);

function setMap(arg){
    map.value = arg;
}

</script>

<template >
    <div class="card p-2">
        <div>카카오맵</div>
        <div style="width: 100%; height: 300px;">
            <MapKakaoMap></MapKakaoMap>
        </div>
    </div>
</template>

<style>

</style>