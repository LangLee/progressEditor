<template>
    <div class="flex p-2 lg:p-4 shadow-lg rounded-lg dark:border-b bg-white dark:border-slate-50/20">
        <div class="flex-1">
            <p class="font-bold text-blue-700 dark:text-slate-400">{{ modelValue.chinese }}</p>
            <p class="text-blue-900 dark:text-slate-50">{{ modelValue.english }}</p>
        </div>
        <div class="w-8 flex items-center text-lg text-blue-300 hover:text-blue-700 dark:text-slate-300 dark:hover:text-slate-50">
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