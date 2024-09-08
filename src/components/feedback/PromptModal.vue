<template>
    <Modal :title="title" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <ProInput class="my-2" name="name" v-model="prompt.name" placeholder="请输入名称" />
        <ProTextarea class="my-2" type="textarea" name="content" v-model="prompt.content" placeholder="请输入内容" />
    </Modal>
</template>
<script setup>
import { ref, reactive, defineProps, watch, computed } from 'vue'
import ProInput from '@/components/entry/ProInput.vue'
import ProTextarea from '@/components/entry/ProTextarea.vue'
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