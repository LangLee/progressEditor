<template>
    <div class="w-full flex flex-col items-center justify-center">
        <div
            class="flex h-12 justify-center items-center font-sans font-medium lg:font-semibold text-2xl lg:text-3xl leading-12 text-slate-500 mt-2">
            <Fish />
            <p>Progress</p>
        </div>
        <ProInput name="name" v-model="name" placeholder="请输入用户名"/>
        <ProInput type="password" name="password" v-model="password" placeholder="请输入密码"/>
        <div class="w-full flex flex-row justify-between my-2 lg:my-3">
            <button
                class="w-1/2 py-2 lg:py-3 mr-2 bg-blue-300 lg:text-lg text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
                @click="onLogin">登录</button>
            <button
                class="w-1/2 py-2 lg:py-3 ml-2 bg-red-300 lg:text-lg text-white font-semibold rounded-md shadow-md hover:bg-red-600"
                @click="onRegister">注册</button>
        </div>
        <UserPrivacy v-model="privacy" />
    </div>
</template>
<script setup>
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import md5 from 'md5'
import { login, register, getQRCode } from '@/api/user'
import { useRouter } from 'vue-router'
import message from '@/components/feedback/message'
import Stars from '@/common/starts'
import { setUserInfo } from '@/common/userInfo'
import Fish from '@/components/animation/Fish.vue'
import ProInput from '@/components/entry/ProInput.vue'
import UserPrivacy from './UserPrivacy.vue'
const name = ref('');
const password = ref('');
const router = useRouter();
let starsInstance = null;
const privacy = ref(false);
const onLogin = () => {
    if (!privacy.value) {
        message.error('请先阅读并同意隐私协议');
        return;
    }
    console.log(name.value, password.value, md5(password.value));
    login({ name: name.value, password: md5(password.value) }).then((result) => {
        console.log(result);
        if (result && result.data) {
            if (result.data.success) {
                let { token, user } = result.data.data;
                if (token) {
                    localStorage.setItem('me_token', token);
                    // 缓存个人信息
                    setUserInfo(user);
                    router.push("/home");
                } else {
                    result.data.message && message.error(result.data.message);
                }
            } else {
                console.log('登录失败');
                result.data.message && message.error(result.data.message);
            }
        } else {
            result.data.message && message.error('登录失败');
        }
    })
}
const onRegister = () => {
    router.push('register');
}
</script>


<style lang='scss'>
.blink {
    animation: blink .8s step-end infinite;
}
</style>