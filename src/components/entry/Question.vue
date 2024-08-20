<template>
    <div class="relative w-full p-2 bg-white dark:bg-neutral-800 rounded-lg border border-slate-200 dark:border-slate-300/20 text-base">
        <div ref="questionInput" :contentEditable="true"
            class="w-full h-16 m-2 text-slate-600 font-medium dark:text-slate-50 focus:border-none focus:ring-none focus:outline-none" @input="onUpdate" @keyup.enter.prevent="onChat">
            {{ question }}
        </div>
        <div v-if="!question" class="absolute top-4 left-4 text-gray-400" @click.stop="placeholderClick">{{ placeholder }}</div>
        <div class="w-full flex justify-end">
            <button class="rounded px-1 mr-2 hover:bg-slate-300 dark:hover:bg-slate-700">
                <!-- <span class="mr-1">发送</span> -->
                <RemixIcon name="star-line"></RemixIcon>
            </button>
            <button class="rounded px-1 bg-blue-700 hover:bg-blue-500 text-white"
                @click.stop="onChat">
                <!-- <span class="mr-1">发送</span> -->
                <RemixIcon name="send-plane-fill"></RemixIcon>
            </button>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineEmits, onMounted, nextTick } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
const questionInput = ref()
const emits = defineEmits(['send'])
const question = ref('')
const props = defineProps({
    placeholder: {
        type: String,
        default: '有什么问题尽管问'
    }
})
const placeholderClick = () => {
    questionInput.value.focus()
}
const onUpdate = (event)=>{
    question.value = event.target.innerText
}
const onChat = () => {
    let message = question.value && question.value.replace(/[\r\n]/g, '');
    if (!message) return;
    emits('send', message);
    question.value = ''
}
onMounted(()=>{
    nextTick(()=>{
        questionInput.value.focus()
    })
})
</script>


<style lang='scss' scoped></style>