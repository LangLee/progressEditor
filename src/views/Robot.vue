<template>
    <div class="flex flex-col h-screen w-full py-4 lg:py-8 lg:px-60">
        <div class="flex flex-row items-center align-middle px-2 lg:px-8 lg:mb-8 mb-4">
            <span class="w-24 text-normal lg:text-lg text-slate-700">选择模型</span>
            <ProSelect class="w-48" v-model="LLMKey" :options="LLM_SELECT_OPTIONS" @update:modelValue="onChangeLLM"></ProSelect>
        </div>
        <div class="flex-1 w-full text-base px-2 lg:px-4 mb-4 lg:mb-8 text-slate-900 font-normal overflow-auto">
            <div v-if="messages && messages.length > 0" class="flex flex-col content-space-between justify-between">
                <div v-for="(item, index) in messages" :key="index"
                    :class="`my-3 rounded-xl shadow-md ${index % 2 === 0 ? 'self-end bg-blue-300 lg: ml-8' : 'self-start bg-slate-50 lg:mr-8'}`">
                    <p class="inline-block px-4 py-2">{{ item.content }}</p>
                </div>
            </div>
            <span v-else class="text-normal lg:px-4 lg:text-lg font-normal text-slate-300">Ask me something...</span>
        </div>
        <div class="relative h-10 lg:h-14 w-full text-lg px-2 lg:px-4">
            <input ref="questionInput"
                class="w-full border rounded-lg shadow-sm py-2 lg:py-4 pl-4 pr-20 text-slate-600 placeholder-slate-300 font-normal text-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                v-model="question" type="text" placeholder="开始对话" @keyup.enter="onChart" />
            <button class="absolute top-2 lg:top-4 right-4 lg:right-8 w-16 text-purple-300 hover:text-purple-600" @click="onChart">
                <span class="mr-1">发送</span>
                <RemixIcon name="send-plane-fill"></RemixIcon>
            </button>
        </div>
    </div>
    <Loading v-if="loading"></Loading>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import Loading from '@/components/common/Loading.vue'
import ProSelect from '@/components/common/Select.vue'
import { LLM_API_MAP, LLM_SELECT_OPTIONS } from '@/common/constants'
const question = ref('')
const message = ref('')
const questionInput = ref(null);
const messages = ref([]);
const loading = ref(false);
const LLMKey = ref('TongYiQianWen');
const onChart = () => {
    if (LLMKey.value && typeof LLM_API_MAP[LLMKey.value] === 'function') {
        loading.value = true;
        LLM_API_MAP[LLMKey.value](messages.value, question.value).then((data) => {
            loading.value = false;
            message.value = data;
            messages.value.push({ role: "user", content: question.value });
            messages.value.push({ role: "assistant", content: data });
            question.value = '';
            questionInput.value && questionInput.value.focus();
        })
    }
}
const onChangeLLM = (value, role) => {
    LLMKey.value = value;
    message.value = '';
    messages.value = [];
    question.value = '';
}
onMounted(() => {
    questionInput.value && questionInput.value.focus();
})
</script>


<style lang='scss' scoped></style>