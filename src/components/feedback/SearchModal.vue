<template>
  <div v-if="visible"
    class="flex flex-col lg:justify-start justify-end fixed top-0 left-0 inset-0 center z-50 backdrop-blur bg-black/20 dark:bg-transparent"
    @click.stop="closeModal">
    <div
      class="flex flex-col w-full lg:w-1/2 mx-auto lg:mt-[10%] max-h-full lg:max-h-[60%] shadow-lg rounded-lg bg-white dark:bg-neutral-800"
      @click.stop>
      <div class="flex px-6 py-4 border-b border-slate-100 dark:border-slate-300/10">
        <div class="flex flex-1 items-center">
          <RemixIcon name="search-line" class="leading-6"></RemixIcon>
          <input placeholder="输入关键字"
            class="flex flex-1 px-2 text-slate-600 dark:text-slate-300 dark:bg-transparent placeholder-slate-300 text-base focus:outline-none focus:border-transparent"
            v-model="searchKey" @keyup.enter="onSearch" ref="searchInput"></input>
        </div>
        <button
          class="rounded px-2 bg-slate-100 dark:bg-neutral-700 hover:bg-blue-300 dark:hover:bg-neutral-500 hover:text-slate-100"
          @click.stop="closeModal">
          <RemixIcon name="close-line" class="leading-6"></RemixIcon>
        </button>
      </div>
      <div class="flex flex-1 flex-col p-6 overflow-auto">
        <div v-if="!searchBooks || searchBooks.length < 1" class="text-center p-6">
          <p class="text-slate-300 text-base">没有搜索结果</p>
        </div>
        <ul v-else class="text-normal font-normal text-slate-600 dark:text-slate-300">
          <li v-for="(book, index) in searchBooks" :key=index>
            <a @click="openBook(book)"
              class="flex m-2 p-2 lg:p-4 hover:bg-blue-400 dark:hover:bg-neutral-600 dark:bg-neutral-700 rounded-lg hover:text-slate-100 shadow-sm"
              :class="{ 'bg-slate-100': activeItem.bookIdx !== index || activeItem.anchorIdx !== -1, 'bg-blue-500 dark:bg-neutral-500': activeItem.bookIdx === index && activeItem.anchorIdx === -1, 'text-slate-100': activeItem.bookIdx === index && activeItem.anchorIdx === -1 }">
              <div class="flex-1">
                <RemixIcon name="book-open-line" class="font-semibold mr-4 p-1 border-2 rounded hover:border-slate-100">
                </RemixIcon>
                <span>{{ book.title }}</span>
              </div>
              <RemixIcon name="arrow-right-s-line"></RemixIcon>
            </a>
            <ul v-if="book.anchors && book.anchors.length > 0" class="ml-4">
              <li v-for="(anchor, idx) in book.anchors" :key=idx
                class="pl-4 border-l-2 border-slate-100 dark:border-slate-300">
                <a @click="openAnchor(book, anchor)"
                  class="flex m-2 p-2 lg:p-4 hover:bg-blue-400 dark:hover:bg-neutral-600 dark:bg-neutral-700 rounded-lg hover:text-slate-100 shadow-sm"
                  :class="{ 'bg-slate-100': activeItem.bookIdx !== index || activeItem.anchorIdx !== idx, 'bg-blue-500 dark:bg-neutral-500': activeItem.bookIdx === index && activeItem.anchorIdx === idx, 'text-slate-100': activeItem.bookIdx === index && activeItem.anchorIdx === idx }">
                  <div class="flex-1">
                    <RemixIcon name="hashtag" class="font-semibold mr-4 p-1 border-2 rounded hover:border-slate-100">
                    </RemixIcon>
                    <span>{{ anchor.textContent }}</span>
                  </div>
                  <RemixIcon name="arrow-right-s-line"></RemixIcon>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="flex h-10 py-2 px-6 border-t border-slate-100 dark:border-slate-300/10 leading-6">
        <RemixIcon name="corner-down-left-line"
          class="px-2 mr-2 rounded shadow-sm shadow-slate-700 dark:shadow-slate-300"></RemixIcon>
        <span class="mr-8">选择</span>
        <RemixIcon name="arrow-down-line" class="px-2 mr-2 rounded shadow-sm shadow-slate-700 dark:shadow-slate-300">
        </RemixIcon>
        <RemixIcon name="arrow-up-line" class="px-2 mr-2 rounded shadow-sm shadow-slate-700 dark:shadow-slate-300">
        </RemixIcon>
        <span>上下移动</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, defineProps, watch, onBeforeMount, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import { searchBook } from '@/api/book'
