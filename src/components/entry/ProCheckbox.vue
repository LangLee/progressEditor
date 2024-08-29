<template>
    <div class="flex flex-row w-full items-center">
        <input :id="name"
            class="mr-2"
            type="checkbox" v-model="stateValue" @change="update" />
        <label v-if="label" :class="labelClass" :for="name">
            <slot name="label">{{ label }}</slot>
        </label>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    },
    labelClass: {
        type: String,
        default: 'flex-1'
    }
})
const emits = defineEmits(['update:modelValue']);
const stateValue = ref(props.modelValue);
const update = () => {
    emits('update:modelValue', stateValue.value)
}
watch(() => props.modelValue, (newValue) => {
    stateValue.value = newValue;
})
</script>


<style lang='scss' scoped></style>