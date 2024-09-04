<template>
<button class="hover:bg-gray-200 hover:text-gray-700 px-1 rounded" @click.stop="onClick">
    <slot>
        <RemixIcon v-if="icon" :name="icon"></RemixIcon>
        <span v-if="title" class="ml-1">{{title}}</span>
    </slot>
</button>
</template>
<script setup>
import { ref, reactive } from 'vue'
const props = defineProps({
    icon: String,
    title: String
})
const emits = defineEmits(['click'])
const onClick = () => {
    emits('click')
}
</script>


<style lang='scss' scoped>

</style>