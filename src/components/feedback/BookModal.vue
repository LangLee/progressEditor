<template>
    <Modal v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <ProInput class="my-2" name="title" v-model="book.title" placeholder="请输入书名" border />
        <ProSelect class="my-2" v-model="book.category" :options="categoryOptions"></ProSelect>
        <ProInput v-if="fixedType === 'link'" class="my-2" name="url" v-model="book.url"
            placeholder="请输入链接(http://www.xxxx.com)" />
        <ProSelect v-else-if="!fixedType" class="my-2" v-model="book.type" :options="typeOptions"></ProSelect>
    </Modal>
</template>
<script setup>
import { ref, reactive, defineProps, watch, computed } from 'vue'
import Modal from './Modal.vue'
import { Classification } from '@/types/enum'
import ProSelect from '@/components/entry/ProSelect.vue'
import ProInput from '@/components/entry/ProInput.vue'
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
    typeOptions: {
        type: Object,
        default: () => Object.keys(Classification).filter((key) => !['chat', 'link'].includes(key)).map((key) => ({ label: Classification[key], value: key }))
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