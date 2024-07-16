<template>
    <div id="chatContent" class="flex-1 text-base p-2 lg:p-4 text-slate-900 font-normal overflow-y-auto">
        <div v-if="messages && messages.length > 0" class="flex flex-col content-space-between">
            <div v-for="(item, index) in messages" :key="index"
                :class="`my-3 text-slate-700 dark:text-slate-50 ${item[roleProperty]!==owner ? 'self-start lg:mr-8' : 'self-end lg: ml-8'}`">
                <Avatar v-if="item[roleProperty]!==owner" icon="robot-2-fill" />
                <span class="inline-block px-4 py-2 rounded-xl shadow-md"
                    :class="item[roleProperty]!==owner ? 'dark:bg-slate-500' : 'bg-blue-50 dark:bg-slate-700'">{{
                        item.content }}</span>
                <Avatar v-if="item[roleProperty]===owner" />
            </div>
        </div>
        <div v-else class="inline-block my-3 self-start lg:mr-8">
            <Avatar icon="robot-2-fill" />
            <span class="px-4 py-2 text-slate-700 dark:text-slate-50 bg-blue-50 dark:bg-slate-700 rounded-xl shadow-md">{{ placeholder }}</span>
        </div>
    </div>
    <div v-if="editable" class="relative h-24 lg:h-28 w-full text-lg px-2 lg:px-4 mb-4 lg:mb-8">
        <textarea ref="questionInput" :rows="3"
            class="w-full border rounded-lg shadow-sm py-2 lg:py-4 pl-4 pr-20 text-slate-600 placeholder-slate-300 font-normal text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent dark:bg-slate-700"
            v-model="question" type="text" placeholder="开始对话" @keyup.enter.stop="onChart" />
        <button class="absolute top-2 lg:top-4 right-4 lg:right-8 w-16 text-blue-300 hover:text-blue-600"
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
import Avatar from '@/components/common/Avatar.vue'
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
</script>


<style lang='scss' scoped></style>