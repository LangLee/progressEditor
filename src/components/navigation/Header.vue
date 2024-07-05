<template>
    <div id="header" class="sticky h-16 top-0 z-20 w-full max-w-screen-2xl mx-auto backdrop-blur lg:border-b border-slate-900/10 bg-white/90 lg:bg-white/60 flex-none flex lg:shadow-none shadow-lg">
        <div
            class="hidden lg:flex flex-none pl-4 sm:pl-6 xl:pl-8 items-center border-b border-gray-200 lg:border-b-0 lg:w-60 xl:w-72">
            <div class="font-semibold text-3xl text-slate-500 cursor-pointer" @click="goHome">I Want progress</div>
        </div>
        <div class="flex items-center px-2 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
            <RemixIcon v-if="!hiddenFold" :name="fold?'menu-fold-line':'menu-unfold-line'" class="lg:hidden py-1 px-2 text-2xl text-slate-500 hover:text-slate-700"
                @click="toggleFold">
            </RemixIcon>
            <RemixIcon name="home-8-line" class="lg:hidden py-1 px-2 text-2xl text-blue-500 hover:text-blue-700"
                @click="goHome">
            </RemixIcon>
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineEmits } from 'vue'
import RemixIcon from '../common/RemixIcon.vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
    hiddenFold: {
        type: Boolean,
        default: false
    },
    fold: {
        type: Boolean,
        default: true
    }
})
const emits = defineEmits(['toggleFold']);
const goHome = () => {
    router.push('/home')
}
const toggleFold = () => {
    emits("toggleFold");
}
</script>


<style lang='scss' scoped></style>