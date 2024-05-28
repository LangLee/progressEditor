<template>
  <FloatingMenu v-if="editor" :editor="editor" class="flex flex-col flex-wrap shadow-lg p-2 bg-white">
    <div class="flex flex-row flex-wrap">
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleBold().run()" :disabled="!editor.can().chain().focus().toggleBold().run()"
        :class="{ 'bg-gray-300': editor.isActive('bold'), 'bg-gray-50': !editor.isActive('bold') }">
        <RemixIcon name="bold" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()"
        :class="{ 'bg-gray-300': editor.isActive('italic'), 'bg-gray-50': !editor.isActive('italic') }">
        <RemixIcon name="italic" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()"
        :class="{ 'bg-gray-300': editor.isActive('strike'), 'bg-gray-50': !editor.isActive('strike') }">
        <RemixIcon name="strikethrough" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().setParagraph().run()"
        :class="{ 'bg-gray-300': editor.isActive('paragraph'), 'bg-gray-50': !editor.isActive('paragraph') }">
        <RemixIcon name="paragraph" />
      </div>
    </div>
    <div class="flex flex-row flex-wrap">
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'bg-gray-300': editor.isActive('heading', { level: 1 }), 'bg-gray-50': !editor.isActive('heading', { level: 1 }) }">
        <RemixIcon name="h-1" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'bg-gray-300': editor.isActive('heading', { level: 2 }), 'bg-gray-50': !editor.isActive('heading', { level: 2 }) }">
        <RemixIcon name="h-2" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'bg-gray-300': editor.isActive('heading', { level: 3 }), 'bg-gray-50': !editor.isActive('heading', { level: 3 }) }">
        <RemixIcon name="h-3" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        :class="{ 'bg-gray-300': editor.isActive('heading', { level: 4 }), 'bg-gray-50': !editor.isActive('heading', { level: 4 }) }">
        <RemixIcon name="h-4" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        :class="{ 'bg-gray-300': editor.isActive('heading', { level: 5}), 'bg-gray-50': !editor.isActive('heading', { level: 5 }) }">
        <RemixIcon name="h-5" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        :class="{ 'bg-gray-300': editor.isActive('heading', { level: 6 }), 'bg-gray-50': !editor.isActive('heading', { level: 6 }) }">
        <RemixIcon name="h-6" />
      </div>
    </div>
    <div class="flex flex-row flex-wrap">
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleBulletList().run()"
        :class="{ 'bg-gray-300': editor.isActive('bulletList'), 'bg-gray-50': !editor.isActive('bulletList') }">
        <RemixIcon name="list-unordered" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleOrderedList().run()"
        :class="{ 'bg-gray-300': editor.isActive('orderedList'), 'bg-gray-50': !editor.isActive('orderedList') }">
        <RemixIcon name="list-ordered" />
      </div>
    </div>
    <div class="flex flex-row flex-wrap">
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleCode().run()" :disabled="!editor.can().chain().focus().toggleCode().run()"
        :class="{ 'bg-gray-300': editor.isActive('code'), 'bg-gray-50': !editor.isActive('code') }">
        <RemixIcon name="code-view" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleCodeBlock().run()"
        :class="{ 'bg-gray-300': editor.isActive('codeBlock'), 'bg-gray-50': !editor.isActive('codeBlock') }">
        <RemixIcon name="code-block" />
      </div>
    </div>
    <div class="flex flex-row flex-wrap">
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().toggleBlockquote().run()">
        <RemixIcon name="quote-text" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().setHorizontalRule().run()">
        <RemixIcon name="separator" />
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-300 cursor-pointer"
        @click="editor.chain().focus().setHardBreak().run()">
        <RemixIcon name="text-wrap" />
      </div>
    </div>
  </FloatingMenu>
</template>
<script setup>
import { ref, reactive, defineProps, defineComponent } from 'vue'
import RemixIcon from './RemixIcon.vue'
import { FloatingMenu } from '@tiptap/vue-3';
defineComponent({
  FloatingMenu,
  RemixIcon
})
defineProps({
  editor: {
    type: Object,
    default: null
  }
})
</script>


<style lang='scss' scoped></style>