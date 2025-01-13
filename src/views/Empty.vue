<template>
    <div
        class="w-full h-full flex flex-col justify-center items-center my-20 text-gray-500 dark:text-gray-300 leading-6 italic">
        <slot>
            <img class="w-80" src="../assets/no-data.png" alt="暂无内容">
        </slot>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
</script>


<style lang='scss' scoped>
</style>