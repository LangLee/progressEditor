<template>
    <div class="flex flex-col w-full h-screen">
        <Header @toggleFold="toggleFold" :fold="fold">
            <!-- <ProSelect class="w-32 lg:w-48 mx-2" v-model="LLMKey" palaceHolder="请选择模型" :options="LLM_SELECT_OPTIONS"
                @update:modelValue="onChangeLLM"></ProSelect> -->
        </Header>
        <Menu fixedType="chat" :defaultGroup="true" :fold="fold" :defaultSelected="false" @toggleFold="toggleFold" @menuChange="onMenuChange">
        </Menu>
        <div class="flex-1 flex flex-col w-full lg:pl-80 overflow-y-auto">
            <ChatPanel :editable="true" :messages="messages" :loading="loading" @chart="onChat" :response="response"></ChatPanel>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, getCurrentInstance, watch } from 'vue'
import ProSelect from '@/components/entry/ProSelect.vue'
import Header from '@/components/navigation/Header.vue'
import ChatPanel from '@/components/display/ChatPanel.vue'
import Menu from '@/components/navigation/Menu.vue'
import { LLM_SELECT_OPTIONS } from '@/common/constants'
import { getAiChat, getAiChatStream } from '@/api/ai'
import { useRouter, useRoute } from 'vue-router'
import { getBookById } from '@/api/book'
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const messages = ref([]);
const loading = ref(false);
const LLMKey = ref('tongyi');
const AiId = ref('');
const fold = ref(true);
const response = ref('')
const toggleFold = (float) => {
    if (float !== undefined) {
        fold.value = float;
        return;
    }
    fold.value = !fold.value;
}
const onMenuChange = (id, appId) => {
    router.push({
        path: '/robot',
        query: {
            id,
            appId
        }
    })
    AiId.value = id || '';
    if (id) {
        getBookById(id).then((data) => {
            messages.value = JSON.parse(data.content || '[]');
        })
    } else {
        messages.value = [];
    }
}
const onChat = (question) => {
    // loading.value = true;
    // getAiChat().then((data) => {
    //     let { id, response } = data;
    //     AiId.value = id;
    //     loading.value = false;
    //     messages.value = messages.value.concat([{ role: "user", content: question }, { role: "assistant", content: response }]);
    // }).catch((e) => {
    //     loading.value = false;
    //     messages.value = messages.value.concat([{ role: "assistant", content: e.message }]);
    // })
    messages.value = messages.value.concat([{ role: "user", content: question }]);
    let result = "";
    getAiChatStream({appId: route.query.appId, id: AiId.value, mode: LLMKey.value, question}, (content)=>{
        result += content;
        response.value = result;
    }, (id)=>{
        if (id) {
            AiId.value = id;
        }
        response.value = '';
        messages.value = messages.value.concat([{ role: "assistant", content: result }]);
    })
}
const onChangeLLM = (value, role) => {
    LLMKey.value = value;
    if (messages.value && messages.value.length > 0) {
        router.push({
            path: '/robot',
            query: {
                id: 'new',
                appId: route.query.appId
            }
        })
        messages.value = [];
        AiId.value = '';
    }
}
watch(route.query.id, (value, oldValue) => {
    AiId.value = value;
}, { immediate: true })
</script>


<style lang='scss' scoped></style>