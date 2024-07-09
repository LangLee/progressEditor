<template>
    <Modal v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <input
            class="p-2 mb-2 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="book.title" placeholder="请输入书名" />
        <ProSelect class="my-2" v-model="book.category" :options="categoryOptions"></ProSelect>
        <input v-if="fixedType==='link'"
            class="p-2 mb-2 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="book.url" placeholder="请输入链接(http://www.xxxx.com)" />
        <div v-else-if="!fixedType" class="flex flex-row flex-wrap px-2">
            <span v-for="(type, index) in Object.keys(types)" :key="index" class="mr-2 mb-2 text-base">
                <span class="mr-2">
                    <input :id="type" :value="type" type="radio" v-model="book.type" />
                </span>
                <label :for="type">{{ types[type] }}</label>
            </span>
        </div>
    </Modal>
</template>
<script setup>
import { ref, reactive, defineProps, watch, computed } from 'vue'
import Modal from './Modal.vue'
import { Classification } from '@/types/enum'
import ProSelect from '../common/Select.vue'
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    book: {
        type: Object,
        default: () => {
            return {
                id: '',
                title: '',
                category: '',
                url: '',
                type: ''
            }
        }
    },
    categories: {
        type: Array,
        default: () => {
            return []
        }
    },
    types: {
        type: Object,
        default: () => {
            return Classification
        }
    },
    fixedType: {
        type: String,
        default: ''
    }
})
const categoryOptions = computed(() => {
    return props.categories.map(category => {
        return {
            label: category.name,
            value: category.id
        }
    })
})
const emits = defineEmits(['update:book', 'confirm', 'cancel']);
const visibleState = ref(props.visible)
const confirm = () => {
    emits('confirm')
    visibleState.value = false;
}
const cancel = () => {
    emits('cancel')
    visibleState.value = false;
}
watch(() => props.visible, () => {
    visibleState.value = props.visible
})
</script>
<style lang='scss' scoped></style>