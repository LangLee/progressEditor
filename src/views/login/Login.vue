<template>
    <div class="h-screen flex flex-col items-center justify-center lg:bg-slate-300/20 p-4">
        <div class="w-full lg:w-96 flex flex-col bg-white p-4 lg:p-8 rounded-md lg:shadow-md">
            <AccountLogin v-if="loginMode === 1" />
            <MobileLogin v-else-if="loginMode === 2" />
            <WeChatLogin v-else-if="loginMode === 3" />
            <div class="w-full flex flex-row items-center text-slate-700 text-sm mt-4">
                <span class="login-more-wrap-left"></span>
                <span class="flex-1 text-center">其他登录方式</span>
                <span class="login-more-wrap-right"></span>
            </div>
            <div class="flex flex-row justify-between mt-4">
                <button class="h-8 rounded-full px-4 text-sm text-white bg-slate-500 hover:bg-slate-300"
                    @click="toggleMode()">
                    <RemixIcon class="text-white mr-1" :name="loginMode === 1 ? 'smartphone-line' : 'user-line'">
                    </RemixIcon>
                    <span>{{ loginMode === 1 ? LOGIN_MODE_MAP[2] : LOGIN_MODE_MAP[1] }}</span>
                </button>
                <button class="w-8 h-8 rounded-full text-2xl bg-green-600" @click="toggleMode(3)">
                    <RemixIcon class="text-white" name="wechat-fill"></RemixIcon>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup lang="jsx">
import { ref, onBeforeMount, onBeforeUnmount, onMounted, h } from 'vue'
import AccountLogin from '@/views/login/AccountLogin.vue'
import MobileLogin from '@/views/login/MobileLogin.vue'
import WeChatLogin from '@/views/login/WeChatLogin.vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import ProCheckbox from '@/components/entry/ProCheckbox.vue'
import modal from '@/components/feedback/modal.ts'
const LOGIN_MODE_MAP = {
    1: '账号登录',
    2: '免密登录',
    3: '微信登录'
}
const loginMode = ref(1)
const toggleMode = (mode) => {
    if (mode) {
        if (mode === 3) {
            modal.confirm({
                title: '登录确认',
                content: '微信登录默认同意用户隐私协议',
                onOk: () => {
                    loginMode.value = mode;
                }
            })
            return;
        }
        loginMode.value = mode;
    } else {
        loginMode.value = (loginMode.value === 1) ? 2 : 1;
    }
}
</script>


<style lang='scss'>
.blink {
    animation: blink .8s step-end infinite;
}

.login-more-wrap-right {
    height: 1px;
    width: 100px;
    background-image: linear-gradient(243deg, rgb(100 116 139), rgba(216, 218, 217, 0) 95%);
    border-radius: .5px;
    margin-bottom: 4px;
    transform: scaleX(-1);
}

.login-more-wrap-left {
    height: 1px;
    width: 100px;
    background-image: linear-gradient(243deg, rgb(100 116 139), rgba(216, 218, 217, 0) 95%);
    border-radius: .5px;
    margin-bottom: 4px;
}
</style>