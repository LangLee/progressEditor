<template>
    <div class="h-screen w-full flex flex-col overflow-y-auto">
        <Header :hiddenFold="true"></Header>
        <div class="flex-1 flex p-2 lg:p-4 flex-wrap justify-start bg-gray-300/20">
            <div class="flex flex-col w-full max-w-screen-md mx-auto">
                <BookCard v-for="book in books" :key="book._id" :book="book" @click="openBook(book)"></BookCard>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted } from 'vue'
import Header from '@/components/navigation/Header.vue';
import BookCard from '@/components/display/BookCard.vue'
import {getAllBooks} from '@/api/book';
import {useRouter} from 'vue-router';
const router = useRouter();
const books = ref([]);
const openBook = (book)=>{
    router.push({
        path: `/book/${book._id}`,
        query: {
            appId: book.appId
        }
    })
}
onMounted(() => {
    getAllBooks().then(res => {
        books.value = res;
    })
})
</script>


<style lang='scss' scoped>

</style>