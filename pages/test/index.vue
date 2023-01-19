<script lang="ts" setup>
  const router = useRouter();
  const data  = "data"
  let count  = ref(0)
  const msg = "메시지 입니다."
  const toMain = function(): void {
    router.push("/")
  }

  const testEvent = (arg:object)=>{
  console.log(arg)
  }
</script>

<template>
  <div class="card p-2">
    <button type="button" class="btn btn-primary" @click="toMain">Primary</button>
    테스트 페이지입니다.{{data}}{{count}}
    <NuxtLink to="/">메인페이지 이동</NuxtLink>
  </div>
</template>


