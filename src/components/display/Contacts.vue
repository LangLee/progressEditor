<template>
    <div class="flex flex-col fixed top-16 bottom-0 backdrop-blur overflow-y-auto z-20 bg-black/20 lg:bg-transparent w-full lg:w-80 pr-24 lg:pr-0 transition-transform duration-300 ease-out delay-100 lg:translate-x-0"
        :class="foldState ? 'translate-x-[-100%]' : 'translate-x-0'" @click.stop="doFold">
        <nav class="flex-1 p-2 sm:p-3 xl:p-5 pb-10 lg:pb-14 bg-white/95 lg:bg-transparent">
            <ul>
                <li v-for="(contact, index) in contacts" :key="contact._id" @click="chatTo(contact._id)" class="cursor-pointer">
                    <Avatar size="sm" />
                    <span
                        :class="chatter === contact._id ? 'text-blue-500 font-bold' : 'text-slate-500 hover:text-blue-300'">{{
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
const chatTo = (userId) => {
    chatter.value = userId;
    emits('chatTo', userId)
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