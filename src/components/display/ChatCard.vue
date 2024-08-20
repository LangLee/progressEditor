<template>
   <div class="flex flex-row mb-4">
        <div class="w-10 py-2 pr-2">
            <Avatar v-if="left" icon="robot-2-fill" :file="avatar" />
        </div>
        <div class="flex flex-1 overflow-hidden" :class="left ? 'justify-start' : 'justify-end'">
            <div class="max-w-full border border-slate-300/20 inline-block px-4 py-2 rounded-lg" :class="left ? 'bg-white dark:bg-neutral-800' : 'bg-blue-100 dark:bg-neutral-700'">
                <span class="prose prose-sm dark:prose-invert tiptap" v-html="markdown"></span>
                <div v-if="toolbar" class="text-slate-400 dark:text-neutral-500 text-sm mt-2 cursor-pointer">
                    <span class="mr-2 hover:text-slate-700 dark:hover:text-neutral-300" @click.stop="onAdd">
                        <RemixIcon  name="add-box-line" />
                        <span>笔记</span>
                    </span>
                    <span class="mr-2 hover:text-slate-700 dark:hover:text-neutral-300" @click.stop="onCopy">
                        <RemixIcon  name="file-copy-2-line" />
                        <span>复制</span>
                    </span>
                </div>
            </div>
        </div>
        <div class="w-10 py-2 pl-2">
            <Avatar v-if="!left" :file="avatar"/>
        </div>
   </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import { marked } from 'marked'
import Avatar from '@/components/common/Avatar.vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { copyTextToClipboard } from '@/common/utils'
import message from '@/components/feedback/message.ts'
const props = defineProps({
    avatar: {
        type: String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },
    position: {
        type: String,
        default: 'left'
    },
    toolbar: {
        type: Boolean,
        default: false
    }
})
const markdown = computed(() => {
    return marked.parse(props.content)
})
const left = computed(() => {
    return props.position === 'left'
})
const onAdd = ()=>{
    console.log('onAdd')
}
const onCopy = ()=>{
    copyTextToClipboard(props.content, ()=>{
        message.success('复制成功！')
    })
}
</script>


<style lang='scss' scoped>

</style>