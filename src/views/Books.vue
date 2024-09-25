<template>
  <Header @toggleFold="toggleFold" :fold="fold">
    <Search />
  </Header>
  <div id="content" class="w-full max-w-screen-2xl mx-auto">
    <div class="lg:flex">
      <Menu :editable="!published" :share="published" @toggleFold="toggleFold" :fold="fold" @menuChange="onMenuChange" :defaultSelected="published"></Menu>
      <div id="contentWrapper" class="min-w-0 w-full flex-auto lg:static lg:max-h-full lg:overflow-visible lg:pl-80">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Menu from '@/components/navigation/Menu.vue'
import Header from '@/components/navigation/Header.vue'
import Search from '@/components/common/Search.vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const fold = ref(true);
const props = defineProps({
  published: {
    type: Boolean,
    default: false
  }
})
const toggleFold = (float) => {
  if (float !== undefined) {
    fold.value = float;
    return;
  }
  fold.value = !fold.value;
}
const onMenuChange = (id, appId) => {
  let path = props.published?'/share':'/books';
  path = id ? `${path}/${id}` : path;
  router.replace({
    path: path,
    query: {
      appId
    }
  })
}
</script>


<style lang="scss" scoped></style>
