<template>
    <Modal :title="title" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <ProInput class="lg:my-2" name="name" v-model="app.title" placeholder="请输入图书标题" />
    </Modal>
</template>
<script setup>
import { ref, reactive, defineProps, watch, computed } from 'vue'
import Modal from './Modal.vue'
import ProInput from '@/components/entry/ProInput.vue'
const props = defineProps({
    title: {
        type: String,
        default: '新增图书'
    },
    visible: {
        type: Boolean,
        default: false
    },
    app: {
        type: Object,
        default: () => {
            return {
                name: '',
                title: ''
            }
        }
    }
})
const emits = defineEmits(['update:app', 'confirm', 'cancel']);
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