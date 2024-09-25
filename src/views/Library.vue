<template>
    <div class="h-screen w-full flex flex-col overflow-y-auto">
        <Header :hiddenFold="true"></Header>
        <div class="flex p-2 lg:p-4 flex-wrap justify-start">
            <div v-for="(app, index) in apps" :key="app._id"
                class="flex flex-col items-center p-2 lg:p-4 basis-1/4 md:basis-1/6 lg:basis-1/12">
                <Card :publishable="true" :editable="true" :modelValue="app" theme="blue"
                    @edit="onEditApp(app, index)" @remove="onRemoveApp(app._id)" @publish="onPublishApp(app)"/>
            </div>
            <div class="flex flex-col items-center p-2 lg:p-4 basis-1/4 md:basis-1/6 lg:basis-1/12">
                <Card theme="blue" :modelValue="{ title: '新增图书', icon: 'add-line' }" @cardClick="appendApp" />
            </div>
        </div>
    </div>
    <BookCollectionModal :title="`${append ? '新增图书' : '编辑图书'}`" :visible="modalVisible" v-model:app="app" @confirm="finishEditApp"
        @cancel="closeModal" :system="user && user.administrator"/>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Card from '@/components/common/Card.vue'
import BookCollectionModal from '@/components/feedback/BookCollectionModal.vue'
import Header from '@/components/navigation/Header.vue';
import { createApp, getApps, updateApp, removeApp, publishApp } from '@/api/app.ts'
import message from '@/components/feedback/message';
import {useUserInfo} from '@/common/userInfo.ts'

const apps = ref([]);
const modalVisible = ref(false);
const app = ref(undefined);
const append = ref(false);
const user = useUserInfo();
const appendApp = () => {
    append.value = true;
    app.value = {title: '新增', icon: 'book-2-fill', inner: true, url: '/books' };
    modalVisible.value = true;
}
const onEditApp = (appObj) => {
    append.value = false;
    app.value = appObj;
    modalVisible.value = true;
}
const finishEditApp = async () => {
    if (append.value) {
        await createApp(app.value).then((data) => {
            apps.value.push(data);
            append.value = false;
        });
    } else {
        await updateApp(app.value).catch(((e)=>{
            message.error(e);
        }));
    }
    modalVisible.value = false;
}
const closeModal = () => {
    append.value = false;
    app.value = undefined;
    modalVisible.value = false;
}
const onRemoveApp = (id) => {
    removeApp(id).then(data => {
        apps.value = apps.value.filter(app => app._id !== id);
    })
}
const onPublishApp = (app) => {
    app.published = !app.published;
    publishApp(app).catch(((e)=>{
        message.error(e);
    }));
}
onMounted(() => {
    getApps('user', '/books').then(data => {
        apps.value = data || [];
    })
})
</script>


<style lang='scss' scoped></style>