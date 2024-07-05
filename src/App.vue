<template>
  <div class="absolute z-20 top-0 lg:top-0 inset-x-0 flex justify-center lg:justify-end overflow-hidden pointer-events-none">
    <div class="w-[80rem] lg:w-[100rem] flex-none flex justify-end">
      <picture>
        <source srcset="./assets/bg-01.avif" type="image/avif">
        <img src="./assets/bg-01.avif" alt="" class="w-[70rem] flex-none max-w-none dark:hidden" decoding="async">
      </picture>
    </div>
  </div>
  <router-view></router-view>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import initialize from './api/globalConfig'
const router = useRouter();
const route = useRoute();
onBeforeMount(() => {
  initialize(route, () => {
    localStorage.removeItem("me_token")
    router.replace('/login')
  });
})
</script>


<style lang='less' scoped></style>