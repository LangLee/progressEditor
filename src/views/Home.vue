<template>
    <div class="h-screen w-full bg-white flex flex-col overflow-y-auto">
        <Header :hiddenFold="true"></Header>
        <div class="flex p-4 lg:p-8 flex-wrap content-start">
            <div v-for="(app, index) in apps" :key="app._id"
                class="flex flex-col items-center mb-4 mr-4 lg:mb-8 lg:mr-8">
                <Card :modelValue="app" theme="blue" />
            </div>
            <div v-if="editable">
                <Card theme="blue" :modelValue="{ title: '新增应用', icon: 'add-line' }" @cardClick="appendApp" />
            </div>
        </div>
    </div>
    <AppModal :title="`${append ? '新增应用' : '编辑应用'}`" :visible="modalVisible" :app="app" @confirm="finishEditApp" />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Card from '@/components/common/Card.vue'
// import appList from '@/common/appList.ts'
import AppModal from '@/components/feedback/AppModal.vue'
import Header from '@/components/navigation/Header.vue';
import { createApp, getApps, updateApp } from '@/api/app.ts'

const apps = ref([]);
const editable = ref(false);
const modalVisible = ref(false);
const app = ref({});
const append = ref(false);
const appendApp = () => {
    append.value = true;
    app.value = { title: '新增', icon: 'app-store-line', inner: true };
    modalVisible.value = true;
}
const finishEditApp = () => {
    if (append.value) {
        createApp(app.value).then((data) => {
            apps.value.push(data);
            append.value = false;
            modalVisible.value = false;
        });
    } else {
        updateApp(app.value).then((data) => {
            apps.value.push(data);
            modalVisible.value = false;
        });
    }
}
onMounted(() => {
    getApps().then(data => {
        let { editable: readonly, apps: appList } = data || {}
        apps.value = appList || [];
        editable.value = readonly;
    })
})
</script>


<style lang='scss' scoped></style>