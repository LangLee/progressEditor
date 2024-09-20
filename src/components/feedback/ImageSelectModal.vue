<template>
<Modal :title="title" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
    <div class="w-full h-full flex flex-row flex-wrap overflow-y-auto">
        <ImageView v-for="(item, index) in files" :key="item?._id" :selectable="true" :editable="false" :active="activeItem?._id === item?._id" :modelValue="item" @select="onSelect"/>
    </div>
</Modal>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import Modal from '@/components/feedback/Modal.vue'
import ImageView from '@/components/display/ImageView.vue';
import { getFiles } from '@/api/file'
const props = {
    title: {
        type: String,
        default: '选择图片'
    },
    visible: {
        type: Boolean,
        default: false
    }
}
const emits = defineEmits(['update:app', 'confirm', 'cancel']);
const files = ref([]);
const visibleState = ref(props.visible)
const activeItem = ref();
const confirm = () => {
    emits('confirm', activeItem.value);
    activeItem.value = undefined;
    visibleState.value = false;
}
const cancel = () => {
    emits('cancel');
    activeItem.value = undefined;
    visibleState.value = false;
}

const onSelect = (item)=>{
    let {_id} = item;
    activeItem.value  = activeItem.value?._id === _id? undefined : item;
}
watch(() => props.visible, () => {
    visibleState.value = props.visible
})

onMounted(()=>{
    getFiles().then(res=>{
        files.value = res
    })
})
</script>


<style lang='scss' scoped>

</style>