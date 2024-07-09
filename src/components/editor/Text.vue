<template>
    <div id="editorWrapper" class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 py-10">
        <editor-content class="h-full" :editor="editor" />
    </div>
</template>
<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { defineProps, defineEmits, watch, onBeforeUnmount } from 'vue'
import { debounce } from '@/common/utils'
const props = defineProps({
    modelValue: String,
    editable: {
        type: Boolean,
        default: true
    }
});
const emits = defineEmits(['update:modelValue']);
const updateContent = debounce((editor) => {
  emits('update:modelValue', editor.getHTML());
}, 300);
const editor = useEditor({
    editable: props.editable,
    content: props.modelValue,
    editorProps: {
        attributes: {
            class: 'prose w-full max-w-full focus:outline-none',
        },
    },
    extensions: [
        Document,
        Paragraph,
        Text
    ],
    onUpdate: ({ editor }) => {
        updateContent(editor)
    },
})
watch(() => props.modelValue, (value) => {
    const isSame = editor.value && editor.value.getHTML() === value;
    // JSON
    // const isSame = JSON.stringify(editor.getJSON()) === JSON.stringify(value)
    if (isSame) {
        return;
    };
    editor.value && editor.value.commands.setContent(value || '', true);
})
watch(() => props.editable, (value, oldValue) => {
    if (value === oldValue) {
        return;
    }
    editor.value && editor.value.setEditable(value)
})
onBeforeUnmount(() => {
    editor.value && editor.value.destroy()
})

</script>

<style lang='scss' scoped></style>