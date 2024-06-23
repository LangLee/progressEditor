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
import Text from '@tiptap/extension-text'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
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

const CustomDocument = Document.extend({
  content: 'heading block*',
})
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
const editor = useEditor({
  editable: props.editable,
  content: props.modelValue,
  editorProps: {
    attributes: {
      class: 'prose w-full max-w-full focus:outline-none',
    },
  },
  extensions: [
    CustomDocument,
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
    Text,
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
      placeholder: ({ node }) => {
        if (node.type.name === 'heading') {
          return 'What’s the title?'
        }

        return 'Can you add some further context?'
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
    TableCell
  ],
  onUpdate: ({ editor }) => {
    emits('update:modelValue', editor.getHTML());
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
.prose :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *))::before {
  content: '';
}

.prose :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *))::after {
  content: '';
}

.prose :where(code):not(:where([class~="not-prose"], [class~="not-prose"] *)) {
  font-weight: normal;
}

.tiptap {
  :first-child {
    margin-top: 0;
  }
  /* Placeholder (on every new line) */
  .is-empty::before {
    color: rgb(203 213 225);
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    padding: 0.25em;
    border-radius: 0.25em;
    background-color: rgba(#616161, 0.1);
    color: #616161;
    box-decoration-break: clone;
  }

  pre {
    background: #0D0D0D;
    color: #FFF;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }

    .hljs-comment,
    .hljs-quote {
      color: #616161;
    }

    .hljs-variable,
    .hljs-template-variable,
    .hljs-attribute,
    .hljs-tag,
    .hljs-name,
    .hljs-regexp,
    .hljs-link,
    .hljs-name,
    .hljs-selector-id,
    .hljs-selector-class {
      color: #F98181;
    }

    .hljs-number,
    .hljs-meta,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-literal,
    .hljs-type,
    .hljs-params {
      color: #FBBC88;
    }

    .hljs-string,
    .hljs-symbol,
    .hljs-bullet {
      color: #B9F18D;
    }

    .hljs-title,
    .hljs-section {
      color: #FAF594;
    }

    .hljs-keyword,
    .hljs-selector-tag {
      color: #70CFF8;
    }

    .hljs-emphasis {
      font-style: italic;
    }

    .hljs-strong {
      font-weight: 700;
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  hr {
    margin: 1rem 0;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0D0D0D, 0.1);
  }

  table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    margin: 0;
    overflow: hidden;

    td,
    th {
      min-width: 1em;
      border: 2px solid #ced4da;
      padding: 3px 5px;
      vertical-align: top;
      box-sizing: border-box;
      position: relative;

      >* {
        margin-bottom: 0;
      }
    }

    th {
      font-weight: bold;
      text-align: left;
      background-color: #f1f3f5;
    }

    .selectedCell:after {
      z-index: 2;
      position: absolute;
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background: rgba(200, 200, 255, 0.4);
      pointer-events: none;
    }

    .column-resize-handle {
      position: absolute;
      right: -2px;
      top: 0;
      bottom: -2px;
      width: 4px;
      background-color: #adf;
      pointer-events: none;
    }

    p {
      margin: 0;
    }
  }

  .tableWrapper {
    padding: 1rem 0;
    overflow-x: auto;
  }

  .resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  // task css 
  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    p {
      margin: 0;
    }

    li {
      display: flex;

      >label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      >div {
        flex: 1 1 auto;
      }

      ul li,
      ol li {
        display: list-item;
      }

      ul[data-type="taskList"]>li {
        display: flex;
      }
    }
  }
}
</style>