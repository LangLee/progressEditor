<template>
  <node-view-wrapper class="codeBlock">
    <div class="header">
      <ProSelect
        class="w-40 py-0"
        :modelValue="languageValue"
        :options="languageOptions"
        palaceHolder="auto"
        :disabled="!editor.isEditable"
        @change="changeLanguage"
      ></ProSelect>
      <span
        class="hover:text-slate-700 dark:hover:text-neutral-300 cursor-pointer"
        @click.stop="copy"
      >
        <RemixIcon name="file-copy-2-line" />
        <span>复制</span>
      </span>
    </div>
    <pre spellcheck="false">
      <node-view-content as="code" :class="`language-${languageValue}`" />
    </pre>
  </node-view-wrapper>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { NodeViewContent, NodeViewWrapper } from '@tiptap/vue-3'
import ProSelect from '@/components/entry/ProSelect.vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { copyTextToClipboard } from '@/common/utils'
import message from '@/components/feedback/message'
const props = defineProps<{
  node: any
  updateAttributes: (attrs: Record<string, any>) => void
  extension: any
  editor: any
  getPos: () => number
}>()

const languageValue = ref(props.node.attrs.language || null)
const isSelected = ref(false)

// 获取语言列表并排序
const languageOptions = computed(() => {
  return props.extension.options.lowlight
    .listLanguages()
    .sort()
    .map((language: string) => {
      return {
        label: language,
        value: language,
      }
    })
})

// 切换语言时更新属性和状态
const changeLanguage = (language: string) => {
  ;(languageValue.value = language),
    props.updateAttributes({
      language: language,
    })
}
const copy = () => {
  const code = props.node.attrs.code
  copyTextToClipboard(code, () => {
    message.success('复制成功')
  })
}

// 监听编辑器选择变化
onMounted(() => {
  const updateSelection = () => {
    const { state } = props.editor
    const { from, to } = state.selection
    // 检查选区是否与节点范围重叠
    const isNodeSelected =
      (from >= props.getPos() && from < props.getPos() + props.node.nodeSize) ||
      (to > props.getPos() && to <= props.getPos() + props.node.nodeSize)
    isSelected.value = isNodeSelected
  }

  props.editor.on('selectionUpdate', updateSelection)
  onBeforeUnmount(() => {
    props.editor.off('selectionUpdate', updateSelection)
  })
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
