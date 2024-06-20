<template>
    <div class="flex w-full h-full p-4 lg:p-20 justify-center">
        <ul class="lg:w-1/2">
            <li v-for="(book, index) in books" :key="index" class="relative flex h-28">
                <div class="inline-block w-1/2 px-4 lg:text-right">
                    <span class="text-normal text-slate-500">{{ book.createTime }}</span>
                </div>
                <div :class="`absolute w-4 h-4 start-1/2 top-1 bg-slate-50 border-4 rounded-lg  border-${COLOR_MAP[Math.floor(Math.random() * 10)]}-500`">
                    <!-- <RemixIcon name="circle-line" class="absolute t-0"></RemixIcon> -->
                </div>
                <span class="hidden border-blue-500 border-teal-500 border-red-500 border-orange-500 border-amber-500 border-yellow-500 border-purple-500 border-green-500 border-pink-500 border-rose-500"></span>
                <div class="absolute start-1/2 w-4 top-6 h-20">
                    <div class="w-0.5 mx-auto bg-slate-300 h-full"></div>
                </div>
                <div class="inline-block w-1/2 pl-8">
                    <a href="#" class="text-normal font-bold text-slate-700" @click="openBook(book)">{{ book.title }}</a>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getBooks } from '../api/book'
import {useRouter} from 'vue-router';
import RemixIcon from '../components/common/RemixIcon.vue';
const router = useRouter();
const books = ref([]);
const openBook = (book)=>{
    router.push(`/books/${book._id}`)
}
const COLOR_MAP = ['blue', 'teal', 'red', 'orange', 'amber', 'yellow', 'purple', 'green', 'pink', 'rose'];
onMounted(() => {
    getBooks().then(data => {
        books.value = data || [];
    })
})
</script>


<style lang='scss' scoped></style>