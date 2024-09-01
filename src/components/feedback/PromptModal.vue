<template>
    <Modal :title="title" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <input
            class="p-2 mb-4 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="prompt.name" placeholder="请输入名称" />
        <textarea id="prompt" name="prompt"
            class="p-2 mb-4 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-transparent"
            rows="2" v-model="prompt.content" placeholder="请输入内容"></textarea>
    </Modal>
</template>
<script setup>
import { ref, reactive, defineProps, watch, computed } from 'vue'
import Modal from './Modal.vue'
const props = defineProps({
    title: {
        type: String,
        default: '新增提词'
    },
    visible: {
        type: Boolean,
        default: false
    },
    prompt: {
        type: Object,
        default: () => {
            return {
                name: '',
                content: ''
            }
        }
    }
})
const emits = defineEmits(['update:prompt', 'confirm', 'cancel']);
const visibleState = ref(props.visible)
const confirm = () => {
    emits('confirm')
    visibleState.value = false;
}
const cancel = () => {
    emits('cancel')
    visibleState.value = false;
}
watch(() => props.visible, () => {
    visibleState.value = props.visible
})
</script>
<style lang='scss' scoped></style>