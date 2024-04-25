<template>
    <editor-content class="md-editor" :editor="editor"/>
</template>
<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { ref, reactive } from 'vue'
const editor = useEditor({
    extensions: [
        StarterKit,
    ],
    content: '<h1>Hello World!</h1>',
})

onBeforeUnmount(() => {
  editor.destroy()
})

</script>


<style lang='scss' scoped>

</style>