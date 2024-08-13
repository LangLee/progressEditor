<template>
    <div id="chatContent" class="w-full flex-1 text-base p-2 lg:p-4 text-slate-900 font-normal overflow-y-auto">
        <div v-if="messages && messages.length > 0" class="flex flex-col content-space-between">
            <ChatCard v-for="(item, index) in messages" :key="index" :content="item.content" :position="item[roleProperty]===owner?'right':'left'" :toolbar="item[roleProperty]!==owner"></ChatCard>
            <ChatCard v-if="response" :content="response"></ChatCard>
        </div>
        <ChatCard v-else :content="placeholder"></ChatCard>
    </div>
    <div v-if="editable" class="relative h-24 lg:h-28 w-full text-lg px-2 lg:px-4 mb-4 lg:mb-8">
        <textarea ref="questionInput" :rows="3"
            class="w-full border rounded-lg shadow-sm py-2 lg:py-4 pl-4 pr-20 text-slate-600 dark:text-slate-50 placeholder-slate-300 font-normal text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-neutral-800 dark:focus:ring-slate-300 dark:border-slate-600"
            v-model="question" type="text" placeholder="开始对话" @keyup.enter.stop="onChart" />
        <button class="absolute top-2 lg:top-4 right-4 lg:right-8 w-16 text-blue-300 hover:text-blue-600 dark:text-slate-300 dark:hover:text-slate-50"
            @click.stop="onChart">
            <span class="mr-1">发送</span>
            <RemixIcon name="send-plane-fill"></RemixIcon>
        </button>
    </div>
    <Loading v-if="loading"></Loading>
</template>
<script setup>
import { ref, getCurrentInstance, watch } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import Loading from '@/components/common/Loading.vue'
import ProSelect from '@/components/common/Select.vue'
import Header from '@/components/navigation/Header.vue'
import ChatCard from '@/components/display/ChatCard.vue'
const { proxy } = getCurrentInstance();
const props = defineProps({
    editable: {
        type: Boolean,
        default: true
    },
    loading: {
        type: Boolean,
        default: false
    },
    messages: {
        type: Array,
        default: () => []
    },
    placeholder: {
        type: String,
        default: '开始向我提问吧...'
    },
    owner: {
        type: String,
        default: 'user'
    },
    roleProperty: {
        type: String,
        default: 'role'
    },
    response: {
        type: String,
        default: ''
    }
})
const emits = defineEmits(['chart'])
const question = ref('')
const onChart = () => {
    question.value = question.value.replace(/[\r\n]/g, '');
    emits('chart', question.value);
    question.value = '';
}
watch(()=>props.messages, (newVal, oldVal) => {
    if (newVal && newVal.length !== oldVal.length) {
        question.value = ''
        proxy.$nextTick(() => {
            const aiChatContent = document.getElementById('chatContent');
            chatContent && chatContent.scrollTo({ top: chatContent.scrollHeight, behavior: 'smooth' });
        })
    }
})
watch(()=>props.response, (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
        proxy.$nextTick(() => {
            const aiChatContent = document.getElementById('chatContent');
            chatContent && chatContent.scrollTo({ top: chatContent.scrollHeight, behavior: 'smooth' });
        })
    }
})
</script>


<style lang='scss'></style>