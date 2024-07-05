<template>
  <div class="flex flex-col h-screen w-full justify-center items-center text-slate-700">
    <Header></Header>
    <div class="flex-1 w-full p-2 lg:p-4">
      <WordCard v-for="(word, index) in words" kye="word._id" :modelValue="word" @update:modelValue="(updateWord)=>toggleNewWord(index, updateWord)"/>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { getWords } from '@/api/word'
import message from '@/components/feedback/message.ts'
import Header from '@/components/navigation/Header.vue'
import WordCard from '@/components/display/WordCard.vue'
const words = ref([]);
const toggleNewWord = (index, word) => {
  let oldWord = words.value[index];
  oldWord.newWord = word.newWord;
}
onMounted(() => {
  getWords(true).then((data) => {
    words.value = data;
  })
})
</script>


<style lang='scss' scoped></style>