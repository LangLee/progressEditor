<template>
    <div id="header" class="sticky top-0 z-30 w-full max-w-screen-2xl mx-auto bg-white flex-none flex">
        <div
            class="hidden lg:flex flex-none pl-4 sm:pl-6 xl:pl-8 items-center border-b border-gray-200 lg:border-b-0 lg:w-60 xl:w-72">
            <div class="font-semibold text-3xl text-slate-500" @click="goHome">I Want progress</div>
        </div>
        <div class="flex-auto border-b border-gray-200 h-18 flex items-center px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
            <RemixIcon name="home-8-line" class="lg:hidden p-1 text-xl text-slate-400 hover:text-blue-300"
                @click="goHome"></RemixIcon>
            <button class=" text-slate-400 px-4 py-3 my-2" @click="onSearch" @keydown.meta.key="handleKeyDown">
                <RemixIcon name="search-line"></RemixIcon>
                <span class="px-3 text-normal">快速搜索一切</span>
                <span class="px-1 text-normal bg-slate-200 rounded">⌘K</span>
            </button>
        </div>
    </div>
    <SearchModal v-if="searching" v-model:visible="searching">
        <span>这是一个测试</span>
    </SearchModal>
</template>
<script setup>
import { ref, reactive, onBeforeMount, onBeforeUnmount } from 'vue'
import RemixIcon from '../common/RemixIcon.vue';
import SearchModal from '../feedback/SearchModal.vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const searching = ref(false);
const onSearch = () => {
    searching.value = true;
}
const onFinishSearch = () => {
    searching.value = false;
}
const goHome = () => {
    router.push('/schedule')
}
const handleKeyDown = (event) => {
    if (event.key === 'k' && event.metaKey) {
        searching.value = true;
        // 阻止事件冒泡
        event.preventDefault();
    }
}

onBeforeMount(()=>{
  document.addEventListener("keydown", handleKeyDown)
})
onBeforeUnmount(()=>{
  document.removeEventListener("keydown", handleKeyDown)
})
</script>


<style lang='scss' scoped></style>