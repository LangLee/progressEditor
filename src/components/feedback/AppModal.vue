<template>
    <Modal :title="title" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <ProInput class="lg:my-2" name="name" v-model="app.name" placeholder="请输入应用名" />
        <ProInput class="lg:my-2" name="title" v-model="app.title" placeholder="请输入应用标题" />
        <ProInput class="lg:my-2" name="url" v-model="app.url" placeholder="请输入应用地址" />
        <ProInput class="lg:my-2" name="icon" v-model="app.icon" placeholder="请输入应用图标" />
        <div class="flex flex-row items-center px-2 my-2">
            <span class="mr-2">是否内置</span>
            <ProSwitch v-model="app.inner"></ProSwitch>
        </div>
        <div class="flex flex-row items-center px-2 my-2">
            <span class="mr-2">快捷应用</span>
            <ProSwitch v-model="app.quick"></ProSwitch>
        </div>
        <div v-if="system" class="flex flex-row items-center px-2 my-2">
            <span class="mr-2">系统应用</span>
            <ProSwitch v-model="app.system"></ProSwitch>
        </div>
    </Modal>
</template>
<script setup>
import { ref, reactive, defineProps, watch, computed } from 'vue'
import Modal from './Modal.vue'
import { Classification } from '@/types/enum'
import ProSwitch from '@/components/entry/ProSwitch.vue'
import ProInput from '@/components/entry/ProInput.vue'
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