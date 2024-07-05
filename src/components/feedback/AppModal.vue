<template>
    <Modal :title="title" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <input
            class="p-2 mb-4 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="app.name" placeholder="请输入应用名" :required="true"/>
        <input
            class="p-2 mb-4 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="app.title" placeholder="请输入应用标题" />
        <input
            class="p-2 mb-4 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="app.url" placeholder="请输入应用地址" />
        <input
            class="p-2 mb-4 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="app.icon" placeholder="应用图标" />
        <div class="px-2">
            <label class="mr-2" for="inner">是否内置</label>
            <span>
                <input id="inner" type="checkbox" v-model="app.inner" />
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
    title: {
        type: String,
        default: '新增应用'
    },
    visible: {
        type: Boolean,
        default: false
    },
    app: {
        type: Object,
        default: () => {
            return {
                name: '',
                title: '',
                url: '',
                icon: '',
                inner: false
            }
        }
    }
})
const emits = defineEmits(['update:app', 'confirm', 'cancel']);
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