import { mergeAttributes, Node, VueNodeViewRenderer } from '@tiptap/vue-3'

import PaperView from './PaperView.vue'

export default Node.create({
  name: 'paper',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      lines: {
        default: [],
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="paper"]',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'paper' })]
  },

  addNodeView() {
    return VueNodeViewRenderer(PaperView)
  },
})