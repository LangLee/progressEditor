<template>
    <div class="h-screen w-full p-2 lg:p-4 overflow-y-auto">
        <div v-if="editable" class="fixed top-0 left-0 right-0 h-12 lg:h-14 px-2 lg:px-4 py-2 shadow-md bg-white">
            <button
                class="px-2 lg:px-4 py-1 mr-2 lg:mr-4 text-basic lg:text-lg font-normal lg:font-medium border rounded-md text-purple-400 border-purple-400 hover:text-purple-700 hover:border-purple-700"
                @click="appendPortal">
                <span>新增分类</span>
                <RemixIcon name="add-line" />
            </button>
            <button
                class="px-2 lg:px-4 py-1 mr-2 lg:mr-4 text-basic lg:text-lg font-normal lg:font-medium border rounded-md text-purple-400 border-purple-400 hover:text-purple-700 hover:border-purple-700"
                @click="importPortal">
                <span>导入书签</span>
                <RemixIcon name="add-line" />
            </button>
            <button
                class="px-2 lg:px-4 py-1 mr-2 lg:mr-4 text-basic lg:text-lg font-normal lg:font-medium border rounded-md text-purple-400 border-purple-400 hover:text-purple-700 hover:border-purple-700"
                @click="exportPortal">
                <span>导出书签</span>
                <RemixIcon name="add-line" />
            </button>
        </div>
        <div :class="`${editable ? 'mt-12 lg:mt-14' : ''}`">
            <ul v-for="(portal, index) in portals" :key="index">
                <p class="mb-2 text-basic lg:text-lg text-purple-900 font-normal lg:font-medium">{{ portal.name }}</p>
                <div class="flex flex-row flex-wrap">
                    <li v-for="(book, idx) in portal.books" class='mb-4 mr-4 lg:mb-8 lg:mr-8' :key="idx">
                        <Card :modelValue="book" />
                    </li>
                    <li v-if="editable" class='mb-4 mr-4 lg:mb-8 lg:mr-8'>
                        <Card :modelValue="{ title: '新增书签', icon: 'add-line' }" @cardClick="() => appendBook(portal)" />
                    </li>
                </div>
            </ul>
        </div>
    </div>
    <GroupModal v-if="!!editPortal" :title="`${isNew ? '新增分类' : '编辑分类'}`" :visible="!!editPortal" :group="editPortal" @confirm="finishEditPortal" @cancel="closePortalModal"/>
    <BookModal v-if="!!editBook" :link="true" :title="`${isNew ? '新增书签' : '编辑书签'}`" :visible="!!editBook" :book="editBook" @confirm="finishEditBook" :categories="portals" @cancel="closeBookModal"/>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import Card from '@/components/common/Card.vue'
import GroupModal from '@/components/feedback/GroupModal.vue'
import BookModal from '@/components/feedback/BookModal.vue'
import { getPortalAndBooks, createGroup, updateGroup } from '@/api/group'
import Group from '@/types/group'
import { createBook, updateBook } from '@/api/book'
const portals = ref(Array<Group>());
const editable = ref(false);
const editBook = ref();
const editPortal = ref();
const isNew = ref(false);
const appendBook = (portal: Group) => {
    isNew.value = true;
    editBook.value = {
        title: '新增书签',
        type: 'link',
        url: '',
        category: portal.id 
    }
}
const appendPortal = () => {
    isNew.value = true;
    editPortal.value = {
        name: ''
    }
}
const importPortal = () => {
    console.log();
}
const exportPortal = () => {
    console.log();
}
const finishEditPortal = () => {
    if (isNew.value) {
        createGroup(editPortal.value).then((data:Group) => {
            if (portals.value && portals.value.length > 0) {
                portals.value.push(data);
            }
            editPortal.value = null;
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
            editPortal.value = null;
        })
    }
}
const finishEditBook = () => {
    if(isNew.value) {
        createBook(editBook.value).then((data) => {
            let group = portals.value.find(({ id }) => id === data.category);
            if (!group) return;
            group.books = group.books || [];
            data.id = data._id;
            group.books.splice(0, 0, data);
            editBook.value = null;
            isNew.value = false;
        })
    } else if (editBook && editBook.value) {
        updateBook(editBook.value);
    }
}
const closePortalModal = ()=>{
    editPortal.value = null;
    isNew.value = false;
}
const closeBookModal = ()=>{
    editBook.value = null;
    isNew.value = false;
}
onMounted(() => {
    getPortalAndBooks().then((res) => {
        editable.value = res.editable;
        portals.value = res.portals;
    });
})
</script>

<style lang='scss' scoped></style>