<template>
    <div class="w-36 h-36 p-2 relative cursor-pointer">
        <img class="w-full h-full" :src="src" :alt="modelValue.name"></img>
        <div class="absolute top-0 left-0 w-32 h-32 m-2 bg-gray-500 opacity-0 hover:opacity-50" @click="onSelect">
            <div class="flex justify-center items-center h-full">
                <div class="text-white text-lg">
                    <RemixIcon v-if="editable" class="text-2xl" name="delete-bin-line" @click="onRemove"></RemixIcon>
                    <RemixIcon v-if="active" class="text-2xl" name="checkbox-circle-line"></RemixIcon>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { baseUrl } from '@/api/globalConfig';
import RemixIcon from '@/components/common/RemixIcon.vue';
import modal from '@/components/feedback/modal';
const props = defineProps({
    modelValue: {
        type: Object,
        default: ()=>{name: ''}
    },
    editable: {
        type: Boolean,
        default: true
    },
    selectable: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    }
})
const emits = defineEmits('remove', 'select')
const src = computed(() => {
    return `${baseUrl}/file/preview?file=${props.modelValue.name}`
})
const onRemove = ()=>{
    modal.confirm({
        title: '确认删除',
        content: '确认删除该图片？',
        onOk: ()=>{
            emits('remove', props.modelValue.name)
        }
    })
}
const onSelect = ()=>{
    if(props.selectable){
        emits('select', props.modelValue)
    }
}
</script>


<style lang='scss' scoped>

</style>