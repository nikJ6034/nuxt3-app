<script setup lang="ts">
const {$echarts} = useNuxtApp();

const chart = ref();

onMounted(function(){
    const myChart = $echarts.init(chart.value)
    myChart.setOption({
        title: {
            text: 'ECharts Getting Started Example'
        },
        tooltip: {},
        xAxis: {
            data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
        },
        yAxis: {},
        series: [
            {
            name: 'sales',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
            }
        ]
    });
})

</script>

<template>
    <div class="card p-2">
        <div>???</div>
        <div ref="chart" style="height: 400px; width: 400px;"></div>
    </div>
</template>