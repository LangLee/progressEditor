import { VueRenderer } from '@tiptap/vue-3'
import tippy from 'tippy.js'

import CommandsList from './CommandsList.vue'

export default {
  items: ({ query }) => {
    return [
      {
        title: '标题1',
        key: 'H1',
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
        title: '标题2',
        key: 'H2',
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
        title: '标题3',
        key: 'H3',
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
        title: '加粗',
        key: 'bold',
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
        title: '斜体',
        key: 'italic',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .toggleItalic()
            .run()
        },
      },
      {
        title: '下划线',
        key: 'strike',
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
        title: '标题4',
        key: 'H4',
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
        title: '标题5',
        key: 'H5',
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
        title: '标题6',
        key: 'H6',
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
        title: '换行',
        key: 'paragraph',
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
        title: '高亮',
        key: 'highlight',
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
        title: '无序列表',
        key: 'bulletList',
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
        title: '有序列表',
        key: 'orderedList',
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
        title: '代码行',
        key: 'code',
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
        title: '代码块',
        key: 'codeBlock',
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
        title: '引用',
        key: 'blockquote',
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
        title: '水平线',
        key: 'horizontal',
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
        title: '强制换行',
        key: 'hardBreak',
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
        title: '待办',
        key: 'task',
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
        title: '插入表格',
        key: 'insertTable',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
            .run()
        },
      },
      {
        title: '前面插入列',
        key: 'addTableColumnBefore',
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
        title: '后面插入列',
        key: 'addTableColumnAfter',
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
        title: '删除列',
        key: 'deleteTableColumn',
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
        title: '前面插入行',
        key: 'addTableRowBefore',
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
        title: '后面插入行',
        key: 'addTableRowAfter',
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
        title: '删除行',
        key: 'deleteTableRow',
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
        title: '删除表格',
        key: 'deleteTable',
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
        title: '删除节点',
        key: 'deleteNode',
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
        title: '清除属性',
        key: 'clearMarks',
        command: ({ editor, range }) => {
          editor
            .chain()
            .focus()
            .deleteRange(range)
            .unsetAllMarks()
            .run()
        },
      }
    ].filter(item => item.title.toLowerCase().includes(query.toLowerCase()) || item.key.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
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

        return component.ref?.onKeyDown(props)
      },

      onExit() {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}