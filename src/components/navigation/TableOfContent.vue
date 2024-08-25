<template>
    <div class="flex flex-col justify-between overflow-y-auto sticky max-h-(screen-18) pb-6 text-sm">
        <p v-if="anchors && anchors.length > 0" class="font-semibold text-grey-900 dark:text-gray-300 leading-8 px-1">目录大纲</p>
        <ul v-if="anchors && anchors.length > 0" class="text-gray-600 leading-8 px-2">
            <li v-for="item in anchors" key="item.id" class="border-l dark:border-gray-500" :style="{ paddingLeft: item.level + 'rem' }">
                <a class="block cursor-pointer"
                    :class="{ 'text-blue-600 font-bold': item.isActive, 'hover:text-blue-400': !item.isActive, 'text-gray-500 dark:text-gray-500': item.isScrolledOver && !item.isActive, 'text-gray-700 dark:text-gray-400': !item.isScrolledOver && !item.isActive }"
                    @click.stop=onItemClick(item)>
                    <RemixIcon v-if="item.level > 1" name="arrow-right-s-line" />
                    {{ item.textContent }}
                </a>
            </li>
        </ul>
        <!-- <div v-else class="text-slate-400 px-2">
            <p>nothing</p>
        </div> -->
    </div>
</template>
<script setup>
import { ref, reactive, defineProps, defineComponent, watch } from 'vue'
import { TextSelection } from '@tiptap/pm/state'
import RemixIcon from '../common/RemixIcon.vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter();
const route = useRoute();
const props = defineProps({
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
    if (props.editor) {
        const element = props.editor.view.dom.querySelector(`[data-toc-id="${item.id}"`)
        if (!element) return;
        const pos = props.editor.view.posAtDOM(element, 0)

        // set focus
        const tr = props.editor.view.state.tr

        tr.setSelection(new TextSelection(tr.doc.resolve(item.pos || 0)))

        props.editor.view.dispatch(tr)

        props.editor.view.focus()

        //   if (history.pushState) { // eslint-disable-line
        //     history.pushState(null, null, `#${item.id}`) // eslint-disable-line
        //   }
        router.replace({
            path: route.path,
            params: route.params,
            query: {appId: route.query.appId, anchorId: item.id}
        })
        window.scrollTo({
            top: element.getBoundingClientRect().top + window.scrollY - 64,
            behavior: 'smooth',
        })
    }
}
watch(() => route.query.anchorId, (value, oldValue) => {
    if (value && value !== oldValue) {
        onItemClick({ id: value, pos: 0 })
    }
}, { immediate: true });
</script>


<style lang='scss' scoped></style>