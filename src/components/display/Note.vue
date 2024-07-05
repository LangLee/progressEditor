<template>
    <div class="flex flex-col items-center shadow-lg p-2 lg:p-4 rounded-lg">
        <img class="w-full lg:w-[50rem]" :src="modelValue.image" :alt="modelValue.photoBy" />
        <span class="lg:text-lg text-slate-400 mb-2">{{ modelValue.photoBy }}</span>
        <p class="font-medium lg:font-bold lg:text-lg text-slate-600">{{ modelValue.word }}</p>
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