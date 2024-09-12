<template>
    <div class="flex text-base" :class="wrapClass" :style="{width}">
        <label v-if="label" class="px-1 py-2 text-gray-500 dark:text-gray-400" :class="labelClass" :for="name">{{ label }}</label>
        <input :id="name"
            class="flex-1 p-2 w-0 bg-transparent text-slate-600 dark:text-gray-300 placeholder-slate-300 focus:outline-none"
            :class="inputClass"
            :type="type" v-model="stateValue" :placeholder="placeholder" @change="update" @focus="focus" @blur="blur"/>
    </div>
</template>
<script setup>
import { ref, watch, defineProps, defineEmits, computed} from 'vue'
import { isMobile } from '@/common/utils';
const props = defineProps({
    width: {
        type: String,
        default: '100%'
    },
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
    labelWidth: {
        type: String,
        default: '24'
    },
    type: {
        type: String,
        default: 'text'
    },
    horizontal: {
        type: Boolean,
        default: true
    },
    required: {
        type: Boolean,
        default: false
    },
    border: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits(['update:modelValue']);
const isFocus = ref(false);
const stateValue = ref(props.modelValue);
const wrapClass = computed(() => `${props.horizontal?'flex-row items-center':'flex-col'} ${isMobile()?'border-b':''} ${props.border?'border rounded':''} ${isFocus.value?'isFocus':''}`)
const inputClass = computed(() => `${!isMobile() && !props.border?'border rounded focus:ring-1 focus:ring-blue-600 focus:border-transparent':''} ${props.horizontal?'':'w-full'}`)
const labelClass = computed(() => `w-${props.labelWidth} ${props.required?'required':''}`)
const update = ()=>{
    emits('update:modelValue', stateValue.value)
}
const focus = ()=>{
    isFocus.value = true;
}
const blur = ()=>{
    isFocus.value = false;
}
watch(() => props.modelValue, (newValue) => {
    stateValue.value = newValue;
})
</script>


<style lang='scss' scoped>
.required::after {
    content: '*';
    color: rgb(248 113 113);
    margin-left: 2px;
}
.isFocus {
    border-color: rgb(37 99 235);
}
</style>