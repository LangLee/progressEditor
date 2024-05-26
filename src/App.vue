<template>
  <router-view></router-view>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router';
import initialize from './api/globalConfig'
const router = useRouter();
onBeforeMount(()=>{
  initialize(()=>{
    localStorage.removeItem("me_token")
    router.replace('/login')
  });
})
</script>


<style lang='less' scoped></style>