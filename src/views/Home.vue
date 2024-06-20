<template>
    <div class="h-screen w-full bg-white flex">
        <div v-for="(app, index) in apps" :key="app.id" class="flex flex-col items-center w-32 h-32 p-4 m-8 border-blue-400 rounded-md hover:border-blue-600  text-blue-400 hover:text-blue-600 shadow-lg" @click="openApp(app)">
            <RemixIcon class="text-5xl" :name="app.icon"/>
            <span class="font-medium mt-1">{{ app.name }}</span>
            <!-- <span class="text-sm text-orange-100">{{ app.inner?'(内)':'(外)' }}</span> -->
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'; 
import RemixIcon from '@/components/common/RemixIcon.vue'
const router = useRouter();
const apps = ref([
    {
        id: 'books',
        name: '我的图书',
        icon: 'book-2-fill',
        url: '/books',
        inner: true
    },{
        id: 'schedule',
        name: '图书日历',
        icon: 'calendar-2-fill',
        url: '/schedule',
        inner: true
    },{
        id: 'robot',
        name: '聊天机器人',
        icon: 'robot-3-fill',
        url: '/robot',
        inner: true
    }
]);
const openApp = (app) => {
    if (app.inner) {
        router.push(app.url);
    } else {
        window.open(app.url);
    }
}
</script>


<style lang='scss' scoped>

</style>