<template>
    <div class="relative w-full p-2 my-2 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        @click="toggleDropdown">
        <span class="w-full pr-4">{{ display }}</span>
        <RemixIcon class="float-right text-xl hover:text-blue-500" @click="toggleDropdown" name="arrow-down-s-line" />
        <transition name="fade">
            <div v-if="selecting" class="absolute top-12 left-0 w-full bg-white shadow-xl rounded-md z-[60]">
                <div v-for="(item, index) in options" :key="index" class="px-2 py-1 hover:bg-slate-100 cursor-pointer"
                    @click.stop="selectItem(item)">
                    {{ item.label }}
                </div>
            </div>
        </transition>
    </div>
</template>
<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from 'vue'
import RemixIcon from './RemixIcon.vue';
const props = defineProps({
    options: {
        type: Array,
        default: () => []
    },
    modelValue: String
})
const emits = defineEmits(['update:value'])
let showValue;
props.options.map(({ value, label }) => {
    if (props.value === value) {
        showValue = label;
    }
})
const selecting = ref(false);
const display = ref(showValue)
const selectItem = (item) => {
    display.value = item.label;
    selecting.value = false;
    emits('update:modelValue', item.value)
}
const toggleDropdown = () => {
    selecting.value = !selecting.value;
}
watch(() => props.modelValue, (newVal, oldVal) => {
    props.options.map(({ value, label }) => {
        if (newVal === value) {
            display.value = label;
        }
    })
})
</script>


<style lang='scss' scoped></style>