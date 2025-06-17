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
import Image from '@tiptap/extension-image'
// import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Link from '@tiptap/extension-link'
import { Superscript } from '@tiptap/extension-superscript'
import SubScript from '@tiptap/extension-subscript'
import GlobalDragHandle from 'tiptap-extension-global-drag-handle'
import { Export } from '@tiptap-pro/extension-export'

import aiWrite from './extend/aiWrite'
import CustomCodeBlock from './extend/codeBlock'
import CodeBlockView from './extend/CodeBlockView.vue'
import Commands from './extend/commands'
import suggestion from './extend/suggestion'
import Selection from './extend/selection'
import TrailingNode from './extend/trailingNode'
import { common, createLowlight } from 'lowlight'

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

const editorExtends = [
  Document,
  StarterKit.configure({
    dropcursor: {
      width: 1,
      color: '#2b7fff',
    },
    codeBlock: false,
    code: {
      HTMLAttributes: {
        spellcheck: false,
      },
    },
  }),
  Placeholder.configure({
    emptyEditorClass: 'is-editor-empty',
    includeChildren: true,
    showOnlyWhenEditable: true,
    placeholder: ({ node }) => {
      if (node.type.name === 'heading') {
        return `输入标题 ${node.attrs.level}`
      } else if (node.type.name === 'paragraph') {
        return '输入正文， 键入 "/" 查看命令'
      }
    },
  }),
  Highlight,
  Typography,
  Selection,
  TrailingNode,
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
  //   CodeBlockLowlight.configure({
  //     lowlight,
  //   }),
  CustomCodeBlock.configure({
    view: CodeBlockView,
    lowlight,
    HTMLAttributes: {
      spellcheck: false,
    },
  }),
  GlobalDragHandle,
  Image.configure({
    inline: true,
    allowBase64: true,
  }),
  Commands.configure({
    suggestion,
  }),
  Table.configure({
    resizable: true,
    lastColumnResizable: false,
    allowTableNodeSelection: true,
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
]
export default editorExtends
