<template>
    <div class="flex flex-col items-center shadow-lg rounded-lg bg-white dark:bg-transparent dark:border-b dark:border-slate-50/10">
        <img class="w-full lg:w-[50rem]" :src="modelValue.image" :alt="modelValue.photoBy" />
        <span class="lg:text-lg text-slate-300">{{ modelValue.photoBy }}</span>
        <p class="p-4 lg:p-8 lg:font-medium lg:text-lg text-slate-500 dark:text-slate-200">{{ modelValue.word }}</p>
    </div>  
</template>
<script setup>
import { ref, reactive, defineProps } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { toggleNewWord } from '@/api/word'
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            return {
                _id: '',
                image: '',
                word: '',
                from: '',
                photoBy: ''
            }
        }
    }
})
</script>


<style lang='scss' scoped></style>