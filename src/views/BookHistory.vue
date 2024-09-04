<template>
    <div class="w-full bg-white/40 dark:bg-neutral-700/40 backdrop-blur-2xl overflow-y-auto">
        <div class="flex flex-col items-center max-w-screen-md mx-auto p-2">
            <BookMark v-for="(item, index) in history" :key="item._id" :book="item" @skip="skipTo" @delete="remove(index)"></BookMark>
            <div v-if="!history || history.length===0" class="mt-20 text-center text-neutral-500 dark:text-neutral-400">
                暂无历史记录
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, defineEmits } from 'vue'
import { getAppBooks } from '@/api/book.ts'
import BookMark from '@/components/display/BookMark.vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
const history = ref([]);
const emits = defineEmits(['skipTo']);
const skipTo = (id) => {
    emits('skipTo', id);
}
const remove = (index) => {
    history.value.splice(index, 1);
}

onMounted(() => {
    getAppBooks().then((data) => {
        history.value = data;
    })
})
</script>


<style lang='scss' scoped></style>