<template>
    <div v-if="visible" class="fixed top-0 left-0 inset-0 center z-50 backdrop-blur bg-white/50">
      <div
        class="flex flex-col w-full lg:w-80 mx-auto lg:mt-[10%] max-h-full lg:max-h-[60%] shadow-lg rounded-lg bg-white">
        <div class="flex px-4 py-2 border-b border-slate-100 ">
          <div class="flex flex-1 items-center">
            <span class="font-semibold">{{ title }}</span>
          </div>
          <button v-if="closable" class="rounded px-2 bg-slate-100 hover:bg-blue-300 hover:text-slate-100"
            @click.stop="closeModal">
            <RemixIcon name="close-line" class="leading-6"></RemixIcon>
          </button>
        </div>
        <div class="flex flex-1 flex-col p-4 overflow-auto">
          <slot></slot>
        </div>
        <div class="flex justify-end py-1 px-6 border-t border-slate-100 leading-6">
          <button class="px-2 my-2 mr-2 bg-blue-400 text-white font-medium rounded-md shadow-md hover:bg-blue-500"
            @click.stop="confirm">确定</button>
          <button class="px-2 my-2 font-medium rounded-md shadow-md" @click.stop="cancel">取消</button>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineProps, onMounted, onUnmounted, getCurrentInstance } from 'vue'
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
  },
  closable: {
    type: Boolean,
    default: true
  },
  container: {
    // 允许传入一个选择器字符串或DOM引用
    type: [String, Object],
    default: 'body'
  }
})
const emits = defineEmits(['update:visible', 'confirm', 'cancel']);
const { proxy } = getCurrentInstance();
let popupContainer = null;
const closeModal = () => {
  emits("update:visible", false);
  cancel();
}
const confirm = () => {
  emits("confirm");
}
const cancel = () => {
  emits("cancel");
}
onMounted(() => {
  // 根据container属性决定最终的挂载节点
  if (typeof props.container === 'string') {
    popupContainer = document.querySelector(props.container);
  } else {
    popupContainer = props.container;
  }
  if (popupContainer) {
    popupContainer.appendChild(proxy.$el);
  } else {
    console.error('Invalid container specified for CustomPopup.');
  }
}),
  onUnmounted(() => {
    // 在组件销毁前，从容器中移除弹窗
    if (popupContainer && popupContainer.contains(proxy.$el)) {
      popupContainer.removeChild(proxy.$el);
      popupContainer = null;
    }
  })
</script>


<style lang='scss'>
</style>