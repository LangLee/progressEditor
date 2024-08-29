import { mergeAttributes, Node } from '@tiptap/core'
import { VueNodeViewRenderer } from '@tiptap/vue-3'

import AiWriteView from './AiWriteView.vue'

export default Node.create({
    name: 'aiWrite',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            // 提词器
            prompt: {
                default: ''
            },
            // 问题
            question: {
                default: ''
            }
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