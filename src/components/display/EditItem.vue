<template>
    <div class="flex flex-row w-full justify-between items-center h-12 leading-[3rem] border border-gray-300/20 bg-white/90 dark:bg-neutral-900 m-1 px-4 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-800"
        @click.stop="skipTo" @mouseover.stop="onItemMouseover" @mouseleave.stop="onItemMouseleave"
        @touchstart.passive="handleTouchStart" @touchend.passive="handleTouchEnd">
        <span>
            <RemixIcon class="text-blue-300 mr-2" name="chat-smile-2-line"></RemixIcon>
            <span>{{ modelValue[titleProperty] }}</span>
        </span>
        <span v-if="editable && active" class="h-8 leading-8">
            <button
                class="px-1 lg:px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-500 hover:text-gray-700"
                @click.stop="edit">
                <RemixIcon name="edit-2-fill"></RemixIcon>
            </button>
            <button
                class="px-1 lg:px-2 rounded hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-500 hover:text-gray-700"
                @click.stop="remove">
                <RemixIcon name="delete-bin-fill"></RemixIcon>
            </button>
        </span>
        <span v-else-if="modelValue[subTitleProperty]" class="text-slate-500">
            {{ modelValue[subTitleProperty] }}
        </span>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import message from '@/components/feedback/message'
import { isMobile } from '@/common/utils'
import modal from '@/components/feedback/modal'
let touchStart = 0;
const props = defineProps({
    modelValue: {
        type: Object,
        required: true
    },
    editable: {
        type: Boolean,
        default: true
    },
    titleProperty: {
        type: String,
        default: 'title'
    },
    subTitleProperty: {
        type: String,
        default: 'subTitle'
    }
})
const emits = defineEmits(['skip', 'edit', 'remove'])
const active = ref(false)
const skipTo = () => {
    emits('skip', props.modelValue)
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
const edit = () => {
    emits('edit', props.modelValue)
}
const remove = () => {
    modal.confirm({
        title: '确认删除',
        content: '确认删除该内容？',
        onOk: () => {
            emits('remove', props.modelValue);
        }
    })

}
</script>


<style lang='scss' scoped></style>