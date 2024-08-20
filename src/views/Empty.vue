<template>
    <div
        class="w-full h-full flex flex-col justify-center items-center my-20 text-gray-500 dark:text-gray-300 font-medium leading-6 italic">
        <slot>
            <FishGlass class="m-2" />
            <p>鱼啊鱼</p>
            <p>去翻阅你书籍的海洋</p>
        </slot>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import FishGlass from '@/components/animation/FishGlass.vue'
</script>


<style lang='scss' scoped></style>