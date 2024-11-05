<template>
    <div class="flex flex-col items-center bg-white dark:bg-transparent">
        <div ref="imageContainer" class="relative w-full lg:max-w-[45rem] min-h-[10rem]">
        </div>
        <span v-if="modelValue.photoBy" class="text-sm text-slate-300 py-2">摄影｜{{ modelValue.photoBy }}</span>
        <p class="w-full lg:max-w-[45rem] px-4 pb-4 lg:pb-8 text-slate-700 dark:text-slate-200">
            {{ modelValue.word }}</p>
        <Loading v-if="loading"></Loading>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps, onMounted, watch, nextTick } from 'vue'
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
const loading = ref(false);
onMounted(() => {
    if (props.modelValue.image) {
        const firstChild = imageContainer?.value?.firstChild;
        if (firstChild) return;
        loading.value = true;
        ImageManager.preloadImage(props.modelValue.image, (imageElement) => {
            imageContainer?.value?.appendChild(imageElement);
            loading.value = false;
        })
    }
})
watch(() => props.modelValue.image, (value, oldValue) => {
    if (value && value !== oldValue) {
        const firstChild = imageContainer?.value?.firstChild;
        if (firstChild) return;
        loading.value = true;
        ImageManager.preloadImage(value, (imageElement) => {
            imageContainer?.value?.appendChild(imageElement);
            loading.value = false;
        })
    }
}, { immediate: true })
</script>


<style lang='scss' scoped></style>