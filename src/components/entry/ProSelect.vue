<template>
    <div ref="select"
        class="flex p-2 bg-white text-slate-600 dark:text-slate-100 dark:bg-neutral-800 placeholder-slate-300 border rounded"
        :class="{ 'outline-none ring-1 ring-blue-600 border-transparent': !hidden }" @click="showModal">
        <div class="flex-1 pr-4">
            <span v-if="display">{{ display }}</span>
            <span v-else class="text-slate-300">{{ palaceHolder }}</span>
        </div>
        <RemixIcon v-if="mobile" class="float-right hover:text-blue-500" :name="hidden ? 'arrow-down-s-fill' : 'arrow-up-s-fill'" />
        <tippy v-if="!mobile" ref="dropdown" trigger="click" placement="bottom-end" :offset="[10, 15]" animation="fade"
            :interactive="true" :arrow="false" :triggerTarget="select" :onShow="dropdownShow" :onHide="dropdownHide">
            <RemixIcon class="float-right hover:text-blue-500" :name="hidden ? 'arrow-down-s-fill' : 'arrow-up-s-fill'" />
            <template #content>
                <div class=" text-slate-600 dark:text-slate-300 overflow-y-auto max-h-60"
                    :style="{ width: dropdownWidth }">
                    <div v-if="options && options.length" v-for="(item, index) in options" :key="index"
                        class="w-full h-8 leading-8 px-2 rounded dark:rounded-none mb-1 hover:bg-neutral-100 cursor-pointer text-gray-700 dark:text-gray-200"
                        @click="selectItem(item)">
                        {{ item.label }}
                    </div>
                    <div v-else class="w-full px-2 py-1">
                        暂无数据
                    </div>
                </div>
            </template>
        </tippy>
        <Modal v-else :visible="!hidden" :zIndex="100" :footer="false" @update:visible="dropdownHide">
            <div class="w-full bg-white dark:bg-neutral-800">
                <div v-if="options && options.length" v-for="(item, index) in options" :key="index"
                    class="py-2 cursor-pointer hover:bg-blue-400 hover:text-slate-50 text-center dark:text-slate-100 rounded"
                    @click="selectItem(item)">
                    {{ item.label }}
                </div>
                <div v-else class="w-full py-2 text-center">
                    暂无数据
                </div>
            </div>
        </Modal>
    </div>
</template>
<script setup>

import { ref, reactive, watch, defineProps, defineEmits, onMounted } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue';
import Modal from '@/components/feedback/Modal.vue'
import { isMobile } from '@/common/utils'
const hidden = ref(true);
const dropdown = ref();
const select = ref();
const dropdownWidth = ref('');
const mobile = ref(isMobile());
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
const display = ref('')
const selectItem = (item) => {
    display.value = item.label;
    emits('update:modelValue', item.value);
    hidden.value = true;
    dropdown?.value?.hide();
}
const dropdownShow = () => {
    hidden.value = false;
    return true;
}
const dropdownHide = () => {
    hidden.value = true;
    return true;
}
const showModal = () => {
    if (!isMobile()) {
        return true;
    }
    hidden.value = false;
}
watch(() => props.modelValue, (newVal) => {
    props.options.map(({ value, label }) => {
        if (newVal === value) {
            display.value = label;
        }
    })
}, { immediate: true })
onMounted(() => {
    dropdownWidth.value = `${select.value.clientWidth-14}px`;
})
</script>


<style lang='scss' scoped></style>