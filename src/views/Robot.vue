<template>
    <div class="flex flex-col w-full h-screen">
        <Header>
            <ProSelect class="w-48" v-model="LLMKey" palaceHolder="请选择模型" :options="LLM_SELECT_OPTIONS"
                @update:modelValue="onChangeLLM"></ProSelect>
        </Header>
        <div id="aiChatContent" class="flex-1 w-full text-base p-2 lg:p-4 text-slate-900 font-normal overflow-y-auto">
            <div v-if="messages && messages.length > 0" class="flex flex-col content-space-between justify-between">
                <div v-for="(item, index) in messages" :key="index"
                    :class="`my-3 text-slate-700 ${index % 2 === 0 ? 'self-end lg: ml-8' : 'self-start lg:mr-8'}`">
                    <Avatar v-if="index % 2 !== 0" icon="robot-2-fill"/>
                    <span class="inline-block px-4 py-2 rounded-xl shadow-md" :class="index % 2 !== 0 ?'':'bg-blue-50'">{{ item.content }}</span>
                    <Avatar v-if="index % 2 === 0" />
                </div>
            </div>
            <div v-else class="inline-block my-3 self-start lg:mr-8">
                <Avatar icon="robot-2-fill"/>
                <span class="px-4 py-2 text-slate-700  bg-blue-50 rounded-xl shadow-md">开始向我提问吧...</span>
            </div>
            <!-- <span v-else class="text-lg lg:px-4 lg:text-xl font-normal text-slate-300">开始向我提问吧...</span> -->
        </div>
        <div class="relative h-24 lg:h-28 w-full text-lg px-2 lg:px-4 mb-4 lg:mb-8">
            <textarea ref="questionInput" :rows="3"
                class="w-full border rounded-lg shadow-sm py-2 lg:py-4 pl-4 pr-20 text-slate-600 placeholder-slate-300 font-normal text-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                v-model="question" type="text" placeholder="开始对话" @keyup.enter.stop="onChart" />
            <button class="absolute top-2 lg:top-4 right-4 lg:right-8 w-16 text-blue-300 hover:text-blue-600"
                @click="onChart">
                <span class="mr-1">发送</span>
                <RemixIcon name="send-plane-fill"></RemixIcon>
            </button>
        </div>
    </div>
    <Loading v-if="loading"></Loading>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import Loading from '@/components/common/Loading.vue'
import ProSelect from '@/components/common/Select.vue'
import Header from '@/components/navigation/Header.vue'
import Avatar from '@/components/common/Avatar.vue'
import { LLM_API_MAP, LLM_SELECT_OPTIONS } from '@/common/constants'
const {proxy} = getCurrentInstance();
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
            proxy.$nextTick(() => {
                const aiChatContent = document.getElementById('aiChatContent');
                aiChatContent && aiChatContent.scrollTo({ top: aiChatContent.scrollHeight, behavior: 'smooth' });
            });
        }).catch((e)=>{
            loading.value = false;
            messages.value.push({ role: "assistant", content: e.message });
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