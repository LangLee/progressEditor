<template>
    <div id="header"
        class="sticky h-16 top-0 z-20 w-full max-w-screen-2xl mx-auto backdrop-blur lg:border-b dark:border-b lg:border-slate-900/10 bg-white/90 lg:bg-white/60 dark:border-slate-50/20 dark:bg-transparent flex-none flex lg:shadow-none shadow-lg">
        <div
            class="hidden lg:flex flex-none pl-4 sm:pl-6 xl:pl-8 items-center border-b border-gray-200 lg:border-b-0 lg:w-60 xl:w-72">
            <div class="font-semibold text-3xl text-slate-500 dark:text-slate-300 cursor-pointer" @click="goHome">I Want progress</div>
        </div>
        <div class="flex items-center px-2 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8">
            <RemixIcon v-if="!hiddenFold" :name="fold ? 'menu-fold-line' : 'menu-unfold-line'"
                class="lg:hidden py-1 px-2 text-2xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300" @click="toggleFold">
            </RemixIcon>
            <RemixIcon name="home-8-line" class="lg:hidden py-1 px-2 text-2xl text-blue-500 hover:text-blue-700 dark:text-slate-300 dark:hover:text-slate-50"
                @click="goHome">
            </RemixIcon>
            <slot></slot>
        </div>
        <div class="flex-auto flex items-center justify-end pr-4 dark:text-slate-50">
            <RemixIcon :name="dark?'moon-fill':'sun-fill'" class="text-2xl cursor-pointer mr-2" @click="toggleDark"/>
            <tippy trigger="mouseenter click" placement="bottom-end" :offset="[10, 0]" animation="scale" :interactive="true" :appendTo="appendToBody">
                <Avatar class="cursor-pointer mr-2" size="sm" :img="userAvatar"></Avatar>
                <span class="text-sm font-bold cursor-pointer">{{ user && user.name }}</span>
                <template #content>
                    <div class="min-w-20 lg:min-w-24 bg-white dark:bg-neutral-800 shadow-xl border border-slate-100 dark:border-slate-50/20 rounded text-center text-slate-500 dark:text-slate-50">
                        <ul>
                            <ol class="px-2 py-1 hover:bg-blue-400 hover:text-slate-50 rounded dark:border-b dark:border-slate-50/20 cursor-pointer"><a
                                    @click.stop="mine">我的</a></ol>
                            <ol class="px-2 py-1 hover:bg-blue-400 hover:text-slate-50 rounded cursor-pointer"><a
                                    @click.stop="exit">退出</a></ol>
                        </ul>
                    </div>
                </template>
            </tippy>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, defineEmits, onBeforeMount, computed } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue';
import { useRouter } from 'vue-router';
import Avatar from '@/components/common/Avatar.vue';
import { useUserInfo, getUserInfo, setUserInfo } from '@/common/userInfo'
import { getLoginUser } from '@/api/user'
import {baseUrl} from '@/api/globalConfig'
const appendToBody = () => document.body;
const user = useUserInfo();
const userAvatar = computed(() => {
    return user.value && user.value.avatar?`${baseUrl}/file/download?file=${user.value.avatar}`: '';
})
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
const dark = ref(localStorage.theme === 'dark');
const emits = defineEmits(['toggleFold']);
const goHome = () => {
    router.push('/home')
}
const toggleFold = () => {
    emits("toggleFold");
}
const exit = () => {
    localStorage.removeItem('me_token');
    router.push('/login');
}
const mine = () => {
    router.push('/setting');
}
const toggleDark = ()=>{
    if (dark.value) {
        localStorage.theme = 'light';
        document.documentElement.classList.remove('dark')
    } else {
        localStorage.theme = 'dark';
        document.documentElement.classList.add('dark')
    }
    dark.value = !dark.value;
}
onBeforeMount(() => {
    let userInfo = getUserInfo();
    if (!userInfo) {
        getLoginUser().then((data) => {
            user.value = data;
            setUserInfo(data);
        })
    } else {
        user.value = userInfo;
    }

})
</script>


<style lang='scss' scoped></style>