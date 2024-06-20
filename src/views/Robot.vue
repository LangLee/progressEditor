<template>
    <div class="flex flex-col h-screen w-full py-4 lg:py-8 lg: px-60">
        <div class="flex-1">
            <ProText v-if="message" v-model="message" :editable="false"></ProText>
            <span v-else class="px-4 text-xl font-normal text-slate-300">I am waiting for you...</span>
        </div>
        <div class="relative h-14 w-full text-lg">
            <input ref="questionInput" class="w-full border rounded-lg py-4 pl-4 pr-20 text-slate-600 placeholder-slate-300 shadow-sm font-normal text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" v-model="question" type="text" placeholder="开始对话" @keyup.enter="onChart"/>
            <button class="absolute top-4 right-4 w-16 text-purple-300 hover:text-purple-600" @click="onChart">
                <span class="mr-1">发送</span>
                <RemixIcon name="send-plane-fill"></RemixIcon>
            </button>
        </div>
    </div>
    <Loading v-if="loading"></Loading>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { getQianfanAiChart } from '@/api/ai'
import ProText from '@/components/editor/Text.vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import Loading from '@/components/common/Loading.vue'
const question = ref('')
const message = ref('')
const questionInput = ref(null);
let messages = null;
const loading = ref(false)
const onChart = () => {
    const messageInfo = { role: "user", content: question.value || "你好！" }
    messages = messages || [];
    messages.push(messageInfo);
    loading.value = true;
    getQianfanAiChart(messages).then((data) => {
        message.value = data;
        question.value = "";
        questionInput.value && questionInput.value.focus();
        loading.value = false;
        messages.push({role: "assistant", content: data})
    })
}
onMounted(() => {
    questionInput.value && questionInput.value.focus();
})
onBeforeUnmount(()=>{
    messages = null;
})
</script>


<style lang='scss' scoped></style>