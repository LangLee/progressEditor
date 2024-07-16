<template>
    <div class="w-full h-full flex flex-col">
        <Codemirror class="w-full h-full" v-model="code" pleholder="输入代码..." :autofocus="true" :indent-with-tab="true" :disabled="!editable"
            :tab-size="2" :extensions="extensions" @ready="handleReady" @change="change" @focus="focus" @blur="blur">
        </Codemirror>
    </div>
</template>
<script setup lang="ts">
import { ref, shallowRef, defineProps, defineEmits, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { debounce } from '@/common/utils'
// import { oneDark } from '@codemirror/theme-one-dark'

const extensions = [javascript()];
const props = defineProps({
    modelValue: String,
    editable: {
        type: Boolean,
        default: true
    }
});
const emits = defineEmits(['update:modelValue']);
const code = ref(props.modelValue);
const view = shallowRef();
const handleReady = (payload) => {
    view.value = payload.view
}

const updateContent = debounce((code) => {
    emits('update:modelValue', code);
}, 300);
const change = (code) => {
    updateContent(code)
};
const focus = () => {
    console.log('focus');
};
const blur = () => {
    console.log('change');
};
watch(() => props.modelValue, (newVal) => {
    code.value = newVal;
});
</script>


<style lang='scss'>
.cm-editor {
    height: 100%;
    border: 1px dotted rgb(203 213 225);
}
</style>