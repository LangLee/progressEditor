<script setup lang="ts">
import { ref } from 'vue'
import Menu from '@/components/navigation/Menu.vue'
import Header from '@/components/navigation/Header.vue'
import Search from '@/components/common/Search.vue'
const fold = ref(true);
const toggleFold = (float)=>{
  if(float !== undefined) {
    fold.value = float;
    return;
  }
  fold.value = !fold.value;
}
</script>

<template>
  <Header @toggleFold="toggleFold" :fold="fold">
    <Search />
  </Header>
  <div id="content" class="w-full max-w-screen-2xl mx-auto">
    <div class="lg:flex">
      <!-- <div id="sidebar" @click="toggleFold"
      class="fixed top-16 bottom-0 backdrop-blur overflow-y-auto z-20 bg-black/20 w-full lg:w-80 transition-transform duration-300 ease-out delay-100 lg:translate-x-0" :class="floatMenu ? 'translate-x-0' : 'translate-x-[-100%]'"> -->
      <Menu :editable="true" @toggleFold="toggleFold" :fold="fold"></Menu>
    <!-- </div> -->
    <div id="contentWrapper" class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible lg:pl-80">
      <router-view></router-view>
    </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
