<template>
    <Modal :title="title" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <input
            class="p-2 mb-2 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="group.name" placeholder="请输入分类名" />
    </Modal>
</template>
<script setup>
import { ref, reactive, defineProps, watch, computed } from 'vue'
import Modal from './Modal.vue'
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '新增分类'
    },
    group: {
        type: Object,
        default: () => {
            return {
                name: '',
                icon: ''
            }
        }
    }
})
const emits = defineEmits(['update:group', 'confirm', 'cancel']);
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