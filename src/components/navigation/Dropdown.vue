<template>
    <tippy ref="dropdown" :trigger="trigger" :placement="placement" :offset="offset"
        :interactive="true" :onShow="dropdownShow" :onHide="dropdownHide" :arrow="false">
        <div>
            <slot name="title">
                <span class="cursor-pointer">{{ title }}</span>
            </slot>
            <RemixIcon class="text-xs ml-1 text-gray-500" :name="hidden ? 'arrow-down-s-line' : 'arrow-up-s-line'" />
        </div>
        <template #content>
            <slot name="content">
                <div class="shadow-lg bg-white dark:bg-neutral-800 rounded dark:rounded-none p-1 min-w-36 font-normal">
                    <div v-for="item in options" :key="item.value" @click.stop="hideDropdown">
                        <slot name="item" :item="item">
                            <div class="h-8 leading-8 px-2 rounded dark:rounded-none mb-1 hover:bg-gray-100 cursor-pointer text-gray-500 dark:text-gray-400"
                                @click="onSelect(item)">{{ item.label }}</div>
                        </slot>
                    </div>
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
    },
    selectAndHide: {
        type: Boolean,
        default: true
    }
})
const emits = defineEmits(['select'])
const onSelect = (item) => {
    emits('select', item);
    
    // console.log(item)
}
const dropdownShow = () => {
    hidden.value = false;
    return true;
}
const dropdownHide = () => {
    hidden.value = true;
    return true;
}
const hideDropdown = ()=>{
    if (!props.selectAndHide) {
        return true;
    }
    dropdown?.value?.hide();
    hidden.value = true;
}
</script>


<style lang='scss' scoped></style>