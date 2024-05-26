<script setup lang="ts">
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { TableOfContents } from '@tiptap-pro/extension-table-of-contents'
import { ref, watch, defineProps, defineComponent } from "vue"
import Anchor from '@/types/anchor'
import TableOfContent from './TableOfContent.vue'
import FMenu from './FMenu.vue'
import BMenu from './BMenu.vue'

defineComponent({
  TableOfContent,
  FMenu,
  BMenu
})
const props = defineProps({
  modelValue: String
});
const emits = defineEmits(['update:modelValue']);
const anchors = ref([]);
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
    Typography,
    TableOfContents.configure({
      onUpdate: (content: Array<Anchor>) => {
        anchors.value = content
      }
    }),
    Placeholder.configure({
          placeholder: '写点啥...',
    })
  ],
  onUpdate: ({ editor }) => {
    emits('update:modelValue', editor.getHTML());
  }
})
watch(() => props.modelValue, (value) => {
  const isSame = editor.value.getHTML() === value;
  // JSON
  // const isSame = JSON.stringify(editor.getJSON()) === JSON.stringify(value)
  if (isSame) {
    return;
  };
  editor.value.commands.setContent(value, false);
})
</script>

<template>
  <div id="editorWrapper" class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 pt-10 pb-24 lg:pb-16 xl: mr-64 xl:pr-16">
    <FMenu :editor="editor"></FMenu>
    <BMenu :editor="editor"></BMenu>
    <editor-content class="h-full" :editor="editor" />
  </div>
  <div id="tableOfContent" class="fixed z-20 top-[3.8125rem] bottom-0 right-[max(0px,calc(50%-45rem))] py-10 overflow-y-auto hidden xl:text-sm xl:block flex-none w-64 pl-8">
    <TableOfContent :editor=editor :anchors="anchors" />
  </div>
</template>
<style scoped lang="scss">
.me-editor .tiptap {
  width: 100%;
  min-height: 8rem;
}
.tiptap p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  float: left;
  color: #adb5bd;
  pointer-events: none;
  height: 0;
}
</style>
