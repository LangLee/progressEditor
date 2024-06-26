<template>
    <div class="w-full h-screen flex flex-col relative overflow-y-auto pb-40">
        <Codemirror class="w-full h-full pro-code" v-model="code" pleholder="输入代码..." :autofocus="true"
            :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="handleReady" @change="change"
            @focus="focus" @blur="blur">
        </Codemirror>
        <div class="absolute left-0 bottom-0 w-full flex flex-col bg-slate-900">
            <div class="flex flex-row h-8 text-sm">
                <button
                    class="border border-blue-300 text-blue-300 hover:text-blue-100 hover:border-blue-100 rounded-md px-2 m-1"
                    @click="executeCode">执行</button>
                <button
                    class="border border-slate-300 text-slate-300 hover:text-slate-100 hover:border-slate-100 rounded-md px-2 m-1"
                    @click="clearOutput">清除</button>
            </div>
            <div class="h-32 px-2 overflow-y-auto">
                <p v-for="(item, index) in output" :key="index" :class="item.classes">{{ item.content }}</p>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, shallowRef, defineProps, defineEmits, watch } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

const extensions = [javascript(), oneDark];
const props = defineProps({
    modelValue: String
});
const emits = defineEmits(['update:modelValue']);
const code = ref(props.modelValue);
const output = ref([{ classes: 'font-bold', content: '输出结果:' }]);
const view = shallowRef()
const handleReady = (payload) => {
    view.value = payload.view
}
const change = (code) => {
    emits('update:modelValue', code);
};
const focus = () => {
    console.log('focus');
};
const blur = () => {
    console.log('change');
};
const executeCode = () => {
    const console = {
        log: (...args) => {
            output.value.push({ classes: 'text-green-500', content: args.join(' ') });
        },
        error: (...args) => {
            output.value.push({ classes: 'text-red-500', content: args.join(' ') });
        },
        warning: (...args) => {
            output.value.push({ classes: 'text-yellow-500', content: args.join(' ') });
        },
        info: (...args) => {
            output.value.push({ classes: 'text-blue-500', content: args.join(' ') });
        }
    }
    let func;
    try {
        func = new Function('console', code.value || "");
    } catch (error) {
        if (typeof error === 'string') {
            output.value.push({ classes: 'text-red-500', content: error });
        } else if (error instanceof Error) {
            output.value.push({ classes: 'text-red-500', content: error.message });
        }
    };
    let result = func(console);
    output.value.push({ classes: 'text-green-500', content: result });
}
const clearOutput = () => {
    output.value = [{ classes: 'font-bold', content: '输出结果:' }];
}
watch(() => props.modelValue, (newVal) => {
    code.value = newVal;
});
</script>


<style lang='scss' scoped>
.pro-code {
    :deep .cm-editor {
        height: 100%;
        border: 1px dotted rgb(203 213 225);
    }
}
</style>