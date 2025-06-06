<template>
  <div
    class="absolute z-20 top-0 lg:top-0 inset-x-0 flex justify-center lg:justify-end overflow-hidden pointer-events-none bg-slate-300"
  >
    <div class="w-[80rem] lg:w-[100rem] flex-none flex justify-end">
      <!-- <picture>
        <source srcset="./assets/bg-01.avif" type="image/avif">
        <img src="./assets/bg-01.avif" alt="" class="w-[70rem] flex-none max-w-none dark:hidden" decoding="async">
      </picture> -->
    </div>
  </div>
  <router-view></router-view>
</template>
<script setup>
import { ref, reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import initialize from './api/globalConfig'
import modal from '@/components/feedback/modal'
import { isChanged, change } from '@/common/status'
const router = useRouter()
const route = useRoute()
router.beforeEach((to, from, next) => {
  let reg = new RegExp(/^\/(books|book)/)
  if (reg.test(from.path)) {
    if (isChanged()) {
      modal.confirm({
        title: '提示',
        content: '您有未保存的修改，确定离开吗？',
        onOk: () => {
          change(false)
          next()
        },
        onCancel: () => {
          next(false)
        },
      })
    } else {
      next()
    }
  } else {
    next()
  }
})
onBeforeMount(() => {
  if (
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
  initialize(route, () => {
    localStorage.removeItem('me_token')
    router.replace('/login')
  })
})
</script>

<style lang="scss"></style>

