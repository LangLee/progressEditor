<template>
    <div class="flex flex-col h-screen w-full">
        <Header :hiddenFold="true">
        </Header>
        <div class="w-full flex-1 flex flex-row flex-wrap p-2 lg:p-4 overflow-y-auto max-w-screen-2xl mx-auto">
            <ImageView v-for="(item, index) in files" :key="index" :modelValue="item" @remove="(file)=>onRemove(file, index)"/>
            <div class="flex w-32 h-32 m-2 justify-center items-center border border-gray-100 text-5xl text-gray-300 hover:text-gray-500 cursor-pointer" @click="onUpload">
                <RemixIcon name="upload-cloud-line"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFiles, remove, upload as uploadApi } from '@/api/file'
import Header from '@/components/navigation/Header.vue'
import ImageView from '@/components/display/ImageView.vue';
import RemixIcon from '@/components/common/RemixIcon.vue'
import { upload } from '@/common/utils'
const files = ref(Array<any>([]));
const onUpload = ()=>{
    upload({uploader: uploadApi}).then(res=>{
        let data = res.data;
        files.value.push({name: data})
    })
}
const onRemove = (file, index)=>{
    remove(file).then(res=>{
        if(res){
            files.value.splice(index, 1)
        }
    })
}
onMounted(()=>{
    getFiles().then(res=>{
        files.value = res
    })
})
</script>

<style lang='scss' scoped></style>