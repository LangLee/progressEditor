<template>
    <div class="w-full bg-white/40 dark:bg-neutral-700/40 backdrop-blur-2xl overflow-y-auto">
        <div class="flex flex-col items-center max-w-screen-md mx-auto p-2">
            <EditItem v-for="(item, index) in options" :titleProperty="titleProperty" :subTitleProperty="subTitleProperty" :key="item._id" :editable="editable" :model-value="item" @skip="skipTo" @edit="(item)=>edit(item, index)" @remove="(item)=>remove(item, index)"></EditItem>
            <div v-if="!options || options.length===0" class="mt-20 text-center text-neutral-500 dark:text-neutral-400">
                暂无记录
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, defineEmits } from 'vue'
import EditItem from '@/components/display/EditItem.vue'
const props = defineProps({
    options: {
        type: Array,
        default: []
    },
    editable: {
        type: Boolean,
        default: true
    },
    titleProperty: {
        type: String,
        default: 'title'
    },
    subTitleProperty: {
        type: String,
        default: 'subTitle'
    }
})
const emits = defineEmits(['skipTo', 'edit', 'remove']);
const skipTo = (item) => {
    emits('skipTo', item);
}
const edit = (item, index) => {
    emits('edit', item, index);
}
const remove = (item, index) => {
    emits('remove', item, index);
}
</script>


<style lang='scss' scoped></style>