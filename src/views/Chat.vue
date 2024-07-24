<template>
    <div class="flex flex-col w-full h-screen">
        <Header @toggleFold="toggleFold" :fold="fold">
        </Header>
        <Contacts class="lg: border-r dark:border-slate-50/20" @chatTo="chatTo" :fold="fold" :contacts="contacts" @toggleFold="toggleFold"></Contacts>
        <div class="flex-1 flex flex-col w-full lg:pl-80 overflow-y-auto">
            <ChatPanel placeholder="咱们开始聊天吧..." :editable="true" :messages="messages" :loading="loading" @chart="onChat" :owner="userId" roleProperty="from"></ChatPanel>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue'
import Header from '@/components/navigation/Header.vue'
import ChatPanel from '@/components/display/ChatPanel.vue'
import Contacts from '@/components/display/Contacts.vue'
import MessageManage from '@/common/messageManage'
// import { getContactList } from '@/api/user'
let messageManage = new MessageManage();
const fold = ref(true);
const loading = ref(false);
// 响应数据
const contacts = messageManage.useContacts();
const messages = messageManage.useMessages();
const userId = messageManage.useUserId();
const toggleFold = (float) => {
    if (float !== undefined) {
        fold.value = float;
        return;
    }
    fold.value = !fold.value;
}
const chatTo = (userId) => {
    // 切换聊天对象
    messageManage.changeRecipient(userId);
    // 更新聊天记录为已读
}
const onChat = (question) => {
    messageManage.onChat(question);
}
onBeforeUnmount(() => {
    messageManage.close();
    messageManage = null;
})
</script>


<style lang='scss' scoped>

</style>