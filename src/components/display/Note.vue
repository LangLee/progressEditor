<template>
    <div
        class="flex flex-col items-center shadow-lg rounded dark:rounded-none bg-white dark:bg-transparent dark:border-b dark:border-slate-300/10">
        <div ref="imageContainer" class="relative w-full lg:max-w-[45rem] min-h-[10rem]">
            <Loading></Loading>
        </div>
        <span class="lg:text-lg text-slate-300">{{ modelValue.photoBy }}</span>
        <p
            class="w-full lg:w-[50rem] px-4 pb-4 lg:pb-8 lg:font-medium lg:text-lg text-slate-500 dark:text-slate-200 text-center">
            {{ modelValue.word }}</p>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps, onMounted, watch } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { toggleNewWord } from '@/api/word'
import ImageManager from '@/common/imageManager.ts'
import Loading from '@/components/common/Loading.vue'
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
const imageContainer = ref();
watch(() => props.modelValue.image, (value, oldValue) => {
    if (value && value !== oldValue) {
        ImageManager.preloadImage(value, (imageElement) => {
            const firstChild = imageContainer?.value?.firstChild;
            if (firstChild) {
                imageContainer?.value?.removeChild(firstChild);
            }
            imageContainer?.value?.appendChild(imageElement);
        })
    }
}, { immediate: true })
</script>


<style lang='scss' scoped></style>