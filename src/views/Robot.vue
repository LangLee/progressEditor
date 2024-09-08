<template>
    <div class="flex flex-col w-full h-screen">
        <Header :hiddenFold="true">
            <div class="p-2 text-xl text-gray-500">
                <button class="hover:bg-gray-200 hover:text-gray-700 px-1 rounded mr-2" @click="createChat">
                    <RemixIcon class="" name="chat-new-line"></RemixIcon>
                </button>
                <button class="hover:bg-gray-200 hover:text-gray-700 px-1 rounded mr-2" :class="{ 'text-gray-700': showHistory, 'bg-gray-200': showHistory }" @click="toggleHistory">
                    <RemixIcon class="" name="chat-history-line"></RemixIcon>
                </button>
                <button class="hover:bg-gray-200 hover:text-gray-700 px-1 rounded" @click="selectRobot">
                    <RemixIcon class="" name="robot-line"></RemixIcon>
                </button>
            </div>
        </Header>
        <div class="flex-1 flex-col w-full bg-slate-300/20 overflow-hidden">
            <ChatPanel :cardOperation="true" :editable="true" :messages="messages" :loading="loading" @chart="onChat"
                :response="response" />
        </div>
        <BookHistory v-if="showHistory" class="fixed top-16 bottom-0 right-0 z-50" @skipTo="skipToChat"></BookHistory>
        <!-- <button v-if="showHistory" class="fixed top-20 left-4 px-1 bg-red-600 hover:bg-red-400 rounded z-50" @click.stop="close">
            <RemixIcon name="close-fill text-white text-2xl" />
        </button> -->
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
import RemixIcon from '@/components/common/RemixIcon.vue'
import BookHistory from './BookHistory.vue'
const router = useRouter();
const route = useRoute();
const { proxy } = getCurrentInstance();
const messages = ref([]);
const loading = ref(false);
const LLMKey = ref('tongyi');
const AiId = ref('');
const fold = ref(true);
const response = ref('')
const showHistory = ref(false);
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
    getAiChatStream({ appId: route.query.appId, id: AiId.value, mode: LLMKey.value, question }, (content) => {
        result += content;
        response.value = result;
    }, (id) => {
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
const createChat = () => {
    skipToChat();
}
const toggleHistory = () => {
    showHistory.value = !showHistory.value;
}
const selectRobot = () => {
    //智能体
}
const close = () => {
    showHistory.value = false;
}
const skipToChat = (id) => {
    router.push({
        path: '/robot',
        query: {
            id,
            appId: route.query.appId
        }
    })
    showHistory.value = false;
}
watch(()=>route.query.id, (value, oldValue) => {
    if (value !== oldValue) {
        AiId.value = value;
        if (value) {
            getBookById(value).then((data) => {
                messages.value = JSON.parse(data.content || '[]');
            })
        } else {
            messages.value = [];
        }
    }
}, { immediate: true })
</script>


<style lang='scss' scoped></style>