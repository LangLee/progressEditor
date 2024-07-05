<template>
    <div class="h-screen w-full flex flex-col overflow-y-auto">
        <Header :hiddenFold="true"></Header>
        <Note class="flex-none m-4 lg:m-8" :modelValue="oneNote"/>
        <div class="flex p-2 lg:p-4 flex-wrap content-start">
            <div v-for="(app, index) in apps" :key="app._id"
                class="flex flex-col items-center m-2 lg:m-4">
                <Card :editable="(app.system && editable) || !app.system" :modelValue="app" theme="blue"
                    @edit="onEditApp(app, index)" @remove="onRemoveApp(app._id)" />
            </div>
            <div class="flex flex-col items-center m-2 lg:m-4">
                <Card theme="blue" :modelValue="{ title: '新增应用', icon: 'add-line' }" @cardClick="appendApp" />
            </div>
        </div>
    </div>
    <AppModal :title="`${append ? '新增应用' : '编辑应用'}`" :visible="modalVisible" :app="app" @confirm="finishEditApp"
        @cancel="closeModal" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Card from '@/components/common/Card.vue'
// import appList from '@/common/appList.ts'
import AppModal from '@/components/feedback/AppModal.vue'
import Header from '@/components/navigation/Header.vue';
import Note from '@/components/display/Note.vue'
import { createApp, getApps, updateApp, removeApp } from '@/api/app.ts'
import {getOneNote} from '@/api/note.ts'
import message from '@/components/feedback/message';

const apps = ref([]);
const editable = ref(false);
const modalVisible = ref(false);
const app = ref({});
const append = ref(false);
const oneNote = ref();
const appendApp = () => {
    append.value = true;
    app.value = { name: 'new', title: '新增', icon: 'book-2-fill', inner: true };
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
    app.value = null;
    modalVisible.value = false;
}
const onRemoveApp = (id) => {
    removeApp(id).then(data => {
        apps.value = apps.value.filter(app => app._id !== id);
    })
}
onMounted(() => {
    getApps().then(data => {
        let { editable: readonly, apps: appList } = data || {}
        apps.value = appList || [];
        editable.value = readonly;
    })
    getOneNote().then(data => {
        oneNote.value = data;
    })
})
</script>


<style lang='scss' scoped></style>