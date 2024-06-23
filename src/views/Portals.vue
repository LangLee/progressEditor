<template>
    <div class="h-screen w-full p-2 lg:p-8">
        <ul v-for="(portal, index) in portals" class="" :key="index">
            <p class="mb-2 text-basic lg:text-lg text-slate-700 font-normal lg:font-medium">{{ portal.name }}</p>
            <div class="flex flex-row flex-wrap">
                <li v-for="(book, idx) in portal.books" class='mb-2 mr-2 lg:mb-4 lg:mr-4' :key="idx">
                    <Card :book="book" />
                </li>
            </div>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import portals from '@/common/portals'
import Card from '@/components/common/Card.vue'
</script>

<style lang='scss' scoped></style>