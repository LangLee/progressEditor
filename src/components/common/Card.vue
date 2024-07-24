<template>
    <a class="relative w-full h-[4.5rem] lg:w-28 lg:h-28 p-1 lg:p-4 flex flex-col items-center rounded shadow-md hover:shadow-lg dark:border dark:border-slate-50/20 dark:bg-neutral-800 dark:text-slate-300 dark:hover:text-slate-50 dark:hover:border-slate-50"
        :class="`text-${theme}-400 hover:text-${theme}-700`" @click.stop="open"
        @mouseenter="onMouseenter" @mouseleave="onMouseleave">
        <RemixIcon class="text-2xl lg:text-4xl lg:mb-2" :name="modelValue.icon || 'book-2-line'"></RemixIcon>
        <span class="text-xs lg:text-base break-all text-center">{{ modelValue.title }}</span>
        <div v-if="editable && active" class="absolute bottom-0 left-0 right-0 z-10 bg-slate-300/10 flex justify-center py-2 text-xl backdrop-blur-lg">
            <RemixIcon class="mx-1" :class="`text-${theme}-400 hover:text-${theme}-700`"
                name="edit-line" @click.stop="edit"></RemixIcon>
            <RemixIcon class="mx-1" :class="`text-${theme}-400 hover:text-${theme}-700`"
                name="delete-bin-line" @click.stop="remove"></RemixIcon>
        </div>
    </a>
    <!-- 预加载主题颜色 -->
    <span v-if="false"
        class="text-slate-400 hover:text-slate-700 text-purple-400 hover:text-purple-700 text-blue-400 hover:text-blue-700 text-green-400 hover:text-green-700 text-sky-400 hover:text-sky-700 text-yellow-400 hover:text-yellow-700 text-red-400 hover:text-red-700 text-orange-400 hover:text-orange-700 text-indigo-400 hover:text-indigo-700 text-pink-400 hover:text-pink-700">
    </span>
    <Modal :visible="removing" :closable="false" title="确认删除" @confirm="confirmRemove" @cancel="cancelRemove">
        <span class="align-center">你真的要删除这个卡片？</span>
    </Modal>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { useRouter } from 'vue-router'
import Modal from '@/components/feedback/Modal.vue'
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
    }
})
const active = ref(false);
const removing = ref(false);
const emits = defineEmits(['update:modelValue', 'cardClick', 'edit', 'remove']);
const open = () => {
    if (!props.modelValue || !props.modelValue.url) {
        // 跳转链接为空
        emits('cardClick');
    } else if (props.modelValue.inner) {
        router.push({path: props.modelValue.url, query: {appId: props.modelValue._id}});
    } else {
        window.open(props.modelValue.url, '_blank')
    }
}
const edit = () => {
    if (!props.editable) {
        return;
    }
    emits('edit', props.modelValue);
}
const remove = () => {
    removing.value = true;
}
const cancelRemove = ()=>{
    removing.value = false;
}
const confirmRemove = ()=>{
    emits('remove', props.modelValue);
}
const onMouseenter = () => {
    active.value = true;
}
const onMouseleave = () => {
    active.value = false;
}
</script>


<style lang='scss' scoped></style>