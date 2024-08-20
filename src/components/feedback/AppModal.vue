<template>
    <Modal :title="title" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <!-- <input
            class="p-2 mb-4 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="app.name" placeholder="请输入应用名" :required="true"/> -->
        <input
            class="p-2 mb-4 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="app.title" placeholder="请输入应用标题" />
        <input
            class="p-2 mb-4 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="app.url" placeholder="请输入应用地址" />
        <input
            class="p-2 mb-4 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            type="text" v-model="app.icon" placeholder="应用图标" />
        <div class="flex flex-row items-center px-2 mb-4">
            <span class="mr-2">是否内置</span>
            <Switch v-model="app.inner"></Switch>
        </div>
        <div class="flex flex-row items-center px-2">
            <span class="mr-2">快捷应用</span>
            <Switch v-model="app.quick"></Switch>
        </div>
        <div v-if="system" class="flex flex-row items-center px-2 mt-4">
            <span class="mr-2">系统应用</span>
            <Switch v-model="app.system"></Switch>
        </div>
    </Modal>
</template>
<script setup>
import { ref, reactive, defineProps, watch, computed } from 'vue'
import Modal from './Modal.vue'
import { Classification } from '@/types/enum'
import Switch from '@/components/common/Switch.vue'
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
                title: '',
                url: '',
                icon: '',
                inner: false,
                quick: false,
                system: false
            }
        }
    },
    system: {
        type: Boolean,
        default: false
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