<template>
    <div
        class="flex flex-col items-center bg-white dark:bg-transparent">
        <div ref="imageContainer" class="relative w-full lg:max-w-[45rem] min-h-[10rem]">
            <Loading v-if="loading"></Loading>
        </div>
        <span v-if="modelValue.photoBy" class="text-sm text-slate-300 py-2">摄影｜{{ modelValue.photoBy }}</span>
        <p
            class="w-full lg:max-w-[45rem] px-4 pb-4 lg:pb-8 text-slate-700 dark:text-slate-200">
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
const loading = ref(false);
onMounted(() => {
    if (props.modelValue.image) {
        loading.value = true;
        ImageManager.preloadImage(props.modelValue.image, (imageElement) => {
            const firstChild = imageContainer?.value?.firstChild;
            if (firstChild) {
                imageContainer?.value?.removeChild(firstChild);
            }
            imageContainer?.value?.appendChild(imageElement);
            loading.value = false;
        })
    }
})
watch(() => props.modelValue.image, (value, oldValue) => {
    if (value && value !== oldValue) {
        loading.value = true;
        ImageManager.preloadImage(value, (imageElement) => {
            const firstChild = imageContainer?.value?.firstChild;
            if (firstChild) {
                imageContainer?.value?.removeChild(firstChild);
            }
            imageContainer?.value?.appendChild(imageElement);
            loading.value = false;
        })
    }
}, { immediate: true })
</script>


<style lang='scss' scoped></style>