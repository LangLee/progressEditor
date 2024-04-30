<template>
    <div class="me-menu-toolbar">
        <button @click="appendMenuItem">
            <IconSvg name="add"></IconSvg>
            新增
        </button>
    </div>
    <ul class="me-menu-list">
        <li class="me-menu-item" v-for="(item, index) in menuList" :key="index">
            <router-link :to="item.id">{{ item.name }}</router-link>
        </li>
    </ul>
</template>
<script setup>
import { ref, reactive } from 'vue'
import IconSvg from '@/components/IconSvg.vue'
const menuList = ref([{id: "11111", name: "测试"}]);
const onMenuChange=(item)=>{
    let {id} = item || {};
    
}
const appendMenuItem=()=>{
    let id = new Date().getTime().toString();
    menuList.value.push({id, name: "新增笔记"})
}
</script>


<style lang='scss' scoped>
.me-menu-toolbar {
    padding-bottom: 0.5rem;
    button {
        font-size: 0.875rem;
    }
}
.me-menu-list {
    margin: 0;
    padding: 0;
    font-size: .875rem;
    line-height: 1.5;
    color: #1a253b;
    line-height: 0;
    list-style: none;
    background: #fff;
    outline: none;
    .me-menu-item {
        display: flex;
        padding-left: 0.5rem;
        min-height: 1.5rem;
        line-height: 1.5rem;
    }
}
</style>