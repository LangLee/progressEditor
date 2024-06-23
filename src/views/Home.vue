<template>
    <div class="h-screen w-full p-4 lg:p-8 bg-white flex flex-wrap content-start">
        <div v-for="(app, index) in apps" :key="app.id" class="flex flex-col items-center mb-4 mr-4 lg:mb-8 lg:mr-8">
            <Card :book="app" theme="blue"/>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import Card from '@/components/common/Card.vue'
import appList from '@/common/appList.ts'
const apps = ref(appList);
</script>


<style lang='scss' scoped>

</style>