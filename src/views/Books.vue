<script setup lang="ts">
import { ref } from 'vue'
import Menu from '@/components/navigation/Menu.vue'
import Header from '@/components/navigation/Header.vue'
import Search from '@/components/common/Search.vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const fold = ref(true);
const toggleFold = (float) => {
  if (float !== undefined) {
    fold.value = float;
    return;
  }
  fold.value = !fold.value;
}
const onMenuChange = (id, appId) => {
  let path = id ? `/books/${id}` : '/books'
  router.replace({
    path: path,
    query: {
      appId
    }
  })
}
</script>

<template>
  <Header @toggleFold="toggleFold" :fold="fold">
    <Search />
  </Header>
  <div id="content" class="w-full max-w-screen-2xl mx-auto">
    <div class="lg:flex">
      <Menu :editable="true" @toggleFold="toggleFold" :fold="fold" @menuChange="onMenuChange" :defaultSelected="false"></Menu>
      <div id="contentWrapper" class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible lg:pl-80">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>
