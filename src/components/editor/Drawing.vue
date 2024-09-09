<template>
  <div id="editorWrapper" class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 py-10">
    <EditorContent class="h-full" :editor="editor" />
    <div v-if="editable" class="fixed top-28 right-4 z-40">
      <FloatMenu :editor="editor" @save="emits('save')"></FloatMenu>
    </div>
  </div>
</template>
<script setup lang="ts">
import Document from '@tiptap/extension-document'
import Text from '@tiptap/extension-text'
import Paper from './extend/paper.js'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { watch, defineProps } from "vue"
import { debounce } from '@/common/utils'
import FloatMenu from '../toolbar/FloatMenu.vue'
const props = defineProps({
  modelValue: String,
  editable: {
    type: Boolean,
    default: true
  }
});
const emits = defineEmits(['update:modelValue', 'save']);
const updateContent = debounce((editor) => {
  const content = editor.getJSON();
  emits('update:modelValue', JSON.stringify(content));
}, 300)
const editor = useEditor({
  editable: props.editable,
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
    updateContent(editor)
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
watch(() => props.editable, (value, oldValue) => {
  if (value === oldValue) {
    return;
  }
  editor.value && editor.value.setEditable(value)
})
</script>
<style lang="scss"></style>
