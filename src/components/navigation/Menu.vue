<template>
    <div id="sideBar"
        class="flex flex-col fixed top-16 bottom-0 backdrop-blur overflow-y-auto z-20 bg-black/20 lg:bg-transparent w-full lg:w-80 pr-24 lg:pr-0 transition-transform duration-300 ease-out delay-100 lg:translate-x-0"
        :class="foldState ? 'translate-x-[-100%]' : 'translate-x-0'" @click.stop="doFold">
        <div v-if="editable" class="flex h-14 px-1 sm:px-3 xl:px-5 py-1 pt-4 bg-white/95 lg:bg-transparent">
            <button
                class="font-sans-serif text-base text-blue-300 hover:text-blue-700 border border-blue-300 hover:border-blue-700 rounded px-2 mx-2"
                @click.stop="onCreateGroup">
                <RemixIcon name="add-line"/>
                <span>分类</span>
            </button>
            <button
                class="font-sans-serif text-base text-blue-300 hover:text-blue-700 border border-blue-300 hover:border-blue-700 rounded px-2 mx-2"
                @click.stop="onCreateBook">
                <RemixIcon name="add-line"/>
                <span>笔记</span>
            </button>
        </div>
        <nav class="flex-1 px-1 sm:px-3 xl:px-5 lg:text-sm pb-10 lg:pb-14 bg-white/95 lg:bg-transparent">
            <ul>
                <li v-for="(group, index) in groups" :key="group.id">
                    <input ref="titleInput" v-if="group.id === editItem" class="p-2 w-full rounded-md" type="text"
                        v-model="group.name" @keyup.enter="onUpdateGroup(group)" />
                    <div v-else class="px-3 py-2 relative font-medium text-gray-900 cursor-pointer"
                        @dblclick.stop="onInputEditGroup(group.id)" @mouseover="onItemMouseover(group.id)"
                        @mouseleave="onItemMouseleave(group.id)">
                        <span class="text-base mr-2">{{ group.name }}</span>
                        <transition name="fade">
                            <span v-if="hoverItem === group.id">
                                <span v-if="editable && !group.readonly"
                                    class="font-sans text-blue-300 hover:text-blue-700 mr-1 cursor-pointer"
                                    @click.stop="onEditGroup(group)">
                                    <RemixIcon name="edit-line" />
                                </span>
                                <span v-if="editable && !group.readonly && (!group.books || group.books.length <= 0)"
                                    class="font-sans text-blue-300 hover:text-blue-700 cursor-pointer"
                                    @click.stop="onRemoveGroup(group, index)">
                                    <RemixIcon name="delete-bin-line" />
                                </span>
                            </span>
                        </transition>
                    </div>
                    <ul class="ml-3">
                        <li :id="`book-${book.id}`" v-for="(book, idx) in group.books" :key="book.id">
                            <input ref="titleInput" v-if="book.id === editItem" class="p-2 w-full rounded-md"
                                type="text" v-model="book.title" @keyup.enter="onUpdateBook(book)" />
                            <a v-else @click.stop="onMenuChange(book)"
                                @dblclick.stop="onEditBookTitle(book.id)" @mouseover="onItemMouseover(book.id)"
                                @mouseleave="onItemMouseleave(book.id)"
                                class="px-3 py-2 transition-colors duration-200 relative block text-grey-700 hover:text-gray-900 cursor-pointer">
                                <!-- <span v-if="book.id === activeItem" class="rounded-md absolute inset-0 bg-blue-300">
                                </span> -->
                                <!-- <span class="inline-block">M</span> -->
                                <tippy placement="top-start" trigger="hover">
                                    <span
                                        class="relative inline-block text-base text-ellipsis whitespace-nowrap overflow-hidden"
                                        :class="book.id === activeItem ? 'text-blue-500 font-bold' : ''">
                                        {{ book.title }}
                                    </span>
                                    <template #content>
                                        <span class="p-2 bg-slate-700 text-white text-sm rounded shadow-md">
                                            {{ book.title }}
                                        </span>
                                    </template>
                                </tippy>
                                <transition name="fade">
                                    <div v-if="editable && book.id === hoverItem"
                                        class="float-right font-sans text-blue-300 py-1">
                                        <span class="mr-1 cursor-pointer hover:text-blue-700 "
                                            @click.stop="onEditBook(book)">
                                            <RemixIcon name="edit-line" />
                                        </span>
                                        <span class="cursor-pointer hover:text-blue-700 "
                                            @click.stop="onRemoveBook(group.books, idx)">
                                            <RemixIcon name="delete-bin-line" />
                                        </span>
                                    </div>
                                </transition>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
        <BookModal v-if="!!editBook" :fixedType="fixedType" :title="`${isNew ? '新增' : '编辑'}书籍`" :visible="!!editBook" @confirm="finishEditBook"
            @cancel="closeModal" :book="editBook" :categories="groups"></BookModal>
        <GroupModal v-if="!!editGroup" :title="`${isNew ? '新增分类' : '编辑分类'}`" :visible="!!editGroup" :group="editGroup"
            @confirm="finishEditGroup" @cancel="closeModal" />
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch, getCurrentInstance, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { createBook, removeBook, updateBookTitle } from '../../api/book'
import { getGroupAndBooks, createGroup, updateGroup, removeGroup } from '../../api/group'
import BookModal from '../feedback/BookModal.vue'
import GroupModal from '../feedback/GroupModal.vue'
import message from '../feedback/message';
import RemixIcon from '@/components/common/RemixIcon.vue'
const router = useRouter();
const route = useRoute();
const groups = ref([]);
const appId = ref(route.query.appId);
// 鼠标点击激活书签
const activeItem = ref('');
// 鼠标移入节点，可控制操作显影
const hoverItem = ref('');
// 当前input输入编辑的节点
const editItem = ref('');
// 弹窗编辑分类
const editGroup = ref(null);
// 弹窗编辑书签
const editBook = ref(null);
// 是否是新增的分类或者书签
const isNew = ref(false);
const { proxy } = getCurrentInstance();
const props = defineProps({
    fold: {
        type: Boolean,
        default: true
    },
    editable: {
        type: Boolean,
        default: true
    },
    fixedType: {
        type: String,
        default: ''
    },
    defaultGroup: {
        type: Boolean,
        default: false
    }
})
const foldState = ref(true);
const emits = defineEmits(['toggleFold', 'menuChange']);
const doFold = () => {
    foldState.value = true;
    emits('toggleFold', true);
}
const onMenuChange = (item) => {
    let { id } = item || {};
    // 激活菜单
    activeItem.value = id || '';
    editItem.value = '';
    doFold();
    emits('menuChange', id, route.query.appId);
}
const onCreateGroup = () => {
    editGroup.value = { name: "新增分类" };
    isNew.value = true;
}
const onInputEditGroup = (id) => {
    if (id === 'default') return;
    editItem.value = id;
    proxy.$nextTick(() => {
        let titleInput = proxy.$refs.titleInput;
        console.log(titleInput)
        titleInput && titleInput[0] && titleInput[0].focus();
    })
}
const onEditGroup = (group) => {
    editGroup.value = group;
    isNew.value = false;
}
const finishEditGroup = () => {
    if (editGroup.value && isNew.value) {
        createGroup(editGroup.value).then((data) => {
            let { _id, name } = data;
            if (!_id) return;
            groups.value.push({ id: _id, name, books: [] });
            editItem.value = '';
            editGroup.value = null;
            isNew.value = false;
        })
    } else if (editGroup.value) {
        onUpdateGroup(editGroup.value)
    }
}
const onUpdateGroup = (group) => {
    updateGroup(group).then(() => {
        editItem.value = '';
        editGroup.value = null;
        isNew.value = false;
    })
}
const onRemoveGroup = (group, index) => {
    if (group.books && group.books.length > 0) {
        message.warning("该分类下有书籍，不能删除!")
        return;
    }
    removeGroup(group.id).then(() => {
        message.success("删除分类成功!")
        groups.value.splice(index, 1);
    })
}

