<template>
    <ProCheckbox name="userPrivacy" :label="true" :modelValue="modelValue" @update:modelValue="update">
        <template #label>
            <span class="text-gray-600 text-sm">我已阅读并同意</span>
            <a class="text-blue-600 text-sm underline" href="http://111.229.165.93:3000/#/book/66cd9da6037c2c7ee424e923"
                target="_blank">
                [用户隐私协议]
            </a>
        </template>
    </ProCheckbox>
</template>
<script setup>
import { ref, reactive, defineProps } from 'vue'
import ProCheckbox from '@/components/entry/ProCheckbox.vue'
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:modelValue'])
const update = (value)=>{
    emits('update:modelValue', value)
}
</script>

<style lang='scss' scoped></style>