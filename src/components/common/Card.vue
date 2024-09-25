<template>
    <a class="relative w-full h-[4.5rem] lg:w-28 lg:h-28 p-1 lg:p-4 flex flex-col items-center rounded cursor-pointer shadow-md hover:shadow-lg dark:border dark:border-slate-50/20 dark:bg-neutral-800 dark:text-slate-300 dark:hover:text-slate-50 dark:hover:border-slate-50"
        :class="`text-${theme}-400 hover:text-${theme}-700`" @click.stop="open">
        <!-- @mouseenter="onMouseenter"
        @mouseleave="onMouseleave"> -->
        <!-- @touchstart.passive="(e) => handleTouchStart(e)"
        @touchend.passive="(e) => handleTouchEnd(e)"> -->
        <RemixIcon class="text-2xl lg:text-4xl lg:mb-2" :name="modelValue.icon || 'book-2-line'"></RemixIcon>
        <span class="text-xs lg:text-base break-all text-center">{{ modelValue.title }}</span>
        <tippy v-if="editable" ref="dropdown" class="absolute top-0 right-0 z-10 px-0 lg:px-2"
            trigger="mouseenter click" placement="bottom-start" :offset="[0, 0]" animation="scale" :interactive="true"
            :arrow="true" :appendTo="appendToBody" @click.stop>
            <RemixIcon class="dark:text-slate-300 dark:hover:text-slate-50 dark:hover:border-slate-50"
                :class="`text-${theme}-400 hover:text-${theme}-700`" name="more-fill" />
            <template #content>
                <div class="text-sm lg:text-normal">
                    <div class="p-1 dark:text-slate-300 dark:hover:text-slate-50 dark:hover:border-slate-50 cursor-pointer"
                        :class="`text-${theme}-400 hover:text-${theme}-700`" @click.stop="edit">
                        <RemixIcon class="mr-1" name="edit-line"></RemixIcon>
                        <span>编辑</span>
                    </div>
                    <div class="p-1 dark:text-slate-300 dark:hover:text-slate-50 dark:hover:border-slate-50 cursor-pointer"
                        :class="`text-${theme}-400 hover:text-${theme}-700`" @click.stop="remove">
                        <RemixIcon class="mr-1" name="delete-bin-line"></RemixIcon>
                        <span>删除</span>
                    </div>
                    <div v-if="publishable" class="p-1 dark:text-slate-300 dark:hover:text-slate-50 dark:hover:border-slate-50 cursor-pointer"
                        :class="`text-${theme}-400 hover:text-${theme}-700`" @click.stop="publish">
                        <RemixIcon class="mr-1" name="share-line"></RemixIcon>
                        <span>{{ modelValue.published?'取消发布':'发布' }}</span>
                    </div>
                </div>
            </template>
        </tippy>
        <!-- <transition name="slide">
            <div v-if="editable && active"
            class="absolute bottom-0 top-0 right-0 z-10 bg-slate-300/10 border-l border-slate-300/10 flex flex-col justify-center px-1 lg:px-2 text-lg lg:text-xl backdrop-blur-lg">
            <RemixIcon class="my-1 lg:my-2" :class="`text-${theme}-400 hover:text-${theme}-700`" name="edit-line"
                @click.stop="edit"></RemixIcon>
            <RemixIcon class="my-1 lg:my-2" :class="`text-${theme}-400 hover:text-${theme}-700`" name="delete-bin-line"
                @click.stop="remove"></RemixIcon>
        </div>
        </transition> -->
    </a>
    <!-- 预加载主题颜色 -->
    <span v-if="false"
        class="text-slate-400 hover:text-slate-700 text-purple-400 hover:text-purple-700 text-blue-400 hover:text-blue-700 text-green-400 hover:text-green-700 text-sky-400 hover:text-sky-700 text-yellow-400 hover:text-yellow-700 text-red-400 hover:text-red-700 text-orange-400 hover:text-orange-700 text-indigo-400 hover:text-indigo-700 text-pink-400 hover:text-pink-700">
    </span>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { useRouter } from 'vue-router'
import modal from '@/components/feedback/modal'
// import { isMobile } from '@/common/utils'
const dropdown = ref();
const appendToBody = () => document.body;
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
    },
    editable: {
        type: Boolean,
        default: false
    },
    publishable: {
        type: Boolean,
        default: false
    }
})
// const active = ref(false);
// let touchStart = 0;
const emits = defineEmits(['update:modelValue', 'cardClick', 'edit', 'remove', 'publish']);
const open = () => {
    if (!props.modelValue || !props.modelValue.url) {
        // 跳转链接为空
        emits('cardClick');
    } else if (props.modelValue.inner) {
        router.push({ path: props.modelValue.url, query: { appId: props.modelValue._id } });
    } else {
        window.open(props.modelValue.url, '_blank')
    }
}
const edit = () => {
    if (!props.editable) {
        return;
    }
    emits('edit', props.modelValue);
    dropdown?.value?.hide();
}
const remove = () => {
    modal.confirm({
        title: '确认删除',
        content: '确定要删除该应用？',
        onOk: ()=>{
            emits('remove', props.modelValue);
        }
    })
    dropdown?.value?.hide();
}
const publish = ()=>{
    modal.confirm({
        title: '确认发布',
        content: '确定要发布该应用？',
        onOk: ()=>{
            emits('publish', props.modelValue);
        }
    })
}
// const onMouseenter = () => {
//     if (isMobile()) return false;
//     active.value = true;
// }
// const onMouseleave = () => {
//     if (isMobile()) return false;
//     active.value = false;
// }
// const handleTouchStart = (e) => {
//     touchStart = e.touches[0].clientX;
// }
// const handleTouchEnd = (e) => {
//     message.error(`${touchStart}`);
//     if (!touchStart) return;
//     let touchEnd = e.changedTouches[0].clientX;
//     let distance = Math.abs(touchStart - touchEnd);
//     if (distance < 10) {
//         touchStart = 0;
//         return;
//     }
//     if (touchStart > touchEnd) {
//         // 左移
//         active.value = true;
//     } else if (touchStart < touchEnd) {
//         // 右移
//         active.value = false;
//     }
//     touchStart = 0;
// } 
</script>


<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
    transition: transform 0.3s ease-in;
}

.slide-enter-from,
.slide-leave-to {
    transform: translateX(100%);
}
</style>