const onCreateBook = () => {
    isNew.value = true;
    editBook.value = { title: "新增笔记", type: props.fixedType || "markdown" };
}
const finishEditBook = () => {
    if (editBook && isNew.value) {
        createBook(editBook.value).then((data) => {
            let group = groups.value.find(({ id }) => id === data.category);
            if (!group) {
                group = groups.value.find(({ id }) => id === 'default');
                if (!group) return;
            };
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
    editItem.value = '';
    editBook.value = null;
    editGroup.value = null;
    isNew.value = false;
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
    // 缓存当前分类
    editItem.value = book.category;
    editBook.value = book;
    isNew.value = false;
}
const onUpdateBook = (book) => {
    updateBookTitle({ ...book, category: book.category === "default" ? "" : book.category }).then((data) => {
        if (editItem.value !== book.category) {
            // 移动书籍到新的分类下
        }
        editItem.value = '';
        editBook.value = null;
    })
}
onMounted(() => {
    getGroupAndBooks(props.defaultGroup).then(data => {
        groups.value = data || [];
        if (!route.params.id && groups.value[0] && groups.value[0].books && groups.value[0].books[0]) {
            onMenuChange(groups.value[0].books[0]);
        }
        if (route.params.id || (groups.value && groups.value[0] && groups.value[0].books && groups.value[0].books[0] && groups.value[0].books[0].id)) {
            proxy.$nextTick(() => {
                scrollToBook(route.params.id || groups.value[0].books[0].id)
            })
        }
    })
})
const scrollToBook = (bookId) => {
    let sideBar = document.getElementById('sideBar');
    if (sideBar && bookId) {
        let book = document.getElementById(`book-${bookId}`);
        if (book) {
            sideBar.scrollTo({
                top: book.offsetTop,
                behavior: "smooth"
            })
        }
    }
}
const onItemMouseover = (id) => {
    hoverItem.value = id;
}
const onItemMouseleave = (id) => {
    hoverItem.value = '';
}
watch(() => route.params.id, (value, oldValue) => {
    if (value !== oldValue) {
        activeItem.value = value;
        editItem.value = '';
        doFold();
        proxy.$nextTick(() => {
            scrollToBook(value);
        });
    }
}, { immediate: true })
watch(() => route.query.appId, (value) => {
    appId.value = value;
    console.log(value);
}, { immediate: true })
watch(() => props.fold, (value, oldValue) => {
    foldState.value = value
}, { immediate: true })
</script>


<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>