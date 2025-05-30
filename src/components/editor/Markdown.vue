<template>
  <div
    id="editorWrapper"
    class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 py-10 xl:mr-80"
    :class="{ 'mb-16': isMobile() && editable }"
  >
    <BubbleMenu v-if="!isMobile()" :editor="editor"></BubbleMenu>
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
import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
// import Dropcursor from '@tiptap/extension-dropcursor'
import FileHandler from '@tiptap-pro/extension-file-handler'
import Image from '@tiptap/extension-image'
// import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Link from '@tiptap/extension-link'
import { Superscript } from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { TableOfContents } from '@tiptap-pro/extension-table-of-contents'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { common, createLowlight } from 'lowlight'

// import FloatingMenu from '@tiptap/extension-floating-menu'
import { watch, defineProps, onBeforeUnmount } from 'vue'
import Anchor from '@/types/anchor'
import TableOfContent from '../navigation/TableOfContent.vue'
import FixedMenu from '../toolbar/FixedMenu.vue'
import BubbleMenu from '../toolbar/BubbleMenu.vue'
import FloatMenu from '../toolbar/FloatMenu.vue'

import Commands from './extend/commands'
import suggestion from './extend/suggestion'
import { debounce, isMobile } from '@/common/utils.ts'

import aiWrite from './extend/aiWrite'
import { CustomCodeBlock } from './extend/codeBlock'
import CodeBlockView from './extend/CodeBlockView.vue'
import { change } from '@/common/status'
import { Export } from '@tiptap-pro/extension-export'
import { Operation } from './extend/operation'
import { upload } from '@/api/file'
import { baseUrl } from '@/api/globalConfig'
// const CustomDocument = Document.extend({
//   content: 'heading block*',
// })
const lowlight = createLowlight(common)
// lowlight.register("mermaid", plaintext);
// lowlight.register("powershell", powershell);
// lowlight.register("abap", abap);
// lowlight.register("erlang", erlang);
// lowlight.register("elixir", elixir);
// lowlight.register("dockerfile", dockerfile);
// lowlight.register("clojure", clojure);
// lowlight.register("fortran", fortran);
// lowlight.register("haskell", haskell);
// lowlight.register("scala", scala);
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
  immediatelyRender: true,
  shouldRerenderOnTransaction: true,
  editorProps: {
    scrollThreshold: 80,
    scrollMargin: 80,
    attributes: {
      class: 'prose dark:prose-invert w-full max-w-full focus:outline-none',
    },
  },
  extensions: [
    Document,
    StarterKit.configure({
      document: false,
    }),
    Highlight,
    Typography,
    // FloatingMenu.configure({
    //   shouldShow: ({ editor, view, state, oldState }) => {
    //     // show the floating within any paragraph
    //     return editor.isActive('paragraph')
    //   },
    // }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Underline,
    Superscript,
    SubScript,
    Link.configure({
      openOnClick: false,
      defaultProtocol: 'https',
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    // CodeBlockLowlight.configure({
    //   lowlight,
    // }),

    CustomCodeBlock.configure({
      view: CodeBlockView,
      lowlight,
      HTMLAttributes: {
        spellcheck: false,
      },
    }),
    GlobalDragHandle,
    TableOfContents.configure({
      onUpdate: (content) => {
        emits('update:anchors', content)
      },
    }),
    Placeholder.configure({
      emptyEditorClass: 'is-editor-empty',
      // showOnlyWhenEditable: false,
      // showOnlyCurrent: false,
      // includeChildren: true,
      placeholder: () => {
        //{ node }
        // if (node.type.name === 'heading') {
        //   return 'What’s the title?'
        // }
        // return 'Type / to browse options'
        return '输入 / 查看操作'
      },
    }),
    Image.configure({
      inline: true,
      allowBase64: true,
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
          //   const fileReader = new FileReader()
          //   fileReader.readAsDataURL(file)
          //   fileReader.onload = () => {
          //     currentEditor.chain().insertContentAt(pos, {
          //       type: 'image',
          //       attrs: {
          //         src: fileReader.result,
          //       },
          //     }).focus().run()
          //   }
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
          // const fileReader = new FileReader()
          // fileReader.readAsDataURL(file)
          // fileReader.onload = () => {
          //   currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
          //     type: 'image',
          //     attrs: {
          //       src: fileReader.result,
          //     },
          //   }).focus().run()
          // }
        })
      },
    }),
    Commands.configure({
      suggestion,
    }),
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    aiWrite,
    Export.configure({
      // The Convert App-ID from the convert settings page: https://cloud.tiptap.dev/convert-settings
      appId: 'jkv2yemx',

      // The JWT token you generated in the previous step
      token:
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MjU4NjI4MTgsIm5iZiI6MTcyNTg2MjgxOCwiZXhwIjoxNzI1OTQ5MjE4LCJpc3MiOiJodHRwczovL2Nsb3VkLnRpcHRhcC5kZXYiLCJhdWQiOiJqa3YyeWVteCJ9.ITcOVS7VcEUkEOuMWj6nR5lV9wcVtZe8T6l3BsqCuYA',
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
<style lang="scss">
.tiptap p.is-empty::before {
  color: #94a3b8;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.drag-handle {
  position: fixed;
  opacity: 1;
  transition: opacity ease-in 0.2s;
  border-radius: 0.25rem;
  background-size: calc(0.5em + 0.375rem) calc(0.5em + 0.375rem);
  background-repeat: no-repeat;
  background-position: center;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' style='fill: rgba(55, 53, 47, 0.3)'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
  width: 1.2rem;
  height: 1.5rem;
  z-index: 50;
  cursor: grab;

  &:hover {
    background-color: #0d0d0d10;
    transition: background-color 0.2s;
  }

  &:active {
    background-color: #0d0d0d10;
    transition: background-color 0.2s;
    cursor: grabbing;
  }

  &.hide {
    opacity: 0;
    pointer-events: none;
  }

  @media screen and (max-width: 600px) {
    display: none;
    pointer-events: none;
  }
}

.dark .drag-handle {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 10 10' style='fill: rgba(255, 255, 255, 0.5)'%3E%3Cpath d='M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z'%3E%3C/path%3E%3C/svg%3E");
}
</style>

