<template>
    <div class="flex flex-col w-full h-screen">
        <Header />
        <div class="flex-1 w-full flex flex-wrap p-2 overflow-y-auto max-w-screen-2xl mx-auto">
            <div class="w-full lg:w-1/4 h-96 p-2" v-for="type in types">
                <HotCard :type="type" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import Header from '@/components/navigation/Header.vue'
import HotCard from '@/components/display/HotCard.vue';
const types = ['toutiao', 'qq-news', 'weibo', 'zhihu', 'douyin', 'baidu', '36kr', 'bilibili', 'netease-news', 'tieba', 'juejin', 'douban-movie', 'jianshu', 'hellogithub'];
</script>


<style lang='scss' scoped></style>