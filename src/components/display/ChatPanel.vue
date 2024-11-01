<template>
    <div class="flex flex-col w-full h-full max-w-screen-md mx-auto">
        <div v-if="messages && messages.length > 0" id="chatContent"
            class="w-full flex-1 p-2 lg:p-4 text-slate-900 font-normal overflow-y-auto">
            <div class="flex flex-col content-space-between">
                <ChatCard v-for="(item, index) in messages" :key="index" :content="item.content"
                    :position="item[roleProperty] === owner ? 'right' : 'left'"
                    :avatar="item[roleProperty] === owner ? userInfo && userInfo.avatar : (chatter && chatter.avatar || '')"
                    :toolbar="cardOperation && item[roleProperty] !== owner">
                </ChatCard>
                <ChatCard v-if="response" :content="response"></ChatCard>
            </div>
        </div>
        <slot v-else name="empty">
            <div class="overflow-y-auto shadow-lg rounded dark:rounded-none dark:border-b dark:border-slate-300/10 bg-white dark:bg-neutral-800 lg:p-2 m-2 lg:m-4">
                <Note class="max-w-[30rem] m-auto" :modelValue="oneNote" />
            </div>
        </slot>
        <div v-if="editable" class="relative w-full text-lg px-2 lg:px-4 mb-2 lg:mb-4">
            <Question @send="onChat" @clearChatter="emits('clearChatter')" :placeholder="placeholder" :chatter="showCharter?chatter:null"></Question>
        </div>
        <!-- <Loading v-if="loading"></Loading> -->
    </div>
</template>
<script setup>
import { ref, getCurrentInstance, watch } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
// import Loading from '@/components/common/Loading.vue'
import ProSelect from '@/components/entry/ProSelect.vue'
import Header from '@/components/navigation/Header.vue'
import ChatCard from '@/components/display/ChatCard.vue'
import Question from '@/components/entry/Question.vue'
import { useUserInfo } from '@/common/userInfo'
import FishGlass from '@/components/animation/FishGlass.vue'
import Note from '@/components/display/Note.vue'
import { useOneNote } from '@/common/oneNote';
const userInfo = useUserInfo();
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
        default: '有什么问题尽管问'
    },
    owner: {
        type: String,
        default: 'user'
    },
    chatter: {
        type: Object,
        default: null
    },
    roleProperty: {
        type: String,
        default: 'role'
    },
    response: {
        type: String,
        default: ''
    },
    cardOperation: {
        type: Boolean,
        default: false
    },
    showCharter: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['chart', 'clearChatter'])
const question = ref('')
const oneNote = useOneNote();
const onChat = (content) => {
    // question.value = question.value.replace(/[\r\n]/g, '');
    emits('chart', content);
    // question.value = '';
}
watch(() => props.messages, (newVal, oldVal) => {
    if (newVal && newVal.length > 0 && newVal.length !== oldVal.length) {
        question.value = ''
        proxy.$nextTick(() => {
            const aiChatContent = document.getElementById('chatContent');
            chatContent && chatContent.scrollTo({ top: chatContent.scrollHeight, behavior: 'smooth' });
        })
    }
})
watch(() => props.response, (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
        proxy.$nextTick(() => {
            const aiChatContent = document.getElementById('chatContent');
            chatContent && chatContent.scrollTo({ top: chatContent.scrollHeight, behavior: 'smooth' });
        })
    }
})
</script>


<style lang='scss'></style>