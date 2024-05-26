<script setup lang="ts">
import Menu from '@/components/Menu.vue'
const onSearch = () => {
  console.log('search')
}
</script>

<template>
  <div id="header" class="sticky top-0 z-40 lg:z-50 w-full max-w-screen-2xl mx-auto bg-white flex-none flex">
    <div class="flex-none pl-4 sm:pl-6 xl:pl-8 flex items-center border-b border-gray-200 lg:border-b-0 lg:w-60 xl:w-72">
      <div class="font-semibold text-xl text-gray-900">This is a progress</div>
    </div>
    <div class="flex-auto border-b border-gray-200 h-18 flex items-center px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
      <input class="px-4 py-3 my-2 leading-5 border-none w-auto outline-none" type="text" placeholder="快速搜索" @keydown.enter="onSearch"/>
    </div>
  </div>
  <div id="content" class="w-full max-w-screen-2xl mx-auto">
    <div class="lg:flex">
      <div id="sidebar"
      class="fixed z-40 inset-0 flex-none h-full bg-black bg-opacity-25 w-full lg:bg-white lg:static lg:h-auto lg:overflow-y-visible lg:pt-0 lg:w-60 xl:w-72 lg:block hidden">
      <Menu></Menu>
    </div>
    <div id="contentWrapper" class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible">
      <router-view></router-view>
    </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
