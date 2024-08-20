<template>
    <div class="flex-1 flex flex-col w-full bg-slate-300/20 overflow-hidden">
        <ChatPanel :editable="editable" :messages="messages"></ChatPanel>
    </div>
</template>
<script setup>
import { ref, watch } from 'vue'
import ChatPanel from '@/components/display/ChatPanel.vue'
const props = defineProps({
    modelValue: String,
    editable: {
        type: Boolean,
        default: true
    }
});
const messages = ref([]);
watch(() => props.modelValue, (newValue) => {
    if (newValue === '') {
        messages.value = [];
        return;
    }
    messages.value = JSON.parse(newValue);
}, { immediate: true });
</script>


<style lang='scss' scoped></style>