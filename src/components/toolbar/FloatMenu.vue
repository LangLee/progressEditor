<template>
    <div class="floating-action-bar p-1 text-slate-50 text-lg relative flex flex-col gap-2">
        <button class="w-8 h-8 text-center rounded-full bg-blue-700/50 hover:bg-blue-500 cursor-pointer" @click.stop="save">
            <RemixIcon name="save-line" v-tippy="{ content: '保存' }"/>
        </button>
        <button v-if="more && actions.length>0" @click="toggleMore"
            class="w-8 animate-bounce text-center text-blue-700/50 hover:text-blue-500 cursor-pointer">
            <RemixIcon name="arrow-down-wide-line" />
        </button>

        <transition name="slide-down">
            <div v-if="!more" class="flex flex-col gap-2">
                <button v-if="actions.includes('import')" class="w-8 h-8 text-center rounded-full bg-blue-700/50 hover:bg-blue-500 cursor-pointer" @click.stop="importFile">
                    <RemixIcon name="import-fill" v-tippy="{ content: '导入' }" />
                </button>
                <button v-if="actions.includes('exportMd')" class="w-8 h-8 text-center rounded-full bg-blue-700/50 hover:bg-blue-500 cursor-pointer"  @click.stop="exportFile('markdown')">
                    <RemixIcon name="markdown-fill" v-tippy="{ content: '导出markdown' }"/>
                </button>
                <button v-if="actions.includes('exportHtml')" class="w-8 h-8 text-center rounded-full bg-blue-700/50 hover:bg-blue-500 cursor-pointer"  @click.stop="exportFile('html')">
                    <RemixIcon name="html5-fill" v-tippy="{ content: '导出html' }"/>
                </button>
                <button v-if="actions.includes('exportJson')" class="w-8 h-8 text-center rounded-full bg-blue-700/50 hover:bg-blue-500 cursor-pointer"  @click.stop="exportFile('json')">
                    <RemixIcon name="javascript-fill" v-tippy="{ content: '导出json' }"/>
                </button>
                <button v-if="actions.includes('exportDocx')"  class="w-8 h-8 text-center rounded-full bg-blue-700/50 hover:bg-blue-500 cursor-pointer" @click.stop="exportFile('docx')">
                    <RemixIcon name="file-word-fill" v-tippy="{ content: '导出word' }"/>
                </button>
                <!-- <button class="w-8 h-8 text-center rounded-full bg-blue-700/50 hover:bg-blue-500 cursor-pointer" @click.stop="exportFile('pdf')">
                    <RemixIcon name="file-pdf-2-fill" v-tippy="{ content: '导出pdf' }"/>
                </button> -->
                <button v-if="actions.includes('share')"  class="w-8 h-8 text-center rounded-full bg-blue-700/50 hover:bg-blue-500 cursor-pointer" @click.stop="share">
                    <RemixIcon name="share-fill" v-tippy="{ content: '分享' }"/>
                </button>
            </div>
        </transition>
        <button v-if="!more && actions.length>0" @click="toggleMore"
            class="w-8 animate-bounce text-center text-blue-700/20 hover:text-blue-500 cursor-pointer">
            <RemixIcon name="arrow-up-wide-line" />
        </button>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import RemixIcon from '@/components/common/RemixIcon.vue';
import {change} from '@/common/status'
const props = defineProps({
    editor: Object,
    actions: {
        type: Array,
        default: ['import', 'exportDocx', 'exportMd', 'exportHtml', 'exportJson', 'share']
    }
})
// const emits = defineEmits(['save'])
const more = ref(true);
const toggleMore = () => {
    more.value = !more.value;
}
const importFile = () => {
    props.editor?.chain()?.import()
}
const exportFile = (format) => {
    props.editor?.chain()?.export(format)
}
const save = () => {
    props.editor?.chain()?.save()
}
const share = () => {
    props.editor?.chain()?.share()
}
</script>

<style lang='scss' scoped>
.floating-action-bar {
    button {
        transition: background-color 0.3s ease;
    }

    .slide-down-enter-active,
    .slide-down-leave-active {
        transition: height 0.5s ease;
    }

    .slide-down-enter-from,
    .slide-down-leave-to {
        height: 0;
        overflow: hidden;
    }

    .slide-down-enter-to,
    .slide-down-leave-from {
        height: auto;
        overflow: visible;
    }
}

.rotate-45 {
    transform: rotate(45deg);
}
</style>