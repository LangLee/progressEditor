<template>
    <div class="flex flex-col w-full h-full shadow-lg rounded-md">
        <div class="flex items-center justify-between h-12 px-4">
            <div v-if="formData.name" class="flex items-center text-lg font-bold">
                <img :src="getAssetsFile(`icon/${formData.name}.png`)" class="w-6 h-6 mr-2" />
                <span>{{ formData.title }}</span>
            </div>
            <div class="font-semibold text-sm">{{ formData.type }}</div>
        </div>
        <div v-if="formData.data && formData.data.length > 0" class="flex flex-col flex-1 overflow-y-auto px-4">
            <div v-for="(item, ind) in formData.data" class="flex items-center w-full py-2">
                <div class="font-bold w-6 h-6 mr-2 rounded text-center"
                    :class="ind === 0 ? 'bg-red-500 text-slate-50' : (ind === 1 ? 'bg-red-300 text-slate-50' : (ind === 2 ? 'bg-red-200 text-slate-50' : 'bg-slate-300'))">
                    {{ ind + 1 }}</div>
                <div class="flex-1"><a :href="item.url" target="_blank">{{ item.title }}</a></div>
            </div>
        </div>
        <div class="flex items-center justify-between h-12 px-4 text-slate-500">
            <span class="text-sm">{{ getPassTimeText(formData.updateTime) }}</span>
            <div class="bg-slate-100 hover:bg-slate-300 h-6 w-6 text-center rounded-lg cursor-pointer" @click="onLoad">
                <RemixIcon name="refresh-line" />
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { getHotTop } from '@/api/api';
import { getPassTimeText, getAssetsFile } from '@/common/utils'
const props = defineProps({
    type: String,
})
const formData = ref({});
const onLoad = () => {
    getHotTop(props.type).then(async data => {
        if (data) {
            formData.value = data;
        }
    })
}
onMounted(() => {
    onLoad();
})
</script>


<style lang='scss' scoped></style>