import RemixIcon from '../common/RemixIcon.vue'
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  container: {
    // 允许传入一个选择器字符串或DOM引用
    type: [String, Object],
    default: 'body'
  }
})
let popupContainer = null;
const searchKey = ref("");
const searchBooks = ref([]);
const activeItem = ref();
const emits = defineEmits(['update:visible']);
const closeModal = () => {
  emits("update:visible", false);
}
const onSearch = () => {
  if (!searchKey.value) return;
  searchBook(searchKey.value).then((data) => {
    if (data && data.length >= 0) {
      searchBooks.value = data;
      activeItem.value = { bookIdx: 0, anchorIdx: -1 }
    }
  })
}
const openBook = (book) => {
  router.push({ path: `/books/${book.id}`, query: { appId: book.appId } });
  closeModal();
}
const openAnchor = (book, anchor) => {
  router.push({
    path: `/books/${book.id}`,
    query: { appId: book.appId, anchorId: anchor.id }
  });
  closeModal();
}
const handleKeyDown = (event) => {
  if (event.key === 'Escape') {
    closeModal();
    event.preventDefault();
  } else if (event.key === 'ArrowUp') {
    if (activeItem.value) {
      if (activeItem.value.anchorIdx > -1) {
        activeItem.value.anchorIdx--;
      } else if (activeItem.value.bookIdx > 0) {
        activeItem.value.bookIdx--;
        let currentBook = searchBooks.value[activeItem.value.bookIdx];
        if (currentBook && currentBook.anchors && currentBook.anchors.length > 0) {
          activeItem.value.anchorIdx = currentBook.anchors.length - 1;
        }
      }
    }
  } else if (event.key === 'ArrowDown') {
    if (activeItem.value) {
      let currentBook = searchBooks.value[activeItem.value.bookIdx];
      if (activeItem.value.anchorIdx < currentBook.anchors.length - 1) {
        activeItem.value.anchorIdx++;
      } else if (activeItem.value.bookIdx < searchBooks.value.length - 1) {
        activeItem.value.bookIdx++;
        activeItem.value.anchorIdx = -1
      }
    }
  } else if (event.key === 'Enter') {
    if (activeItem.value) {
      let currentBook = searchBooks.value[activeItem.value.bookIdx];
      if (activeItem.value.anchorIdx > -1) {
        openAnchor(currentBook, currentBook.anchors[activeItem.value.anchorIdx]);
      } else {
        openBook(currentBook);
      }
    }
  }
}
onBeforeMount(() => {
  document.addEventListener("keydown", handleKeyDown)
})
onMounted(() => {
  // 根据container属性决定最终的挂载节点
  if (typeof props.container === 'string') {
    popupContainer = document.querySelector(props.container);
  } else {
    popupContainer = props.container;
  }
  if (popupContainer) {
    popupContainer.appendChild(proxy.$el);
  } else {
    console.error('Invalid container specified for CustomPopup.');
  }
  proxy.$nextTick(() => {
    proxy.$refs.searchInput.focus();
  })
})
onBeforeUnmount(() => {
  document.removeEventListener("keydown", handleKeyDown);
  // 在组件销毁前，从容器中移除弹窗
  if (popupContainer && popupContainer.contains(proxy.$el)) {
    popupContainer.removeChild(proxy.$el);
    popupContainer = null;
  }
})
const { proxy } = getCurrentInstance();
watch(() => props.visible, (value, oldValue) => {
  if (value && value !== oldValue) {
    proxy.$nextTick(() => {
      proxy.$refs.searchInput.focus();
    })
  }
}, { immediate: true });
</script>


<style lang='scss' scoped></style>