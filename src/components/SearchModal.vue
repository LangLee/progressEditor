<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 center z-50" :class="{ hidden: !visible }">
    <div class="flex flex-col w-full lg:w-1/2 mx-auto mt-40 shadow-lg rounded-lg bg-white">
      <div class="flex px-6 py-4 border-b border-slate-100 ">
        <div class="flex flex-1 items-center">
          <RemixIcon name="search-line" class="leading-6"></RemixIcon>
          <input placeholder="输入关键字"
            class="flex flex-1 px-2 text-slate-600 placeholder-slate-300 text-base focus:outline-none focus:border-transparent"
            v-model="searchKey" @keyup.enter="onSearch" autofocus></input>
        </div>
        <button class="rounded px-2 bg-slate-100 hover:bg-blue-300 hover:text-slate-100" @click="closeModal">
          <RemixIcon name="close-line" class="leading-6"></RemixIcon>
        </button>
      </div>
      <div class="flex flex-1 flex-col p-6 overflow-auto">
        <div v-if="!searchBooks || searchBooks.length < 1" class="text-center p-6">
          <p class="text-slate-300 text-base">没有搜索结果</p>
        </div>
        <ul v-else class="text-normal font-normal text-slate-600">
          <li v-for="(book, index) in searchBooks" :key={index}>
            <a href="#" @click="openBook(book)" class="flex m-2 p-4 bg-slate-50 hover:bg-blue-500 rounded hover:text-slate-100 shadow-sm">
              <div class="flex-1">
                <RemixIcon name="book-open-line" class="font-semibold mr-4 p-1 border-2 rounded hover:border-slate-100"></RemixIcon>
                <span>{{ book.title }}</span>
              </div>
              <RemixIcon name="arrow-right-s-line"></RemixIcon>
            </a>
            <ul v-if="book.anchors && book.anchors.length > 0" class="ml-4">
              <li v-for="(anchor, idx) in book.anchors" :key={idx} class="pl-4 border-l-2 border-slate-100">
                <a href="#" @click="openAnchor(book, anchor)" class="flex m-2 p-4 bg-slate-50 hover:bg-blue-500 rounded hover:text-slate-100 shadow-sm">
                  <div class="flex-1">
                    <RemixIcon name="hashtag" class="font-semibold mr-4 p-1 border-2 rounded hover:border-slate-100"></RemixIcon>
                    <span>{{ anchor.textContent }}</span>
                  </div>
                  <RemixIcon name="arrow-right-s-line"></RemixIcon>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="flex h-10 py-2 px-6 border-t border-slate-100 leading-6">
        <RemixIcon name="corner-down-left-line" class="px-2 mr-2 rounded shadow-sm shadow-slate-700"></RemixIcon>
        <span class="mr-8">选择</span>
        <RemixIcon name="arrow-down-line" class="px-2 mr-2 rounded shadow-sm shadow-slate-700"></RemixIcon>
        <RemixIcon name="arrow-up-line" class="px-2 mr-2 rounded shadow-sm shadow-slate-700"></RemixIcon>
        <span>上下移动</span>
      </div>
    </div>
  </div>
  <div class="fixed inset-0 z-40 bg-slate-300 opacity-50" :class="{ hidden: !visible }"></div>
</template>
<script setup>
import { ref, reactive, defineProps, watch, onBeforeMount, onBeforeUnmount } from 'vue'
import { searchBook } from '@/api/book'
import RemixIcon from './RemixIcon.vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})
const searchKey = ref("");
const searchBooks = ref([])
const emits = defineEmits(['update:visible']);
const closeModal = () => {
  emits("update:visible", false);
}
const onSearch = () => {
  if (!searchKey.value) return;
  searchBook(searchKey.value).then((data) => {
    if (data && data.length >= 0) {
      searchBooks.value = data
    }
  })
}
const openBook = (book) => {
  router.push(`/books/${book.id}`);
  closeModal();
}
const openAnchor = (book, anchor) => {
  router.push({
    path: `/books/${book.id}`,
    hash: `#${anchor.id}`
  });
  closeModal();
}
const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
  event.preventDefault();
}
onBeforeMount(()=>{
  document.addEventListener("keydown", handleKeyDown)
})
onBeforeUnmount(()=>{
  document.removeEventListener("keydown", handleKeyDown)
})
</script>


<style lang='scss' scoped></style>