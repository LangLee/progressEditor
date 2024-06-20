<template>
  <div class="fixed top-0 bottom-0 left-0 right-0 center z-50" :class="{ hidden: !visible }">
    <div
      class="flex flex-col w-full lg:w-80 mx-auto lg:mt-[10%] max-h-full lg:max-h-[60%] shadow-lg rounded-lg bg-white">
      <div class="flex px-4 py-2 border-b border-slate-100 ">
        <div class="flex flex-1 items-center">
          <span class="font-semibold">{{ title }}</span>
        </div>
        <button class="rounded px-2 bg-slate-100 hover:bg-blue-300 hover:text-slate-100" @click="closeModal">
          <RemixIcon name="close-line" class="leading-6"></RemixIcon>
        </button>
      </div>
      <div class="flex flex-1 flex-col p-4 overflow-auto">
        <slot></slot>
      </div>
      <div class="flex justify-end py-1 px-6 border-t border-slate-100 leading-6">
        <button class="px-2 my-2 mr-2 bg-blue-400 text-white font-medium rounded-md shadow-md hover:bg-blue-500" @click="confirm">确定</button>
        <button class="px-2 my-2 font-medium rounded-md shadow-md" @click="cancel">取消</button>
      </div>
    </div>
  </div>
  <div class="fixed inset-0 z-40 bg-slate-300 opacity-50" :class="{ hidden: !visible }" @click="closeModal"></div>
</template>
<script setup>
import { ref, reactive, defineProps } from 'vue'
import RemixIcon from '../common/RemixIcon.vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: Number,
    default: 480
  }
})
const emits = defineEmits(['update:visible', 'confirm', 'cancel']);
const closeModal = () => {
  emits("update:visible", false);
  cancel();
}
const confirm = ()=>{
  emits("confirm");
}
const cancel = ()=>{
  emits("cancel");
}
</script>


<style lang='scss' scoped></style>