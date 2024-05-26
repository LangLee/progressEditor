<template>
  <FloatingMenu v-if="editor" :editor="editor" class="flex flex-col flex-wrap shadow-lg p-2 bg-white">
    <div class="flex flex-row flex-wrap">
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleBold().run()"
        :disabled="!editor.can().chain().focus().toggleBold().run()" :class="{'bg-gray-200': editor.isActive('bold')}">
        bold
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleItalic().run()"
        :disabled="!editor.can().chain().focus().toggleItalic().run()">
        italic
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleStrike().run()"
        :disabled="!editor.can().chain().focus().toggleStrike().run()">
        strike
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().setParagraph().run()">
        paragraph
      </div>
    </div>
    <div class="flex flex-row flex-wrap">
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()">
        h1
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()">
        h2
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()">
        h3
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 4 }).run()">
        h4
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 5 }).run()">
        h5
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleHeading({ level: 6 }).run()">
        h6
      </div>
    </div>
    <div class="flex flex-row flex-wrap">
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleBulletList().run()">
        bulletList
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleOrderedList().run()">
        orderedList
      </div>
    </div>
    <div class="flex flex-row flex-wrap">
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleCode().run()"
        :disabled="!editor.can().chain().focus().toggleCode().run()">
        code
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleCodeBlock().run()">
        codeBlock
      </div>
    </div>
    <div class="flex flex-row flex-wrap">
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().toggleBlockquote().run()">
        blockQuote
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().setHorizontalRule().run()">
        horizontal
      </div>
      <div class="m-1 px-1 rounded-sm shadow bg-gray-50 hover:bg-gray-200 cursor-pointer" @click="editor.chain().focus().setHardBreak().run()">
        hardBreak
      </div>
    </div>
  </FloatingMenu>
</template>
<script setup>
import { ref, reactive, defineProps, defineComponent } from 'vue'
import IconSvg from './IconSvg.vue'
import { FloatingMenu } from '@tiptap/vue-3';
defineComponent({
  FloatingMenu,
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