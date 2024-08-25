<template>
    <div class="h-screen flex flex-col items-center justify-center">
        <div class="w-80 flex flex-col items-center bg-transparent">
            <!-- <h1 class="font-bold text-5xl mb-8 text-gray-600">welcome</h1> -->
            <FishGlass class="w-full h-36 rounded-[3rem] mb-8 shadow-md" />
            <button
                class="w-80 h-12 rounded-[3rem] mb-2 bg-green-500 lg:text-lg text-white font-semibold shadow-md hover:bg-green-400">微信登录</button>
            <button
                class="w-80 h-12 rounded-[3rem] bg-blue-500 lg:text-lg text-white font-semibold shadow-md hover:bg-blue-400">账号登录</button>
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import FishGlass from '@/components/animation/FishGlass.vue';
</script>

<style lang='scss'></style>