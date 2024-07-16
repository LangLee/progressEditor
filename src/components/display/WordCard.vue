<template>
    <div class="flex shadow-lg p-2 lg:p-4 rounded-lg">
        <div class="flex-1">
            <p class="font-bold text-blue-700">{{ modelValue.chinese }}</p>
            <p class="text-blue-900">{{ modelValue.english }}</p>
        </div>
        <div class="w-8 flex items-center text-lg text-blue-300 hover:text-blue-700">
            <RemixIcon :name="modelValue.newWord?'flag-2-line':'flag-2-fill'" @click.stop="toggleWordState" />
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { toggleNewWord } from '@/api/word'
const props = defineProps({
    modelValue: {
        type: Object,
        default: () => {
            return {
                _id: '',
                chinese: '',
                english: '',
                newWord: true,
                createTime: ''
            }
        }
    }
})
const emits = defineEmits(['update:modelValue'])
const toggleWordState = () => {
    toggleNewWord(props.modelValue._id, !props.modelValue.newWord).then(() => {
        emits('update:modelValue', {
            ...props.modelValue,
            newWord: !props.modelValue.newWord
        })
    })
}
</script>


<style lang='scss' scoped></style>