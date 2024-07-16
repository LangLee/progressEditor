<template>
    <div class="flex flex-col h-screen w-full">
        <Header :hiddenFold="true">
            <div v-if="editable">
            <button
                class="px-2 lg:py-1 lg:px-4 mx-1 lg:mx-2 text-basic lg:text-lg font-normal lg:font-medium rounded-md text-slate-50 bg-blue-400 hover:bg-blue-700"
                @click="appendPortal">
                <span>新增</span>
                <RemixIcon name="add-line" />
            </button>
            <button
                class="px-2 lg:py-1 lg:px-4 mx-1 lg:mx-2 text-basic lg:text-lg font-normal lg:font-medium border rounded-md text-blue-400 border-blue-400 hover:text-blue-700 hover:border-blue-700"
                @click="importPortal">
                <span>导入</span>
                <RemixIcon name="add-line" />
            </button>
            <button
                class="px-2 lg:py-1 lg:px-4 mx-1 lg:mx-2 text-basic lg:text-lg font-normal lg:font-medium border rounded-md text-blue-400 border-blue-400 hover:text-blue-700 hover:border-blue-700"
                @click="exportPortal">
                <span>导出</span>
                <RemixIcon name="add-line" />
            </button>
        </div>
        </Header>
        <div class="flex-1 p-2 lg:p-4 overflow-y-auto">
            <ul v-for="(portal, index) in portals" :key="index">
                <p class="m-2 lg:m-4 text-basic lg:text-lg text-blue-900 dark:text-slate-200 font-medium" @mouseover="onItemMouseover(portal.id)"
                @mouseleave="onItemMouseleave()">
                    <span class="mr-2">{{ portal.name }}</span>
                    <RemixIcon v-if="editable && hoverItem===portal.id" class="shadow-sm rounded-sm text-blue-300 hover:text-blue-700" name="edit-line" @click.stop="onEditPortal(portal)"></RemixIcon>
                </p>
                <div class="flex flex-row flex-wrap">
                    <li v-for="(book, idx) in portal.books" class='m-2 lg:m-4' :key="idx">
                        <Card theme="blue" :editable="editable" :modelValue="book" @edit="onEditBook(book)" @remove="onRemoveBook(book)"/>
                    </li>
                    <li v-if="editable" class='m-2 lg:m-4'>
                        <Card theme="blue" :modelValue="{ title: '新增书签', icon: 'add-line' }" @cardClick="() => appendBook(portal)" />
                    </li>
                </div>
            </ul>
        </div>
    </div>
    <GroupModal :title="`${isNew ? '新增分类' : '编辑分类'}`" :visible="!!editPortal" v-model:group="editPortal" @confirm="finishEditPortal" @cancel="closePortalModal"/>
    <BookModal fixedType="link" :title="`${isNew ? '新增书签' : '编辑书签'}`" :visible="!!currentBook" v-model:book="currentBook" @confirm="finishEditBook" :categories="portals" @cancel="closeBookModal"/>
    <Modal :visible="!!currentRemoveBook" :closable="false" title="确认删除" @confirm="finishRemoveBook" @cancel="closeRemoveModal">
        <p class="align-center">你真的要删除这个书签？</p>
    </Modal>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import Card from '@/components/common/Card.vue'
import GroupModal from '@/components/feedback/GroupModal.vue'
import BookModal from '@/components/feedback/BookModal.vue'
import Header from '@/components/navigation/Header.vue';
import Modal from '@/components/feedback/Modal.vue'
import { getPortalAndBooks, createGroup, updateGroup } from '@/api/group'
import Group from '@/types/group'
import Book from '@/types/book'
import { createBook, updateBook, removeBook } from '@/api/book'
import message from '@/components/feedback/message'
const portals = ref(Array<Group>());
const editable = ref(false);
const currentBook = ref();
const currentCategory = ref();
const editPortal = ref();
const isNew = ref(false);
const currentRemoveBook = ref();
const hoverItem = ref('');
const appendBook = (portal: Group) => {
    isNew.value = true;
    currentBook.value = {
        title: '新增书签',
        type: 'link',
        url: '',
        category: portal.id 
    }
}
const onEditBook = (book) => {
    isNew.value = false;
    currentBook.value = book;
    currentCategory.value = book.category;
}
const onRemoveBook = (book) => {
    currentRemoveBook.value = book.id;
}
const closeRemoveModal = ()=>{
    currentRemoveBook.value = null;
}
const finishRemoveBook = () => {
    removeBook(currentRemoveBook.value).then((data)=>{
        portals.value = portals.value.map((portal:Group) => {
            if (portal.id === data.category) {
                portal.books = portal.books && portal.books.filter((book) => book.id !== data.id);
            }
            return portal;
        })
        currentRemoveBook.value = null;
    });
}
const appendPortal = () => {
    isNew.value = true;
    editPortal.value = {name: ''}
}
const onEditPortal = (portal)=>{
    isNew.value = false;
    editPortal.value = portal;
}
const importPortal = () => {
    message.warning('还未开发，敬请期待');
}
const exportPortal = () => {
    message.warning('还未开发，敬请期待');
}
const finishEditPortal = () => {
    if (isNew.value) {
        createGroup(editPortal.value).then((data:Group) => {
            if (portals.value && portals.value.length > 0) {
                portals.value.push(data);
            }
            editPortal.value = undefined;
            isNew.value = false;
        })
    } else {
        updateGroup(editPortal.value).then((data) => {
            portals.value = portals.value.map((portal:Group) => {
                if (portal.id === data.id) {
                    return data;
                }
                return portal;
            })
            editPortal.value = undefined;
        })
    }
}
const finishEditBook = () => {
    if(isNew.value) {
        createBook(currentBook.value).then((data) => {
            let group = portals.value.find(({ id }) => id === data.category);
            if (!group) return;
            group.books = group.books || [];
            data.id = data._id;
            group.books.splice(0, 0, data);
            currentBook.value = undefined;
            isNew.value = false;
        })
    } else if (currentBook && currentBook.value) {
        updateBook(currentBook.value).then((data: Book) => {
            if (data.category !== currentCategory.value) {
                portals.value = portals.value.map((portal:Group) => {
                    if (portal.id === currentCategory.value) {
                        portal.books = portal.books && portal.books.filter((book) => book.id !== data.id);
                    }
                    if (portal.id === data.category) {
                        portal.books?.splice(0, 0, data);
                    }
                    return portal;
                })
            }
        });
    }
}
const closePortalModal = ()=>{
    editPortal.value = undefined;
    isNew.value = false;
}
const closeBookModal = ()=>{
    currentBook.value = undefined;
    currentCategory.value = undefined;
    isNew.value = false;
}
const onItemMouseover = (id) => {
    hoverItem.value = id;
}
const onItemMouseleave = () => {
    hoverItem.value = '';
}
onMounted(() => {
    getPortalAndBooks().then((res) => {
        editable.value = res.editable;
        portals.value = res.portals;
    });
})
</script>

<style lang='scss' scoped></style>