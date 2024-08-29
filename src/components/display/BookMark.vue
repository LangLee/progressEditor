<template>
    <div class="flex flex-row w-full justify-between items-center h-12 leading-[3rem] border border-gray-300/20 bg-white/90 dark:bg-neutral-900 m-1 px-4 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800"
        @click.stop="skipTo" @mouseover.stop="onItemMouseover" @mouseleave.stop="onItemMouseleave"
        @touchstart.passive="handleTouchStart" @touchend.passive="handleTouchEnd">
        <span>
            <RemixIcon class="text-blue-300 mr-2" name="chat-smile-2-line"></RemixIcon>
            <span>{{ book.title }}</span>
        </span>
        <span v-if="active" class="h-8 leading-8">
            <button class="px-1 lg:px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-500 hover:text-gray-700"
                @click.stop="editBook">
                <RemixIcon name="edit-2-fill"></RemixIcon>
            </button>
            <button class="px-1 lg:px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-500 hover:text-gray-700" @click.stop="deleteBook">
                <RemixIcon name="delete-bin-fill"></RemixIcon>
            </button>
        </span>
        <span v-else class="text-slate-500">
            {{ book.createTime }}
        </span>
        <Modal title="编辑" v-model:visible="editing" @confirm="confirm" @cancel="cancel">
            <div class="flex flex-col">
                <div class="flex flex-row">
                    <label class="text-right mr-2 p-2">标题</label>
                    <input class="flex-1 border p-2 rounded" v-model="bookTitle" />
                </div>
            </div>
        </Modal>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import Modal from '@/components/feedback/Modal.vue'
import { updateBook, removeBook } from '@/api/book'
import message from '@/components/feedback/message'
import { isMobile } from '@/common/utils'
const editing = ref(false)
let touchStart = 0;
const props = defineProps({
    book: {
        type: Object,
        required: true
    }
})
const bookTitle = ref(props.book.title)
const emits = defineEmits(['skip', 'delete'])
const active = ref(false)
const skipTo = () => {
    emits('skip', props.book._id)
}
const onItemMouseover = () => {
    if (isMobile()) {
        return true;
    }
    active.value = true
}
const onItemMouseleave = () => {
    if (isMobile()) {
        return true;
    }
    active.value = false
}
const handleTouchStart = (e) => {
    touchStart = e.touches[0].clientX;
}
const handleTouchEnd = (e) => {
    if (!touchStart) return true;
    let touchEnd = e.changedTouches[0].clientX;
    let distance = Math.abs(touchStart - touchEnd);
    if (distance < 10) {
        touchStart = 0;
        return true;
    }
    if (touchStart > touchEnd) {
        // 左移
        active.value = true;
    } else if (touchStart < touchEnd) {
        // 右移
        active.value = false;
    }
    touchStart = 0;
}
const editBook = () => {
    editing.value = true
}
const confirm = () => {
    editing.value = false;
    if (!bookTitle.value || bookTitle.value === props.book.title) return;
    updateBook({ id: props.book._id, title: bookTitle.value }).then(() => {
        props.book.title = bookTitle.value;
        bookTitle.value = '';
    })
}
const cancel = () => {
    editing.value = false;
}
const deleteBook = () => {
    removeBook(props.book._id).then(() => {
        emits('delete', props.book._id)
        message.success('删除成功!')
    })
}
</script>


<style lang='scss' scoped></style>