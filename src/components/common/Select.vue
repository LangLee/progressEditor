<template>

    <div
        class="flex w-full p-2 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
        <div class="flex-1 pr-4">
            <span v-if="display">{{ display }}</span>
            <span v-else class="text-slate-300">{{ palaceHolder }}</span>
        </div>
        <tippy class="w-0" ref="dropdown" trigger="click" placement="bottom-end" :offset="[0, 10]" animation="fade" :interactive="true" :arrow="false">
            <RemixIcon class="float-right hover:text-blue-500" name="arrow-down-s-line" />
            <template #content>
                <div class="w-[17rem] p-2 bg-white shadow-xl rounded">
                    <div v-for="(item, index) in options" :key="index"
                        class="w-full px-2 py-1 cursor-pointer hover:bg-blue-100" @click="selectItem(item)">
                        {{ item.label }}
                    </div>
                </div>
            </template>
        </tippy>
    </div>

</template>
<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from 'vue'
import RemixIcon from './RemixIcon.vue';
const dropdown = ref()
const props = defineProps({
    options: {
        type: Array,
        default: () => []
    },
    modelValue: String,
    palaceHolder: {
        type: String,
        default: '请选择'
    }
})
const emits = defineEmits(['update:value'])
let showValue;
props.options.map(({ value, label }) => {
    if (props.value === value) {
        showValue = label;
    }
})
const display = ref(showValue)
const selectItem = (item) => {
    display.value = item.label;
    emits('update:modelValue', item.value);
    dropdown.value.hide();
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