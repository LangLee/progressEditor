<template>
    <div class="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-center m-2" :class="sizeClasses">
        <RemixIcon class="text-slate-50" :name="icon" :class="textClasses"></RemixIcon>
    </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
const props = defineProps({
    size: {
        type: String,
        default: 'md',
        validate: function (value) {
            return ['sm', 'md', 'lg'].indexOf(value) !== -1
        }
    },
    icon: {
        type: String,
        default: 'user-2-fill'
    }
})
const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'w-6 h-6'
        case 'md':
            return 'w-8 h-8'
        case 'lg':
            return 'w-10 h-10'
    }
})
const textClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'font-normal text-base'
        case 'md':
            return 'font-medium text-xl'
        case 'lg':
            return 'font-bold text-2xl'
    }
})
</script>


<style lang='scss' scoped>

</style>