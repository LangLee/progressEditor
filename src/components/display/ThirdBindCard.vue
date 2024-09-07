<template>
    <div class="w-full flex flex-row items-center justify-center bg-slate-300/20 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 p-2 rounded-lg">
        <RemixIcon class="p-4 text-3xl" :class="icon === 'checkbox-circle-fill' ? 'text-green-500' : 'text-yellow-500'" :name="icon" />
        <div class="flex-1">
            <div class="mb-1">{{ label }}</div>
            <div class="text-sm text-gray-400 dark:text-gray-500">{{ modelValue || placeholder }}</div>
        </div>
        <button class="px-2 rounded border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 text-sm" @click="onBind">{{ operation }}</button>
        <VerifyModal :name="name" :label="label" :visible="binding" :value="modelValue" @confirm="onOk" @cancel="onCancel"></VerifyModal>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps, defineEmits, computed } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import VerifyModal from '@/components/feedback/VerifyModal.vue'
const props = defineProps({
    name: {
        type: String,
        required: true,
        default: 'email'
    },
    label: {
        type: String,
        default: '邮件'
    },
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: '未绑定'
    }
})
const emits = defineEmits([
    'update:modelValue'
])
const binding = ref(false);
const icon = computed(() => {
    return props.modelValue ? 'checkbox-circle-fill' : 'question-fill';
})
const operation = computed(() => {
    return props.modelValue ? '更改' : '绑定';
})
const onBind = () => {
    binding.value = true;
}
const onOk = (value) => {
    emits('update:modelValue', value);
    binding.value = false;
}
const onCancel = () => {
    binding.value = false;
}
</script>


<style lang='scss' scoped></style>