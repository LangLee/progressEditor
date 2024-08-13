import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import AiWriteView from './AiWriteView.vue'

export default Node.create({
    name: 'aiWrite',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            // count: {
            //     default: 0,
            // },
        }
    },

    parseHTML() {
        return [
            {
                tag: 'div[data-type="aiWrite"]',
            },
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes(HTMLAttributes, { 'data-type': 'aiWrite' })]
    },

    addNodeView() {
        return VueNodeViewRenderer(AiWriteView)
    },

    addCommands() {
        return {
            setAiWrite:
                options => ({ commands }) => {
                    return commands.insertContent({
                        type: this.name,
                        attrs: options,
                    })
                }
        }
    },
})