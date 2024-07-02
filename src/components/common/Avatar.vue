<template>
    <div class="inline-block w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-center m-2">
        <RemixIcon class="text-slate-50 font-medium text-xl" :name="icon"></RemixIcon>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
const props = defineProps({
    icon: {
        type: String,
        default: 'user-2-fill'
    }
})
</script>


<style lang='scss' scoped>

</style>