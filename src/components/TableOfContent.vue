<template>
    <div class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pt-10 pb-6 top-18">
        <ul class="text-slate-700 text-sm leading-6">
            <li v-for="item in anchors" key="item.id" :class="`pl-${(item.level-1)*4}`">
                <a class="block py-1 font-medium hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300"
                    :href='`#${item.id}`' @click=onItemClick(item)>{{ item.textContent }}</a>
            </li>
        </ul>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps } from 'vue'
defineProps({
    editor: {
        type: Object,
        default: () => {
            return {}
        }
    },
    anchors: {
        type: Array,
        default: () => [{ id: 0, itemIndex: 1, textContent: 'test' }, { id: 1, itemIndex: 2, textContent: 'test1' }, { id: 2, itemIndex: 3, textContent: 'test2' }]
    }
})
const onItemClick = (item) => {
    console.log(item)
}
</script>


<style lang='scss' scoped></style>