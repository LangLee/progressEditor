
<template>
  <div id="editorWrapper" class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 py-10">
    <EditorContent class="h-full" :editor="editor" />
  </div>
</template>
<script setup lang="ts">
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paper from './extend/paper.js'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { watch, defineProps } from "vue"
const props = defineProps({
  modelValue: String
});
const emits = defineEmits(['update:modelValue', 'update:anchors']);
const editor = useEditor({
  content: JSON.parse(props.modelValue || ""),
  editorProps: {
    attributes: {
      class: 'prose w-full max-w-full focus:outline-none',
    },
  },
  extensions: [
    Document.extend({
      content: 'paper',
    }),
    Text,
    Paper
  ],
  onUpdate: ({ editor }) => {
    const content = editor.getJSON();
    emits('update:modelValue', JSON.stringify(content));
  }
})
watch(() => props.modelValue, (value) => {
  let ed = editor.value;
  // HTML
  // const isSame = ed && ed.getHTML() === value;
  // JSON
  const isSame = JSON.stringify(ed && ed.getJSON()) === value
  if (isSame) {
    return;
  };
  ed && ed.commands.setContent(JSON.parse(value || ""), true);
})
</script>
<style lang="scss"></style>
