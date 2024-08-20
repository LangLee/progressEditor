import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'

import CommandsList from './CommandsList.vue'

export default {
  items: ({ query }) => {
    return [
      {
        title: 'Ai Write',
        key: 'aiWrite',
        icon: 'ai-generate',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setAiWrite()
            .run()
        },
      },
      {
        title: 'Heading 1',
        key: 'H1',
        icon: 'h-1',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleHeading({ level: 1 })
            .run()
        },
      },
      {
        title: 'Heading 2',
        key: 'H2',
        icon: 'h-2',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleHeading({ level: 2 })
            .run()
        },
      },
      {
        title: 'Heading 3',
        key: 'H3',
        icon: 'h-3',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleHeading({ level: 3 })
            .run()
        },
      },
      {
        title: 'Bold',
        key: 'bold',
        icon: 'bold',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleBold()
            .run()
        },
      },
      {
        title: 'Italic',
        key: 'italic',
        icon: 'italic',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleItalic()
            .run()
        },
      },{
        title: 'Underline',
        key: 'underline',
        icon: 'underline',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleUnderline()
            .run()
        },
      },{
        title: 'Strikethrough',
        key: 'strike',
        icon: 'strikethrough',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleStrike()
            .run()
        },
      },
      {
        title: 'Heading 4',
        key: 'H4',
        icon: 'h-4',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleHeading({ level: 4 })
            .run()
        },
      },
      {
        title: 'Heading 5',
        key: 'H5',
        icon: 'h-5',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleHeading({ level: 5 })
            .run()
        },
      },
      {
        title: 'Heading 6',
        key: 'H6',
        icon: 'h-6',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleHeading({ level: 6 })
            .run()
        },
      },
      {
        title: 'Paragraph',
        key: 'paragraph',
        icon: 'paragraph',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleParagraph()
            .run()
        },
      },
      {
        title: 'Highlight',
        key: 'highlight',
        icon: 'highlight',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleHighlight()
            .run()
        },
      },
      {
        title: 'Bullet List',
        key: 'bulletList',
        icon: 'list-unordered',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleBulletList()
            .run()
        },
      },
      {
        title: 'Ordered List',
        key: 'orderedList',
        icon: 'list-ordered-2',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleOrderedList()
            .run()
        },
      },
      {
        title: 'Code Line',
        key: 'code',
        icon: 'code-view',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleCode()
            .run()
        },
      },
      {
        title: 'Code Block',
        key: 'codeBlock',
        icon: 'code-block',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleCodeBlock()
            .run()
        },
      },
      {
        title: 'Blockquote',
        key: 'blockquote',
        icon: 'quote-text',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleBlockquote()
            .run()
        },
      },
      {
        title: 'Horizontal',
        key: 'horizontal',
        icon: 'separator',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setHorizontalRule()
            .run()
        },
      },
      {
        title: 'Hard Break',
        key: 'hardBreak',
        icon: 'text-wrap',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .setHardBreak()
            .run()
        },
      },
      {
        title: 'Task List',
        key: 'task',
        icon: 'list-check-3',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleTaskList()
            .run()
        },
      },
      {
        title: 'Table',
        key: 'insertTable',
        icon: 'table-2',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertTable({ rows: 3, cols: 3, withHeaderRow: false })
            .run()
        },
      },
      {
        title: 'Column Before',
        key: 'addTableColumnBefore',
        icon: 'insert-column-left',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .addColumnBefore()
            .run()
        },
      },
      {
        title: 'Column After',
        key: 'addTableColumnAfter',
        icon: 'insert-column-right',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .addColumnAfter()
            .run()
        },
      },
      {
        title: 'Delete Column',
        key: 'deleteTableColumn',
        icon: 'delete-column',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .deleteColumn()
            .run()
        },
      },
      {
        title: 'Row Before',
        key: 'addTableRowBefore',
        icon: 'insert-row-top',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .addRowBefore()
            .run()
        },
      },
      {
        title: 'Row After',
        key: 'addTableRowAfter',
        icon: 'insert-row-bottom',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .addRowAfter()
            .run()
        },
      },
      {
        title: 'Delete Row',
        key: 'deleteTableRow',
        icon: 'delete-row',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .deleteRow()
            .run()
        },
      },
      {
        title: 'Delete Table',
        key: 'deleteTable',
        icon: 'delete-bin-4-line',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .deleteTable()
            .run()
        },
      },
      {
        title: 'Delete Node',
        key: 'deleteNode',
        icon: 'delete-bin-2-line',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .deleteNode()
            .run()
        },
      },
      {
        title: 'Clear Marks',
        key: 'clearMarks',
        icon: 'eraser-line',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .unsetAllMarks()
            .run()
        },
      }
    ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.key.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
  },

  render: () => {
    let component
    let popup

    return {
      onStart: props => {
        component = new VueRenderer(CommandsList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component?.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}