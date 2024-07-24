<template>
  <div
    class="flex flex-col lg:justify-center justify-end fixed top-0 left-0 inset-0 z-50 backdrop-blur bg-black/20 dark:bg-black/20 transition-transform duration-500 ease-in-out delay-200"
    :class="visible ? 'translate-y-0' : 'translate-y-[100%]'">
    <div class="flex flex-col w-full lg:w-80 mx-auto max-h-full lg:max-h-[60%] shadow-lg rounded-lg bg-white dark:bg-neutral-800">
      <div v-if="title || !closable" class="flex p-4 border-b border-slate-100 dark:border-slate-50/20">
        <div class="flex flex-1 items-center">
          <span class="text-lg font-semibold">{{ title }}</span>
        </div>
        <button v-if="closable" class="rounded px-2 text-xl hover:bg-blue-300 hover:text-slate-100"
          @click.stop="closeModal">
          <RemixIcon name="close-line" class="leading-6"></RemixIcon>
        </button>
      </div>
      <div class="flex flex-1 flex-col p-4 overflow-auto">
        <slot></slot>
      </div>
      <div class="flex border-t border-slate-100 dark:border-slate-50/20 shadow-lg rounded-lg">
        <button class="basis-1/2 py-3 bg-blue-400 text-white font-medium hover:bg-blue-700"
          @click.stop="confirm">确定</button>
        <button class="basis-1/2 py-3 font-medium bg-white hover:bg-slate-50 dark:bg-transparent" @click.stop="cancel">取消</button>
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


<style lang='scss'></style>