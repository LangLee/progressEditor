<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue"
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
const anchors = ref([]);
let previousContent = "";
const id = ref()
let intervalSave: NodeJS.Timeout | number;
const autoSave = () => {
  if (content.value === previousContent) return;
  let formatAnchors: Array<Anchor> = [];
  if (anchors.value && anchors.value.length > 0) {
    formatAnchors = anchors.value.map(({id, itemIndex, level, originalLevel, pos, textContent})=>({
      id, itemIndex, level, originalLevel, pos, textContent
    }))
  }
    updateBook({
      id: id.value,
      content: content.value,
      anchors: formatAnchors
    }).then(() => {
      previousContent = content.value
    })
}
watch(() => route.params.id, (newVal, oldValue) => {
  if (newVal && newVal !== oldValue) {
    id.value = newVal || '';
    getBookById(newVal).then((data: Book) => {
      content.value = data.content || "";
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
    <MdEditor v-model="content" v-model:anchors="anchors"/>
  </div>
</template>


<style lang="scss"></style>
