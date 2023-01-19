<script setup>

const kakaoMap = ref(null);
const map = ref(null);

onMounted(function(){
    //트랜지션이 끝나기 전에 지도가 그려지면 지도 크기가 비정상으로 나오는 현상 때문에 setTimeout으로 딜레이 시킴
    //정확한 원인을 파악했지만.. 트랜지션이 끝나고 나서 발생하는 이벤트를 찾지못해서.. 이방법으로 일단은..
    setTimeout(() => {
        const options = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        map.value = new kakao.maps.Map(kakaoMap.value, options);
    }, 500);

})


</script>

<template>
    <div class="w-100 h-100">
        <div ref="kakaoMap" class="w-100 h-100"></div>
    </div>
</template>

<style>
</style>