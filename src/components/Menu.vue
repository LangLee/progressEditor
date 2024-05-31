<template>
    <div id="navWrapper"
        class="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:sticky lg:bg-transparent overflow-hidden lg:top-16 bg-white mr-24 lg:mr-0">
        <div class="h-10 px-3 mx-1 sm:mx-3 xl:mx-5 py-2 rounded-md">
            <button class="flex font-sans-serif text-base text-blue-300 hover:text-blue-400" @click="onCreateBook">
                <!-- <IconSvg class="color-blue-300" name="add"></IconSvg> -->
                <div class="">添加笔记</div>
            </button>
        </div>
        <nav class="px-1 overflow-y-auto sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pb-14"
            style="height: calc(100vh - 7rem)">
            <ul>
                <li v-for="(item, index) in menuList" :key="index">
                    <input v-if="item._id === activeItem && editing" class="p-2 w-full rounded-md" type="text"
                        v-model="item.title" @keyup.enter="onUpdateBook" :autofocus="true" />
                    <a v-else href="#" @click="onMenuChange(item)"
                        class="px-3 py-2 transition-colors duration-200 relative block text-grey-700 hover:text-gray-900">
                        <span v-if="item._id === activeItem" class="rounded-md absolute inset-0 bg-blue-300"></span>
                        <span class="relative break-all text-base">{{ item.title }}</span>
                    </a>
                    <div v-if="item._id === activeItem"
                        class="font-sans text-xs text-blue-300 hover:text-blue-400 mx-4 py-1">
                        <span class="mr-2 cursor-pointer" @click="onEditBook">编辑</span>
                        <span class="mr-2 cursor-pointer" @click="onRemoveBook(index)">删除</span>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import IconSvg from '@/components/IconSvg.vue'
import { useRouter, useRoute } from 'vue-router'
import { getBooks, createBook, removeBook, updateBookTitle } from '../api/book'

const router = useRouter();
const route = useRoute();
const menuList = ref([{ _id: 0, name: "默认笔记" }]);
const activeItem = ref('');
const editing = ref(false);
const onMenuChange = (item) => {
    let { _id } = item || {};
    // 激活菜单
    activeItem.value = _id;
    editing.value = false;
    router.push(`/books/${_id}`);
}
const onCreateBook = () => {
    createBook({ title: "", content: "" }).then((data) => {
        menuList.value.push(data || []);
    })
}
const onRemoveBook = (index) => {
    removeBook(activeItem.value).then(() => {
        menuList.value = menuList.value.filter(item => item._id !== activeItem.value);
        let activeIdx = menuList.value && menuList.value.length > index ? index : menuList.value.length - 1;
        onMenuChange(menuList.value[activeIdx]);
    })
}
const onEditBook = () => {
    editing.value = true;
}
const onUpdateBook = () => {
    let book = menuList.value.find(({ _id }) => _id === activeItem.value);
    updateBookTitle({ id: activeItem.value, title: book.title }).then(() => {
        editing.value = false;
    })
}
onMounted(() => {
    getBooks().then(data => {
        menuList.value = data || [];
    })
})
watch(()=>route.params.id, (value, oldValue)=>{
    if (value !== oldValue){
        console.log('route', route)
        activeItem.value = value;
    }
}, {immediate: true})
</script>


<style lang='scss' scoped></style>