<template>
    <Modal :title="title" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <ProInput class="my-2" name="name" v-model="group.name" placeholder="请输入分类名" />
    </Modal>
</template>
<script setup>
import { ref, reactive, defineProps, watch, computed } from 'vue'
import Modal from './Modal.vue'
import ProInput from '@/components/entry/ProInput.vue'
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