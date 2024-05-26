<script setup lang="ts">
import MdEditor from "@/components/MdEditor.vue"
import { defineComponent, ref, watch, onBeforeMount, onBeforeUnmount } from "vue"
import { useRoute } from "vue-router";
import { getBookById, updateBook } from "@/api/book";
import Book from "@/types/book"
const route = useRoute();
defineComponent({
  MdEditor
})
const content = ref()
let previousContent = "";
const id = ref()
let intervalSave: NodeJS.Timeout | number;
const autoSave = () => {
  if (content.value === previousContent) return;
    updateBook({
      id: id.value,
      content: content.value
    }).then(() => {
      previousContent = content.value
    })
}

watch(() => route.params.id, (newVal, oldValue) => {
  if (newVal && newVal !== oldValue) {
    id.value = newVal || '';
    getBookById(newVal).then((data: Book) => {
      content.value = data.content || ""
      previousContent = data.content || ""
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
    <MdEditor v-model="content" />
  </div>
</template>


<style lang="scss"></style>
