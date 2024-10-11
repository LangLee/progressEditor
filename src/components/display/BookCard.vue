<template>
    <div class="flex flex-row w-full rounded-lg shadow-lg mb-2 lg:mb-4 p-2 bg-white dark:bg-neutral-800">
        <div class="w-24 h-24 mr-2">
            <img v-if="book.image" class="w-full h-full rounded-lg" :src="book.image" alt="">
            </img>
            <svg v-else xmlns="http://www.w3.org/2000/svg"
                class="h-full" fill="none"
                viewBox="0 0 24 24" stroke="rgb(147 197 253)">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </div>
        <div class="flex-1 flex flex-col">
            <div class="lg:text-lg font-semibold text-slate-700 mb-2 dark:text-gray-200 ">{{ book.title }}</div>
            <div class="flex flex-row text-sm text-gray-400 dark:text-gray-500 mb-2">
                <!-- <span>{{ book.author }}</span> -->
                <span>{{ book.updateTime }}</span>
            </div>
            <div class="text-gray-500 dark:text-gray-400 text-sm">{{ book.description || '这是描述信息...' }}</div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps } from 'vue'
const props = defineProps({
    book: {
        type: Object,
        required: true
    }
})
</script>


<style lang='scss' scoped>

</style>