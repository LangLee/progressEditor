<template>
    <div id="navWrapper"
        class="h-full overflow-y-auto scrolling-touch lg:h-auto lg:block lg:sticky lg:bg-transparent overflow-hidden lg:top-16 bg-white mr-24 lg:mr-0">
        <div class="flex h-10 px-3 mx-1 sm:mx-3 xl:mx-5 py-2 rounded-md">
            <button class="flex font-sans-serif text-base text-blue-300 hover:text-blue-400" @click="onCreateGroup">
                <div class="">添加分组</div>
            </button>
            <button class="flex font-sans-serif text-base text-blue-300 hover:text-blue-400 ml-4" @click="onCreateBook">
                <div class="">添加笔记</div>
            </button>
        </div>
        <nav class="px-1 overflow-y-auto sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pb-14" style="height: calc(100vh - 7rem)">
            <ul>
                <li v-for="(group, index) in groups" :key="group.id">
                    <input ref="titleInput" v-if="group.id === editItem" class="p-2 w-full rounded-md" type="text"
                        v-model="group.name" @keyup.enter="onUpdateGroup(group)" />
                    <div v-else class="px-3 py-2 relative font-medium text-gray-900 text-base cursor-pointer"
                        @dblclick="(e) => onEditGroup(e, group.id)">
                        <span>{{ group.name }}</span>
                        <span v-if="!group.readonly && (!group.books || group.books.length <= 0)"
                            class="font-sans text-xs text-blue-300 hover:text-blue-400 ml-4 cursor-pointer"
                            @click="onRemoveGroup(group, index)">
                            删除
                        </span>
                    </div>
                    <ul class="ml-3">
                        <li v-for="(book, idx) in group.books" :key="book.id">
                            <input ref="titleInput" v-if="book.id === editItem" class="p-2 w-full rounded-md"
                                type="text" v-model="book.title" @keyup.enter="onUpdateBook(book)" />
                            <a v-else href="#" @click="onMenuChange(book)" @dblclick="onEditBookTitle(book.id)"
                                class="px-3 py-2 transition-colors duration-200 relative block text-grey-700 hover:text-gray-900">
                                <span v-if="book.id === activeItem" class="rounded-md absolute inset-0 bg-blue-300">
                                </span>
                                <!-- <span class="inline-block">M</span> -->
                                <tippy placement="top-start">
                                    <span
                                        class="relative inline-block text-base text-ellipsis whitespace-nowrap overflow-hidden">
                                        {{ book.title }}
                                    </span>
                                    <template #content>
                                        <span class="p-2 bg-slate-700 text-white text-sm rounded shadow-md">
                                            {{ book.title }}
                                        </span>
                                    </template>
                                </tippy>
                            </a>
                            <div v-if="book.id === activeItem"
                                class="font-sans text-xs text-blue-300 hover:text-blue-400 mx-4 py-1">
                                <span class="mr-2 cursor-pointer" @click="onEditBook(book)">编辑</span>
                                <span class="mr-2 cursor-pointer" @click="onRemoveBook(group.books, idx)">删除</span>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <BookModal v-if="!!editBook" :title="`${editBook && editBook.isNew ? '新增' : '编辑'}书籍`" :visible="!!editBook"
            @confirm="finishEditBook" @cancel="closeModal" :book="editBook" :categories="groups"></BookModal>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getBooks, createBook, removeBook, updateBookTitle } from '../../api/book'
import { getGroupAndBooks, createGroup, updateGroup, removeGroup } from '../../api/group'
import BookModal from '../feedback/BookModal.vue'
import message from '../feedback/message';
const router = useRouter();
const route = useRoute();
const groups = ref([]);
const activeItem = ref('');
const editItem = ref('');
const editBook = ref(null);
const { proxy } = getCurrentInstance();
const onMenuChange = (item) => {
    let { id } = item || {};
    if (!id) {
        router.push('/books');
        return;
    }
    // 激活菜单
    activeItem.value = id;
    editItem.value = '';
    router.push(`/books/${id}`);
}
const onCreateGroup = () => {
    createGroup().then((data) => {
        let { _id, name } = data;
        if (!_id) return;
        groups.value.push({ id: _id, name, books: [] });
    })
}
const onEditGroup = (event, id) => {
    if (id === 'default') return;
    editItem.value = id;
    proxy.$nextTick(() => {
        let titleInput = proxy.$refs.titleInput;
        console.log(titleInput)
        titleInput && titleInput[0] && titleInput[0].focus();
    })
}
const onUpdateGroup = (group) => {
    updateGroup(group).then(() => {
        editItem.value = '';
    })
}
const onRemoveGroup = (group, index) => {
    if (group.books && group.books.length > 0) {
        message.warning("该分组下有书籍，不能删除!")
        return;
    }
    removeGroup(group.id).then(() => {
        message.success("删除分组成功!")
        groups.value.splice(index, 1);
    })
}

const onCreateBook = () => {
    editBook.value = { title: "新增笔记", type: "markdown", isNew: true };
}
const finishEditBook = () => {
    if (editBook && editBook.value.isNew) {
        createBook(editBook.value).then((data) => {
            let group = groups.value.find(({ id }) => id === data.category);
            if (!group) return;
            group.books = group.books || [];
            data.id = data._id;
            group.books.splice(0, 0, data);
            onMenuChange(data);
            editBook.value = null;
        })
    } else if (editBook && editBook.value) {
        onUpdateBook(editBook.value)
    }
}
const closeModal = () => {
    editBook.value = null;
}
const onRemoveBook = (books, index) => {
    removeBook(activeItem.value).then(() => {
        books.splice(index, 1);
        let activeIdx = books && books.length > index ? index : books.length - 1;
        onMenuChange(activeIdx < 0 ? null : books[activeIdx]);
        message.success("删除书籍成功!")
    })
}
const onEditBookTitle = (id) => {
    editItem.value = id;
    proxy.$nextTick(() => {
        let titleInput = proxy.$refs.titleInput;
        titleInput && titleInput[0] && titleInput[0].focus();
    })
}
const onEditBook = (book) => {
    // 缓存当前分组
    editItem.value = book.category;
    editBook.value = book;
}
const onUpdateBook = (book) => {
    updateBookTitle({ ...book, category: book.category === "default" ? "" : book.category }).then((data) => {
        if (editItem.value !== book.category) {
            // 移动书籍到新的分组下
        }
        editItem.value = '';
        editBook.value = null;
    })
}
onMounted(() => {
    getGroupAndBooks().then(data => {
        groups.value = data || [];
        if (groups.value[0] && groups.value[0].books && groups.value[0].books[0]) {
            onMenuChange(groups.value[0].books[0]);
        }
    })
})
watch(() => route.params.id, (value, oldValue) => {
    if (value !== oldValue) {
        console.log('route', route)
        activeItem.value = value;
    }
}, { immediate: true })
</script>


<style lang='scss' scoped></style>