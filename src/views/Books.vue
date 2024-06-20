<script setup lang="ts">
import Menu from '@/components/navigation/Menu.vue'
import Header from '@/components/navigation/Header.vue'
</script>

<template>
  <Header></Header>
  <div id="content" class="w-full max-w-screen-2xl mx-auto">
    <div class="lg:flex">
      <div id="sidebar"
      class="lg:block fixed z-20 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 hidden">
      <Menu></Menu>
    </div>
    <div id="contentWrapper" class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
      <router-view></router-view>
    </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
