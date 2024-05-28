<template>
    <div class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pb-6 top-18">
        <ul v-if="anchors && anchors.length>0" class="text-slate-600 text-sm leading-6">
            <p class="font-semibold text-gray-900 leading-8">概要</p>
            <li v-for="item in anchors" key="item.id" :class="`pl-${(item.level-1) * 4}`">
                <a class="block py-1 font-medium hover:text-slate-900"
                :class="{'text-slate-900': item.isActive}"
                    :href='`#${item.id}`' @click=onItemClick(item)>
                    <RemixIcon v-if="item.level>1" name="arrow-right-s-line"/>
                    {{ item.textContent }}</a>
            </li>
        </ul>
        <div v-else class="text-slate-300 text-sm">
            <p>写点啥才能有概要...</p>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps, defineComponent } from 'vue'
import RemixIcon from './RemixIcon.vue'
defineComponent({
    RemixIcon
})
defineProps({
    editor: {
        type: Object,
        default: () => {
            return {}
        }
    },
    anchors: {
        type: Array,
        default: () => []
    }
})
const onItemClick = (item) => {
    console.log(item)
}
</script>


<style lang='scss' scoped></style>