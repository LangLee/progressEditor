<script setup lang="ts">
import MdEditor from "@/components/editor/Markdown.vue"
import { defineComponent, ref, watch, onBeforeMount, onBeforeUnmount } from "vue"
import { useRoute } from "vue-router";
import { getBookById, updateBook } from "@/api/book";
import Book from "@/types/book"
import Anchor from "@/types/anchor";
const route = useRoute();
defineComponent({
  MdEditor
})
const content = ref('');
const anchors = ref(Array<Anchor>());
let previousContent = '';
const id = ref('')
let intervalSave: NodeJS.Timeout | number;
const autoSave = () => {
  if (content.value === previousContent) return;
  let formatAnchors: Anchor[] = [];
    if (anchors.value.length > 0) {
      formatAnchors = anchors.value.map((anchor: Anchor) => {
        return {
          id: anchor.id,
          itemIndex: anchor.itemIndex,
          level: anchor.level,
          originalLevel: anchor.originalLevel,
          pos: anchor.pos,
          textContent: anchor.textContent
        };
      });
    }
  let book: Book = {
    id: id.value,
    content: content.value,
    anchors: formatAnchors
  }
  updateBook(book).then(() => {
    previousContent = content.value
  })
}
watch(() => route.params.id, (newVal, oldValue) => {
  if (newVal && newVal !== oldValue) {
    if (typeof(newVal) === 'string') {
      id.value =  newVal || '';
    }
    getBookById(id.value).then((data: Book) => {
      content.value = data.content || '';
      anchors.value = data.anchors || [];
      previousContent = data.content || "";
    })
  }
}, { immediate: true })

onBeforeMount(() => {
  intervalSave = setInterval(() => {
    autoSave()
  }, 5000)
}),
  onBeforeUnmount(() => {
    clearInterval(intervalSave)
  })
</script>

<template>
  <div class="w-full flex">
    <MdEditor v-model="content" v-model:anchors="anchors" />
  </div>
</template>


<style lang="scss"></style>
