<template>
    <div class="flex flex-col w-full h-screen">
        <Header :hiddenFold="true">
            <div class="p-2 text-gray-500">
                <button class="hover:bg-gray-200 hover:text-gray-700 px-1 rounded mr-2" v-tippy="{ content: '新对话' }"
                    @click="createChat">
                    <RemixIcon class="text-xl" name="chat-new-line"></RemixIcon>
                </button>
                <button class="hover:bg-gray-200 hover:text-gray-700 px-1 rounded mr-2"
                    :class="{ 'text-gray-700': showHistory, 'bg-gray-200': showHistory }" v-tippy="{ content: '历史对话' }"
                    @click="toggleHistory">
                    <RemixIcon class="text-xl" name="chat-history-line"></RemixIcon>
                </button>
                <button class="hover:bg-gray-200 hover:text-gray-700 px-1 rounded mr-2" v-tippy="{ content: '提词管理' }"
                    @click="toggleRobot">
                    <RemixIcon class="text-xl" name="robot-line"></RemixIcon>
                </button>
                <button class="relative hover:bg-gray-200 hover:text-gray-700 px-1 rounded" v-tippy="{ content: '创建提词' }"
                    @click="onCreatePrompt">
                    <RemixIcon class="text-xl" name="robot-3-line"></RemixIcon>
                </button>
            </div>
        </Header>
        <div class="flex-1 flex-col w-full bg-slate-300/20 overflow-hidden">
            <ChatPanel showCharter :chatter="currentPrompt" :cardOperation="true" :editable="true" :messages="messages"
                :loading="loading" @chart="onChat" :response="response" @clearChatter="clearChatter" :owner="userId" />
        </div>
        <BookHistory v-if="showHistory" class="fixed top-16 bottom-0 right-0 z-50" @skipTo="skipToChat"></BookHistory>
        <List v-if="showPrompt" class="fixed top-16 bottom-0 right-0 z-50" :options="promptList" titleProperty="name"
            @edit="onEditPrompt" @remove="onRemovePrompt" @skipTo="selectPrompt"></List>
        <PromptModal :visible="!!editPrompt" :prompt="editPrompt" @confirm="finishEditPrompt"
            @cancel="cancelEditPrompt" />
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
import { getPrompts, createPrompt, updatePrompt, removePrompt } from '@/api/prompt'
import { useRouter, useRoute } from 'vue-router'
import { getBookById } from '@/api/book'
import RemixIcon from '@/components/common/RemixIcon.vue'
import List from '@/components/display/List.vue'
import BookHistory from './BookHistory.vue'
import PromptModal from '@/components/feedback/PromptModal.vue'
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
const showPrompt = ref(false);
const promptList = ref([]);
const editPrompt = ref();
let editPromptIdx = ref(0);
const currentPrompt = ref();
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
    let prompt = currentPrompt?.value?.content || '';
    getAiChatStream({ appId: route.query.appId, id: AiId.value, mode: LLMKey.value, question, prompt }, (content) => {
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
    currentPrompt.value = undefined;
}
const toggleHistory = () => {
    showHistory.value = !showHistory.value;
}
const toggleRobot = () => {
    showPrompt.value = !showPrompt.value;
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
// prompt operation
const onCreatePrompt = () => {
    editPrompt.value = { name: '', content: '' };
    editPromptIdx = -1;
}
const onEditPrompt = (item, index) => {
    editPrompt.value = item;
    editPromptIdx = index;
}
const onRemovePrompt = (item, index) => {
    let id = item?._id;
    if (!id) return;
    removePrompt(id).then((res) => {
        if (res) {
            promptList.value.splice(index, 1);
        }
    });
}
const finishEditPrompt = () => {
    if (editPromptIdx === -1) {
        createPrompt(editPrompt.value).then((res) => {
            if (res) {
                promptList.value.push(res);
                editPrompt.value = undefined;
                editPromptIdx = 0;
            }
        })
    } else {
        updatePrompt(editPrompt.value).then((res) => {
            if (res) {
                promptList.value.splice(editPromptIdx, 1, res);
                editPrompt.value = undefined;
                editPromptIdx = 0;
            }
        })
    }
}
const cancelEditPrompt = () => {
    editPrompt.value = undefined;
}
const selectPrompt = (prompt) => {
    currentPrompt.value = prompt;
    showPrompt.value = false;
}
const clearChatter = ()=>{
    currentPrompt.value = undefined;
}
watch(() => route.query.id, (value, oldValue) => {
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
onMounted(() => {
    getPrompts().then((data) => {
        if (data && data.length > 0) {
            promptList.value = data || [];
        }
    })
})
</script>


<style lang='scss' scoped></style>