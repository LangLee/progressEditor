<template>
  <BubbleMenu
    v-if="editor"
    :editor="editor"
    class="flex flex-wrap text-gray-700 dark:text-gray-100"
    :tippyOptions="{
      maxWidth: 'none',
      theme: 'light',
      arrow: false,
      appendTo: appendTo,
      offset: [0, 15],
      zIndex: 99,
    }"
    :shouldShow="shouldShow"
  >
    <div
      class="mx-1 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().addColumnBefore().run()"
    >
      <RemixIcon name="insert-column-left" />
    </div>
    <div
      class="mx-1 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().addColumnAfter().run()"
    >
      <RemixIcon name="insert-column-right" />
    </div>
    <div
      class="mx-1 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().deleteColumn().run()"
    >
      <RemixIcon name="delete-column" />
    </div>
    <div
      class="mx-1 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().addRowBefore().run()"
    >
      <RemixIcon name="insert-row-top" />
    </div>
    <div
      class="mx-1 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().addRowAfter().run()"
    >
      <RemixIcon name="insert-row-bottom" />
    </div>
    <div
      class="mx-1 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().deleteRow().run()"
    >
      <RemixIcon name="delete-row" />
    </div>
    <div
      class="mx-1 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().deleteTable().run()"
    >
      <RemixIcon name="delete-bin-4-line" />
    </div>
  </BubbleMenu>
</template>
<script setup>
import {
  ref,
  reactive,
  defineProps,
  defineComponent,
  onMounted,
  defineEmits,
} from 'vue'
import RemixIcon from '../common/RemixIcon.vue'
import { BubbleMenu } from '@tiptap/vue-3'
import { isCellSelection } from '@/components/editor/extend/utils'
defineComponent({
  BubbleMenu,
  RemixIcon,
})
const props = defineProps({
  editor: {
    type: Object,
    default: null,
  },
  appendTo: {
    type: Function,
    default: () => document.body,
  },
})
const shouldShow = ({ state, editor }) => {
  if (!state) {
    return false
  }

  return editor.isActive('table') && !isCellSelection(state.selection)
}
</script>

<style lang="scss" scoped></style>

