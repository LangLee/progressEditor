<template>
    <div class="flex w-full h-full p-4 lg:p-20 justify-center">
        <ul class="lg: w-1/2">
            <li v-for="(book, index) in books" :key="index" class="relative">
                <div class="inline-block">
                    <span class="font">{{ book.createTime }}</span>
                </div>
                <div class="inline-block relative border-l-2 h-28 my-4">
                    <RemixIcon name="circle-line" class="absolute t-0"></RemixIcon>
                    <a href="#" class="text-normal font-semibold" @click="openBook(book)">{{ book.title }}</a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getBooks } from '../api/book'
import {useRouter} from 'vue-router';
import RemixIcon from '../components/RemixIcon.vue';
const router = useRouter();
const books = ref([]);
const openBook = (book)=>{
    router.push(`/books/${book._id}`)
}
onMounted(() => {
    getBooks().then(data => {
        books.value = data || [];
    })
})
</script>


<style lang='scss' scoped></style>