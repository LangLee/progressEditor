<template>
    <button class="text-slate-400 px-4 py-3 my-2" @click="onSearch" @keydown.meta.key="handleKeyDown">
        <RemixIcon name="search-line"></RemixIcon>
        <span class="px-3 text-normal">快速搜索一切</span>
        <span class="px-1 text-normal bg-slate-200 rounded">⌘K</span>
    </button>
    <SearchModal v-if="searching" v-model:visible="searching">
        <span>这是一个测试</span>
    </SearchModal>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import RemixIcon from '../common/RemixIcon.vue'
import SearchModal from '../feedback/SearchModal.vue'
const searching = ref(false);
const onSearch = () => {
    searching.value = true;
}
const handleKeyDown = (event) => {
    if (event.key === 'k' && event.metaKey) {
        searching.value = true;
        // 阻止事件冒泡
        event.preventDefault();
    }
}
onBeforeMount(() => {
    document.addEventListener("keydown", handleKeyDown)
})
onBeforeUnmount(() => {
    document.removeEventListener("keydown", handleKeyDown)
})
</script>
<style lang="scss"></style>