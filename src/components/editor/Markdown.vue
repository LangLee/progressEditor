<template>
  <div
    id="editorWrapper"
    class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 py-10 xl:mr-80"
    :class="{ 'mb-16': isMobile() && editable }"
  >
    <BubbleMenu v-if="!isMobile()" :editor="editor"></BubbleMenu>
    <BubbleTableMenu :editor="editor"></BubbleTableMenu>
    <BubbleTableCellMenu :editor="editor"></BubbleTableCellMenu>
    <editor-content class="h-full" :editor="editor" />
  </div>
  <div
    id="tableOfContent"
    class="fixed z-20 top-16 bottom-0 right-[max(0rem,calc(50%-48rem))] py-10 overflow-y-auto hidden xl:text-sm xl:block flex-none w-80 px-8"
  >
    <TableOfContent :editor="editor" :anchors="anchors" />
  </div>
  <div v-if="editable">
    <div
      v-if="!isMobile()"
      class="fixed top-28 right-[max(1rem,calc(50%-48rem))] z-40"
    >
      <FloatMenu :editor="editor"></FloatMenu>
    </div>
    <div v-else class="fixed bottom-0 left-0 z-40">
      <FixedMenu :editor="editor"></FixedMenu>
    </div>
  </div>
</template>
<script setup lang="ts">
// import FloatingMenu from '@tiptap/extension-floating-menu'
import { watch, defineProps, onBeforeUnmount } from 'vue'
import Anchor from '@/types/anchor'
import TableOfContent from '../navigation/TableOfContent.vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { TableOfContents } from '@tiptap-pro/extension-table-of-contents'
import FileHandler from '@tiptap-pro/extension-file-handler'

import { debounce, isMobile } from '@/common/utils.ts'
import editorExtends from './editorExtends'

import FixedMenu from '../toolbar/FixedMenu.vue'
import BubbleMenu from '../toolbar/BubbleMenu.vue'
import BubbleTableMenu from '../toolbar/BubbleTableMenu.vue'
import BubbleTableCellMenu from '../toolbar/BubbleTableCellMenu.vue'
import FloatMenu from '../toolbar/FloatMenu.vue'

import { change } from '@/common/status'
import { Operation } from './extend/operation'
import { upload } from '@/api/file'
import { baseUrl } from '@/api/globalConfig'
import './styles/index.css'
// const CustomDocument = Document.extend({
//   content: 'heading block*',
// })
const props = defineProps({
  modelValue: String,
  editable: {
    type: Boolean,
    default: true,
  },
  anchors: Array<Anchor>,
})
const emits = defineEmits([
  'update:modelValue',
  'update:anchors',
  'save',
  'import',
  'export',
  'share',
])
const updateContent = debounce((editor) => {
  emits('update:modelValue', editor.getHTML())
  change(true)
}, 300)
const editor = useEditor({
  editable: props.editable,
  content: props.modelValue,
  editorProps: {
    scrollThreshold: 80,
    scrollMargin: 80,
    attributes: {
      class: 'prose dark:prose-invert w-full max-w-full focus:outline-none',
    },
  },
  extensions: [
    ...editorExtends,
    TableOfContents.configure({
      onUpdate: (content) => {
        emits('update:anchors', content)
      },
    }),
    FileHandler.configure({
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
      onDrop: (currentEditor, files, pos) => {
        files.forEach((file) => {
          upload(file).then((file) => {
            const src = `${baseUrl}/file/preview?file=${file}`
            currentEditor
              .chain()
              .insertContentAt(pos, {
                type: 'image',
                attrs: { src },
              })
              .focus()
              .run()
          })
        })
      },
      onPaste: (currentEditor, files, htmlContent) => {
        files.forEach((file) => {
          if (htmlContent) {
            // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
            // you could extract the pasted file from this url string and upload it to a server for example
            console.log(htmlContent) // eslint-disable-line no-console
            return false
          }
          upload(file).then((file) => {
            const src = `${baseUrl}/file/preview?file=${file}`
            currentEditor
              .chain()
              .insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: { src },
              })
              .focus()
              .run()
          })
        })
      },
    }),
    Operation.configure({
      onSave: () => {
        emits('save')
      },
      onExport: (type, editor) => {
        emits('export', type, editor)
      },
      onShare: () => {
        emits('share')
      },
    }),
  ],

  onUpdate: ({ editor }) => {
    updateContent(editor)
  },
})

watch(
  () => props.modelValue,
  (value, oldValue) => {
    if (value === oldValue) return
    const isSame = editor.value && editor.value.getHTML() === value
    // JSON
    // const isSame = JSON.stringify(editor.getJSON()) === JSON.stringify(value)
    if (isSame) {
      return
    }
    editor.value && editor.value.commands.setContent(value || '', true)
  }
)
watch(
  () => props.editable,
  (value, oldValue) => {
    if (value === oldValue) {
      return
    }
    editor.value && editor.value.setEditable(value, false)
    // autofocus
    if (value) {
      editor.value && editor.value.commands.focus()
    }
  }
)
onBeforeUnmount(() => {
  editor.value && editor.value.destroy()
})
</script>
<style lang="scss"></style>

