<template>
    <div class="h-screen w-full flex flex-col">
        <Header :hiddenFold="true">
            <button class="px-2 py-1 hover:bg-slate-100 rounded text-2xl text-gray-500 font-medium" v-tippy="{content: '我的应用'}" @click="setApps">
                <RemixIcon name="apps-2-add-line" />
            </button>
            <button class="px-2 py-1 hover:bg-slate-100 rounded text-2xl text-gray-500 font-medium" v-tippy="{content: '图书馆'}" @click="setLibrary">
                <RemixIcon name="book-shelf-line" />
            </button>
        </Header>
        <div class="flex-1 w-full flex flex-col overflow-y-auto p-2 lg:p-4">
            <Note class="m-2 lg:m-4" :modelValue="oneNote" />
            <div class="flex flex-wrap justify-start">
                <div v-for="(app, index) in apps" :key="app._id"
                    class="flex flex-col items-center p-2 lg:p-4 basis-1/4 md:basis-1/6 lg:basis-1/12">
                    <Card :modelValue="app" theme="blue" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Card from '@/components/common/Card.vue'
// import appList from '@/common/appList.ts'
import AppModal from '@/components/feedback/AppModal.vue'
import Header from '@/components/navigation/Header.vue';
import Note from '@/components/display/Note.vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { createApp, getApps, updateApp, removeApp } from '@/api/app.ts'
import { getOneNote } from '@/api/note.ts'
import message from '@/components/feedback/message';

const router = useRouter();
const apps = ref([]);
const oneNote = ref();

const setApps = () => {
    router.push({
        name: 'apps'
    })
}
const setLibrary = () => {
    router.push({
        name: 'library'
    })
}
onMounted(() => {
    getApps('quick').then(data => {
        apps.value = data || [];
    })
    getOneNote().then(data => {
        oneNote.value = data;
    })
})
</script>


<style lang='scss' scoped></style>