<template>
  <div id="editorWrapper" class="min-w-0 flex-auto px-4 sm:px-6 xl:px-8 py-10">
    <editor-content class="h-full" :editor="editor" />
  </div>
</template>
<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Text from '@tiptap/extension-text'
import { defineProps, defineEmits, watch, onBeforeUnmount } from 'vue'
import { debounce } from '@/common/utils'
const CustomDocument = Document.extend({
  content: 'taskList',
})

const CustomTaskItem = TaskItem.extend({
  content: 'inline*',
})
const props = defineProps({
  modelValue: String,
  editable: {
    type: Boolean,
    default: true
  }
});
const emits = defineEmits(['update:modelValue']);
const updateContent = debounce((editor) => {
  emits('update:modelValue', editor.getHTML());
}, 300);
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
    Paragraph,
    Text,
    TaskList,
    CustomTaskItem
  ],
  onUpdate: ({ editor }) => {
    updateContent(editor)
  },
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

<style lang='scss'>
/* Basic editor styles */
.tiptap {
  :first-child {
    margin-top: 0;
  }

  /* List styles */
  ul,
  ol {
    padding: 0 1rem;
    margin: 1.25rem 1rem 1.25rem 0.4rem;

    li p {
      margin-top: 0.25em;
      margin-bottom: 0.25em;
    }
  }

  /* Task list specific styles */
  ul[data-type="taskList"] {
    list-style: none;
    margin-left: 0;
    padding: 0;

    li {
      align-items: center;
      display: flex;

      >label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
        user-select: none;
      }

      >div {
        flex: 1 1 auto;
      }
    }

    input[type="checkbox"] {
      cursor: pointer;
    }
  }
}
</style>