<template>
  <div
    ref="select"
    class="flex p-2 bg-white text-slate-600 dark:text-slate-100 dark:bg-neutral-800 placeholder-slate-300 border rounded"
    :class="{ 'outline-none ring-1 ring-blue-600 border-transparent': !hidden }"
    @click="showModal"
  >
    <div class="flex-1 pr-4 text-slate-400">
      <input
        v-if="showSearch && !disabled"
        v-model="searchText"
        @keyup.enter="filterOptions"
        @blur="onInputBlur"
        :placeholder="display || '输入关键字搜索'"
        class="w-full outline-none bg-transparent"
      />
      <span v-else-if="{ display }">{{ display }}</span>
      <span v-else>{{ palaceHolder }}</span>
    </div>
    <RemixIcon
      v-if="mobile"
      class="float-right hover:text-blue-500"
      :name="hidden ? 'arrow-down-s-fill' : 'arrow-up-s-fill'"
    />
    <tippy
      v-if="!mobile && !disabled"
      ref="dropdown"
      trigger="click"
      placement="bottom-end"
      :offset="[10, 5]"
      animation="fade"
      :interactive="true"
      :arrow="false"
      :triggerTarget="select"
      :onShow="dropdownShow"
      :onHide="dropdownHide"
    >
      <RemixIcon
        class="float-right hover:text-blue-500"
        :name="hidden ? 'arrow-down-s-fill' : 'arrow-up-s-fill'"
      />
      <template #content>
        <div
          class="text-slate-600 dark:text-slate-300 overflow-y-auto max-h-60"
          :style="{ width: dropdownWidth }"
        >
          <div
            v-if="filteredOptions && filteredOptions.length"
            v-for="(item, index) in filteredOptions"
            :key="index"
            class="w-full h-8 leading-8 px-2 rounded dark:rounded-none mb-1 hover:bg-neutral-100 cursor-pointer text-gray-700 dark:text-gray-200"
            @click="selectItem(item)"
          >
            {{ item.label }}
          </div>
          <div v-else class="w-full px-2 py-1">暂无数据</div>
        </div>
      </template>
    </tippy>
    <Modal
      class="max-h-4/5"
      v-else-if="mobile && !disabled"
      :visible="!hidden"
      :zIndex="100"
      :footer="false"
      @update:visible="dropdownHide"
    >
      <div class="w-full bg-white dark:bg-neutral-800">
        <div
          v-if="options && options.length"
          v-for="(item, index) in options"
          :key="index"
          class="py-2 cursor-pointer hover:bg-blue-400 hover:text-slate-50 text-center dark:text-slate-100 rounded"
          @click="selectItem(item)"
        >
          {{ item.label }}
        </div>
        <div v-else class="w-full py-2 text-center">暂无数据</div>
      </div>
    </Modal>
  </div>
</template>
<script setup>
import {
  ref,
  reactive,
  watch,
  defineProps,
  defineEmits,
  onMounted,
  nextTick,
} from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import Modal from '@/components/feedback/Modal.vue'
import { isMobile } from '@/common/utils'
const hidden = ref(true)
const dropdown = ref()
const select = ref()
const dropdownWidth = ref('')
const mobile = ref(isMobile())
const searchText = ref('')
const filteredOptions = ref([])
const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
  modelValue: String,
  palaceHolder: {
    type: String,
    default: '请选择',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showSearch: {
    type: Boolean,
    default: false,
  },
})
const emits = defineEmits(['update:modelValue'])
const display = ref('')
const filterOptions = () => {
  const keyword = searchText.value.trim().toLowerCase()
  if (!keyword) {
    filteredOptions.value = props.options
    return
  }
  filteredOptions.value = props.options.filter((item) =>
    item.label.toLowerCase().includes(keyword)
  )
}
const onInputBlur = () => {
  searchText.value = ''
}
const selectItem = (item) => {
  display.value = item.label
  emits('update:modelValue', item.value)
  hidden.value = true
  searchText.value = ''
  filteredOptions.value = props.options
  dropdown?.value?.hide()
}
const dropdownShow = () => {
  hidden.value = false
  return true
}
const dropdownHide = () => {
  hidden.value = true
  return true
}
const showModal = () => {
  if (!isMobile()) {
    return true
  }
  hidden.value = false
}
watch(
  () => props.modelValue,
  (newVal) => {
    props.options.map(({ value, label }) => {
      if (newVal === value) {
        display.value = label
      }
    })
  },
  { immediate: true }
)
watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = newOptions
  },
  { immediate: true }
)
onMounted(() => {
  nextTick(() => {
    dropdownWidth.value = `${select.value.clientWidth - 14}px`
  })
})
</script>

<style lang="scss" scoped></style>

