<template>
    <label
        class="relative inline-flex items-center h-6 border border-slate-400 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2">
        <input type="checkbox" :checked="modelValue" @change="$emit('update:modelValue', $event.target.checked)"
            class="absolute opacity-0 w-0 h-0" />
        <span aria-hidden="true"
            class="inline-block w-5 h-5 rounded-full shadow transform ring-0 transition duration-200 ease-in-out"
            :class="{
                'bg-blue-400 translate-x-5': modelValue, // 开启状态的背景色和位置
                'bg-slate-400 translate-x-0': !modelValue // 关闭状态的背景色和位置
            }"></span>
        <span class="sr-only">Use setting</span>
    </label>
</template>

<script setup>
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);
</script>