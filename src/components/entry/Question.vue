<template>
    <div
        class="relative w-full p-2 bg-white dark:bg-neutral-800 rounded border border-slate-200 dark:border-slate-300/20 text-base">
        <div class="px-2 mb-2" v-if="chatter">
            <span class="bg-neutral-100 rounded-full px-2 py-1 text-slate-500 text-sm">
                @和 <span class="text-slate-600 font-bold">{{ chatter && chatter.name }}</span> 聊聊
                <RemixIcon name="close-line" @click.stop="clearChatter"/>
            </span>
        </div>
        <div ref="questionInput" :contentEditable="true"
            class="questionInput w-full h-16 m-2 text-slate-600 font-medium dark:text-slate-50 focus:border-none focus:ring-none focus:outline-none"
            @input="onUpdate" @keyup.enter.prevent="onChat" :placeholder="placeholder">
            {{ question }}
        </div>
        <div class="w-full flex justify-end">
            <button class="rounded px-1 mr-2 hover:bg-slate-300 dark:hover:bg-slate-700">
                <!-- <span class="mr-1">发送</span> -->
                <RemixIcon name="star-line"></RemixIcon>
            </button>
            <button class="rounded px-1 bg-blue-700 hover:bg-blue-500 text-white" @click.stop="onChat">
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
const emits = defineEmits(['send', 'clearChatter'])
const question = ref('')
const props = defineProps({
    placeholder: {
        type: String,
        default: '有什么问题尽管问'
    },
    chatter: {
        type: Object,
        default: null
    }
})
const placeholderClick = () => {
    questionInput.value.focus()
}
const onUpdate = (event) => {
    question.value = event.target.innerText
}
const onChat = () => {
    let message = question.value && question.value.replace(/[\r\n]/g, '');
    if (!message) return;
    emits('send', message);
    question.value = ''
}
const clearChatter = () => {
    emits('clearChatter')
}
onMounted(() => {
    nextTick(() => {
        questionInput.value.focus()
    })
})
</script>


<style lang='scss' scoped>
.questionInput:empty::before {
    content: attr(placeholder);
    font-size: 0.875rem;
    font-style: italic;
    font-weight: 500;
    color: rgb(203 213 225);
}

.questionInput:focus::before {
    content: "";
}
</style>