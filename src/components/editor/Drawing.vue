<script setup lang="ts">
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { watch, defineProps } from "vue"
import Anchor from "@/types/anchor";
const props = defineProps({
  modelValue: String,
  anchors: Array<Anchor>
});
const emits = defineEmits(['update:modelValue', 'update:anchors']);
const editor = useEditor({
  content: props.modelValue,
  editorProps: {
    attributes: {
      class: 'prose w-full max-w-full focus:outline-none',
    },
  },
  extensions: [
    StarterKit,
    Highlight,
    Typography
  ],
  onUpdate: ({ editor }) => {
    emits('update:modelValue', editor.getHTML());
  }
})
watch(() => props.modelValue, (value) => {
  let ed = editor.value;
  const isSame = ed && ed.getHTML() === value;
  // JSON
  // const isSame = JSON.stringify(editor.getJSON()) === JSON.stringify(value)
  if (isSame) {
    return;
  };
  ed && ed.commands.setContent(value || "", true);
})
</script>

<template>
  <div id="editorWrapper" class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16 xl:mr-64 xl:pr-16">
    <editor-content class="h-full" :editor="editor" />
  </div>
</template>
<style lang="scss">
</style>
