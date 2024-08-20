<template>
    <div class="flex flex-col fixed top-16 bottom-0 backdrop-blur overflow-y-auto z-20 bg-black/10 dark:bg-neutral-900/40 w-full lg:w-80 pr-24 lg:pr-0 transition-transform duration-300 ease-out delay-100 lg:translate-x-0"
        :class="foldState ? 'translate-x-[-100%]' : 'translate-x-0'" @click.stop="doFold">
        <nav class="flex-1 p-3 font-bold bg-white/90 dark:bg-neutral-900/40">
            <ul>
                <li v-for="(contact, index) in contacts" :key="contact._id" @click="chatTo(contact)" class="relative h-12 leading-[3rem] px-2 border-b border-slate-300/20 cursor-pointer">
                    <Avatar class="mr-4" size="md" :file="contact.avatar" />
                    <span v-if="contact.noReadCount > 0" class="absolute left-8 top-0 block w-4 h-4 bg-red-600 text-slate-50 text-center rounded-xl text-xs">{{ contact.noReadCount }}</span>
                    <span
                        :class="chatter === contact._id ? 'text-blue-500' : 'text-slate-500 hover:text-blue-300 dark:text-slate-300'">{{
                        contact.name }}</span>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script setup>
import { ref, onMounted, watch, getCurrentInstance } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Avatar from '@/components/common/Avatar.vue'
const { proxy } = getCurrentInstance();
const props = defineProps({
    fold: {
        type: Boolean,
        default: true
    },
    contacts: {
        type: Array,
        default: () => {
            return []
        }
    }
})
const foldState = ref(true);
const chatter = ref('');
// const contacts = ref([]);
const emits = defineEmits(['toggleFold', 'menuChange']);
const doFold = () => {
    foldState.value = true;
    emits('toggleFold', true);
}
const chatTo = (contact) => {
    chatter.value = contact._id;
    emits('chatTo', contact)
}
watch(() => props.fold, (value, oldValue) => {
    foldState.value = value
}, { immediate: true })
</script>


<style lang='scss' scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>