<script setup lang="ts">

interface Props{
    modelValue?: string,
    tabs: any[]
}

const props = defineProps<Props>();

const emits = defineEmits<{
    (e:"tabChange", tab:string)
    (e:"update:modelValue", tab:string)
}>();

emits("tabChange", props.tabs[0].key);
emits("update:modelValue", props.tabs[0].key);

function tabChange(tab:string){
    emits("tabChange", tab);
    emits("update:modelValue", tab);
}



</script>

<template>
    <div style="height: inherit;" class="overflow-auto">
        <ul class="nav nav-tabs" role="tablist">
            <template v-for="(tab, index) in tabs" :key="index">
                <li class="nav-item" role="presentation" @click="tabChange(tab.key)">
                    <button :class="['nav-link', (index==0)?'active':'']" :id="`${tab.key}-tab`" data-bs-toggle="tab" :data-bs-target="`#${tab.key}`" type="button" role="tab" :aria-controls="tab.key" :aria-selected="index==0">{{tab.name}}</button>
                </li>
            </template>
        </ul>
        <div class="tab-content">
            <div class="tab-pane fade show active"  role="tabpanel">
                <slot/>
            </div>
        </div>
    </div>
</template>