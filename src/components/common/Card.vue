<template>
    <a class="w-24 h-24 lg:w-28 lg:h-28 p-2 lg:p-4 flex flex-col items-center rounded shadow-md hover:shadow-lg"
        :class="`text-${theme}-400 hover:text-${theme}-700`" href="javascript:void(0);" @click="open">
        <RemixIcon class="text-3xl lg:text-4xl mb-1 lg:mb-2" :name="modelValue.icon || 'book-2-line'"></RemixIcon>
        <span class="text-sm lg:text-basic break-all text-center">{{ modelValue.title }}</span>
    </a>
    <!-- 预加载主题颜色 -->
    <span v-if="false"
        class="text-slate-400 hover:text-slate-700 text-purple-400 hover:text-purple-700 text-blue-400 hover:text-blue-700 text-green-400 hover:text-green-700 text-sky-400 hover:text-sky-700 text-yellow-400 hover:text-yellow-700 text-red-400 hover:text-red-700 text-orange-400 hover:text-orange-700 text-indigo-400 hover:text-indigo-700 text-pink-400 hover:text-pink-700">
    </span>
</template>
<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            return {}
        }
    },
    theme: {
        type: String,
        default: 'purple',
        validator(value: string) {
            return ['slate', 'purple', 'blue', 'green', 'red', 'yellow', 'sky', 'orange', 'pink'].includes(value)
        }
    }
})
const emits = defineEmits(['update:modelValue', 'cardClick']);
const open = () => {
    if (!props.modelValue || !props.modelValue.url) {
        // 跳转链接为空
        emits('cardClick');
    } else if (props.modelValue.inner) {
        router.push(props.modelValue.url);
    } else {
        window.open(props.modelValue.url, '_blank')
    }
}
</script>


<style lang='scss' scoped></style>