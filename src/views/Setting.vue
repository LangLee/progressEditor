<template>
    <div>
        <Header :hiddenFold="true"></Header>
        <Switch v-model="test"></Switch>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import Header from '@/components/navigation/Header.vue'
import Switch from '@/components/common/Switch.vue'
const test = ref(false)
</script>
<style lang='scss' scoped>

</style>