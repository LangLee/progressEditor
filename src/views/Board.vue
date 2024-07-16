<template>
    <div class="h-screen w-full flex flex-col overflow-y-auto">
        <Header :hiddenFold="true"></Header>
        <div class="flex p-2 lg:p-4 flex-wrap justify-start">
            <BookCard v-for="book in books" :key="book._id" :book="book"></BookCard>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import Header from '@/components/navigation/Header.vue';
import BookCard from '@/components/display/BookCard.vue'
import {getAllBooks} from '@/api/book';
const books = ref([]);
onMounted(() => {
    getAllBooks().then(res => {
        books.value = res;
    })
})
</script>


<style lang='scss' scoped>

</style>