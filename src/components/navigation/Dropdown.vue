<template>
    <tippy ref="dropdown" :trigger="trigger" :placement="placement" :offset="offset" animation="scale" :interactive="true" :onShow="dropdownShow" :onHide="dropdownHide">
        <div>
            <slot name="title">
                <span class="cursor-pointer">{{ title }}</span>
            </slot>
            <RemixIcon class="text-xs ml-1 text-gray-500" :name="hidden ? 'arrow-down-s-line' : 'arrow-up-s-line'" />
        </div>
        <template #content>
            <slot name="content">
                <div class="shadow-lg bg-white rounded-lg p-1 w-min-48 font-normal">
                    <ul>
                        <li v-for="item in options" :key="item.value">
                            <slot name="item" :item="item">
                                <div class="h-8 leading-8 px-2 rounded mb-1 hover:bg-gray-100 cursor-pointer text-gray-500" @click="onSelect(item)">{{ item.label }}</div>
                            </slot>
                        </li>
                    </ul>
                </div>
            </slot>
        </template>
    </tippy>
</template>
<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
const appendToBody = () => (document.body);
const dropdown = ref();
const hidden = ref(true);
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    },
    placement: {
        type: String,
        default: 'bottom'
    },
    trigger: {
        type: String,
        default: 'click'
    },
    offset: {
        type: Array,
        default: () => [0, 10]
    }
})
const emits = defineEmits(['select'])
const onSelect = (item) => {
    emits('select', item);
    dropdown?.value?.hide();
    console.log(item)
}
const dropdownShow = () => {
    hidden.value = false;
    return true;
}
const dropdownHide = () => {
    hidden.value = true;
    return true;
}
</script>


<style lang='scss' scoped></style>