<template>
  <BubbleMenu v-if="editor" :editor="editor" class="flex bg-gray-200 rounded-t-sm">
    <button @click="editor.chain().focus().toggleBold().run()"
      :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
      <IconSvg name="bold" />
    </button>
    <button @click="editor.chain().focus().toggleItalic().run()"
      :disabled="!editor.can().chain().focus().toggleItalic().run()"
      :class="{ 'is-active': editor.isActive('italic') }">
      <IconSvg name="italic" />
    </button>
    <button @click="editor.chain().focus().toggleStrike().run()"
      :disabled="!editor.can().chain().focus().toggleStrike().run()"
      :class="{ 'is-active': editor.isActive('strike') }">
      <IconSvg name="strike-through" />
    </button>
    <button @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
      <IconSvg name="paragraph" />
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
      <IconSvg name="h1" />
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
      <IconSvg name="h2" />
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
      <IconSvg name="h3" />
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
      <IconSvg name="h4" />
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
      <IconSvg name="h5" />
    </button>
    <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
      :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
      <IconSvg name="h6" />
    </button>
    <button @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'is-active': editor.isActive('bulletList') }">
      <IconSvg name="no-order" />
    </button>
    <button @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'is-active': editor.isActive('orderedList') }">
      <IconSvg name="order" />
    </button>
    <button @click="editor.chain().focus().toggleCode().run()"
      :disabled="!editor.can().chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
      <IconSvg name="code-inline" />
    </button>
    <button @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'is-active': editor.isActive('codeBlock') }">
      <IconSvg name="code-block" />
    </button>
    <button @click="editor.chain().focus().toggleBlockquote().run()"
      :class="{ 'is-active': editor.isActive('blockquote') }">
      <IconSvg name="block-quote" />
    </button>
    <button @click="editor.chain().focus().setHorizontalRule().run()">
      <IconSvg name="horizontal-line" />
    </button>
    <button @click="editor.chain().focus().setHardBreak().run()">
      <IconSvg name="hard-break" />
    </button>
    <button @click="editor.chain().focus().clearNodes().run()">
      <IconSvg name="clean" />
    </button>
    <!-- <button @click="editor.chain().focus().unsetAllMarks().run()">
      clear marks
    </button> -->
    <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
      <IconSvg name="undo" />
    </button>
    <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
      <IconSvg name="redo" />
    </button>
  </BubbleMenu>
</template>
<script setup>
import { ref, reactive, defineProps, defineComponent } from 'vue'
import IconSvg from './IconSvg.vue'
import { BubbleMenu } from '@tiptap/vue-3';
defineComponent({
  BubbleMenu,
  IconSvg
})
defineProps({
  editor: {
    type: Object,
    default: null
  }
})
</script>


<style lang='scss' scoped></style>