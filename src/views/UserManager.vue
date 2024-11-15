<template>
    <div class="h-screen w-full flex flex-col overflow-y-auto">
        <Header :hiddenFold="true"></Header>
        <!-- <List :editable="false" :options="userList" titleProperty="name"></List> -->
        <div class="w-full max-w-screen-2xl mx-auto my-8">
            <VueGoodTable :columns="columns" :rows="userList">
                <!-- <template #table-row="props">
                    <span v-if="props.column.field == 'operation'">
                        before
                    </span>
                    <span v-else>
                        {{ props.formattedRow[props.column.field] }}
                    </span>
                </template> -->
            </VueGoodTable>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Header from '@/components/navigation/Header.vue';
import List from '@/components/display/List.vue';
import { getUserList } from '@/api/user.ts'
import 'vue-good-table-next/dist/vue-good-table-next.css'
import { VueGoodTable } from 'vue-good-table-next';
const userList = ref([]);
const columns = ref([
    {
        label: '名称',
        field: 'name',
    },
    {
        label: '邮箱',
        field: 'email'
    },
    {
        label: '电话',
        field: 'mobile'
    }
]);
onMounted(() => {
    getUserList().then(data => {
        userList.value = data || [];
    })
})
</script>


<style lang='scss' scoped></style>