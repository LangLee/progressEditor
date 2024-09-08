<template>
    <Modal :title="title" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel" okText="绑定">
        <ProInput class="my-2" name="modelValue" v-model="modelValue" :placeholder="placeholder" />
        <div class="w-full my-3 flex flex-row justify-between">
            <ProInput class="mr-2" :width="40" name="verification" v-model="verification" placeholder="输入验证码" />
            <button class="px-2 bg-slate-300 text-white font-semibold rounded-md hover:bg-slate-600"
                @click.stop="onSign">{{ verifying ? '重新发送' : '发送验证码' }}</button>
        </div>
    </Modal>
</template>
<script setup>
import { ref, reactive, defineProps, defineEmits, watch, computed } from 'vue'
import Modal from './Modal.vue'
import { sign, verifyAndUpdate } from '@/api/verification'
import ProInput from '@/components/entry/ProInput.vue';
const props = defineProps({
    name: {
        type: String,
        default: 'email'
    },
    label: {
        type: String,
        default: '邮箱'
    },
    visible: {
        type: Boolean,
        default: false
    },
    value: {
        type: String,
        default: ''
    }
})
const modelValue = ref(props.value);
const verification = ref();
const verifying = ref(false)
const emits = defineEmits(['confirm', 'cancel']);
const visibleState = ref(props.visible)
const title = computed(() => `绑定${props.label}`);
const placeholder = computed(() => `请输入${props.label}`)
const confirm = () => {
    verifyAndUpdate({ [props.name]: modelValue.value }, verification.value).then((res) => {
        if (res) {
            emits('confirm', modelValue.value);
            visibleState.value = false;
        }
    })
}
const cancel = () => {
    emits('cancel')
    visibleState.value = false;
}
const onSign = () => {
    sign({ [props.name]: modelValue.value }).then((res) => {
        verifying.value = true;
    })
}
watch(() => props.visible, () => {
    visibleState.value = props.visible
})
watch(() => props.value, (value, oldValue) => {
    if (value != oldValue) {
        modelValue.value = value;
    }
})
</script>
<style lang='scss' scoped></style>