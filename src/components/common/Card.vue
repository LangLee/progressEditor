<template>
    <a class="w-24 lg:w-28 p-2 lg:p-4 flex flex-col items-center rounded shadow-md hover:shadow-lg"
        :class="`text-${theme}-400 hover:text-${theme}-700`" href="javascript:void(0);" @click="openBook">
        <RemixIcon class="text-2xl lg:text-4xl" :name="book.icon || 'book-2-line'"></RemixIcon>
        <span class="text-sm lg:text-basic break-all text-center">{{ book.title }}</span>
    </a>
    <!-- 预加载主题颜色 -->
    <span v-if="false"
        class="text-slate-400 hover:text-slate-700 text-purple-400 hover:text-purple-700 text-blue-400 hover:text-blue-700 text-green-400 hover:text-green-700 text-sky-400 hover:text-sky-700 text-yellow-400 hover:text-yellow-700 text-red-400 hover:text-red-700 text-orange-400 hover:text-orange-700 text-indigo-400 hover:text-indigo-700 text-pink-400 hover:text-pink-700">
    </span>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { useRouter } from 'vue-router'
const router = useRouter();
const props = defineProps({
    book: {
        type: Object,
        default: () => {
            return {}
        }
    },
    theme: {
        type: String,
        default: 'purple',
        validator(value) {
            return ['slate', 'purple', 'blue', 'green', 'red', 'yellow', 'sky', 'orange', 'pink'].includes(value)
        }
    }
})
const openBook = () => {
    if (!props.book) return;
    if (props.book.inner) {
        router.push(props.book.url);
    } else {
        window.open(props.book.url, '_blank')
    }
}
</script>


<style lang='scss' scoped></style>