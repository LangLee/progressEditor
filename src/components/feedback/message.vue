<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="flex w-full align-middle justify-center p-4"
    >
      <div class="flex items-center min-w-28 px-4 py-2 rounded bg-white shadow shadow-slate-300">
        <IconSvg :name="config.type" class="mr-2"></IconSvg>
        <p :class="config.type" class="mr-2 text-sm">{{ config.content }}</p>
        <button @click="close" class="text-lg text-slate-400 hover:text-slate-700">
        &times;
      </button>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref, defineProps } from 'vue'
import IconSvg from '../common/IconSvg.vue';
defineProps({
    config: {
        type: Object,
        required: true,
        default: () => ({
            content: '空消息',
            type: 'info',
        }),
    }
})
const emits = defineEmits(['close']);
const visible = ref(true);
const close = () => {
    visible.value = false;
    emits('close');
}
</script>
<style lang='scss' scoped>
.info {
    color: #1377EB;
}
.success {
    color: #40BD48;
}
.warning {
    color: #FFB829;
}
.error {
    color: #F54645;
}
</style>