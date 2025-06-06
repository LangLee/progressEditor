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
      @click="editor.chain().focus().mergeCells().run()"
    >
      <RemixIcon name="merge-cells-horizontal" />
    </div>
    <div
      class="mx-1 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().splitCell().run()"
    >
      <RemixIcon name="split-cells-horizontal" />
    </div>
    <div
      class="mx-1 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().deleteColumn().run()"
    >
      <RemixIcon name="delete-column" />
    </div>
    <div
      class="mx-1 px-2 py-1 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-500 cursor-pointer"
      @click="editor.chain().focus().deleteRow().run()"
    >
      <RemixIcon name="delete-row" />
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
import { CellSelection } from '@tiptap/pm/tables'
import { isCellSelection } from '../editor/extend/utils'
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
const shouldShow = ({ state }) => {
  return isCellSelection(state.selection)
}
</script>

<style lang="scss" scoped></style>

