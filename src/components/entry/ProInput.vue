<template>
    <div class="flex flex-row w-full py-2 lg:py-3 items-center">
        <label v-if="label" :class="labelClass" :for="name">{{ label }}</label>
        <input :id="name"
            class="flex-1 px-4 py-2 lg:py-3 bg-transparent text-slate-600 lg:text-lg placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
            :type="type" v-model="stateValue" :placeholder="placeholder" @change="update"/>
    </div>
</template>
<script setup>
import { ref, watch} from 'vue'
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
    placeholder: {
        type: String,
        default: ''
    },
    labelClass: {
        type: String,
        default: 'w-24'
    },
    type: {
        type: String,
        default: 'text'
    }
})
const emits = defineEmits(['update:modelValue']);
const stateValue = ref(props.modelValue);
const update = ()=>{
    emits('update:modelValue', stateValue.value)
}
watch(() => props.modelValue, (newValue) => {
    stateValue.value = newValue;
})
</script>


<style lang='scss' scoped></style>