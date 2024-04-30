<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue"
import { defineComponent, ref } from "vue"
import Menu from '@/components/Menu.vue'
</script>

<template>
  <div class="me-menu">
    <Menu></Menu>
  </div>
  <div class="me-book">

    <router-view></router-view>
  </div>
</template>


<style lang="scss" scoped>
.me-menu {
  width: 16rem;
  height: 100%;
  padding: 1rem;
}
.me-book {
  flex: 1;
  margin: 1rem;
}
</style>
