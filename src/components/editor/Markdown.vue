<script setup lang="ts">
import Document from '@tiptap/extension-document'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
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
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { TableOfContents } from '@tiptap-pro/extension-table-of-contents'

import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import { createLowlight } from 'lowlight'

// import FloatingMenu from '@tiptap/extension-floating-menu'
import { watch, defineProps, defineComponent, onBeforeUnmount } from "vue"
import Anchor from '@/types/anchor'
import TableOfContent from '../navigation/TableOfContent.vue'
// import FMenu from '../toolbar/FMenu.vue'
import BubbleMenu from '../toolbar/BubbleMenu.vue'

import Commands from './extend/commands'
import suggestion from './extend/suggestion'
import { debounce } from '@/common/utils.ts'

import aiWrite from './extend/aiWrite'
// const CustomDocument = Document.extend({
//   content: 'heading block*',
// })
const lowlight = createLowlight()
lowlight.register({ html, css, js, ts });
// console.log(lowlight.listLanguages());
defineComponent({
  TableOfContent,
  // FMenu,
  BubbleMenu
})
const props = defineProps({
  modelValue: String,
  editable: {
    type: Boolean,
    default: true
  },
  anchors: Array<Anchor>
});
const emits = defineEmits(['update:modelValue', 'update:anchors']);
const updateContent = debounce((editor) => {
  emits('update:modelValue', editor.getHTML());
}, 300);
const editor = useEditor({
  autofocus: true,
  editable: props.editable,
  content: props.modelValue,
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert w-full max-w-full focus:outline-none',
    },
  },
  extensions: [
    Document,
    StarterKit.configure({
      document: false
    }),
    Highlight,
    Typography,
    // FloatingMenu.configure({
    //   shouldShow: ({ editor, view, state, oldState }) => {
    //     // show the floating within any paragraph
    //     return editor.isActive('paragraph')
    //   },
    // }),
    TextAlign,
    Underline,
    Link.configure({
      openOnClick: false,
      defaultProtocol: 'https',
    }),
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
    CodeBlockLowlight.configure({
      lowlight,
    }),
    TableOfContents.configure({
      onUpdate: (content) => {
        emits('update:anchors', content);
      }
    }),
    Placeholder.configure({
      emptyEditorClass: 'is-editor-empty',
      // showOnlyWhenEditable: false,
      // showOnlyCurrent: false,
      // includeChildren: true,
      placeholder: () => { //{ node }
        // if (node.type.name === 'heading') {
        //   return 'What’s the title?'
        // }
        return 'Type / to browse options'
      }
    }),
    Image.configure({
      inline: true,
      allowBase64: true
    }),
    FileHandler.configure({
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
      onDrop: (currentEditor, files, pos) => {
        files.forEach(file => {
          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            currentEditor.chain().insertContentAt(pos, {
              type: 'image',
              attrs: {
                src: fileReader.result,
              },
            }).focus().run()
          }
        })
      },
      onPaste: (currentEditor, files, htmlContent) => {
        files.forEach(file => {
          if (htmlContent) {
            // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
            // you could extract the pasted file from this url string and upload it to a server for example
            console.log(htmlContent) // eslint-disable-line no-console
            return false
          }

          const fileReader = new FileReader()
          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
              type: 'image',
              attrs: {
                src: fileReader.result,
              },
            }).focus().run()
          }
        })
      }
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
    aiWrite
  ],

  onUpdate: ({ editor }) => {
    updateContent(editor)
  }
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
  // autofocus
  if (value) {
    editor.value && editor.value.commands.focus();
  }
})
onBeforeUnmount(() => {
  editor.value && editor.value.destroy()
})
</script>

<template>
  <div id="editorWrapper" class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 py-10 xl:mr-80">
    <!-- <FMenu :editor="editor"></FMenu> -->
    <BubbleMenu :editor="editor"></BubbleMenu>
    <editor-content class="h-full" :editor="editor" />
  </div>
  <div id="tableOfContent"
    class="fixed z-20 top-[3.8125rem] bottom-0 right-0 py-10 overflow-y-auto hidden xl:text-sm xl:block flex-none w-80 px-8">
    <TableOfContent :editor=editor :anchors="anchors" />
  </div>
</template>
<style lang="scss">
.tiptap p.is-empty::before {
  color: #94a3b8;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}
</style>