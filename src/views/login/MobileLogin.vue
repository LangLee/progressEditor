<template>
    <div class="w-full flex flex-col items-center justify-center">
        <div
            class="flex h-12 justify-center items-center font-sans font-medium lg:font-semibold text-2xl lg:text-3xl leading-12 text-slate-500 mt-2">
            <Fish />
            <p>Progress</p>
        </div>
        <ProInput name="mobile" v-model="password" placeholder="请输入手机号"/>
        <div class="w-full my-3 flex flex-row justify-between">
            <!-- <ProInput class="w-48" name="verification" v-model="verification" placeholder="请输入验证码"/> -->
            <input
            class="w-48 px-4 py-3 mr-2 bg-transparent text-slate-600 lg:text-lg placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
            type="text" v-model="verification" placeholder="输入验证码" />
            <button class="px-2 bg-slate-300 text-white font-semibold rounded-md hover:bg-slate-600">获取验证码</button>
        </div>
        <button class="w-full py-3 my-3 bg-blue-300 lg:text-lg text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
                @click="onLogin">登录</button>
        <UserPrivacy v-model="privacy"></UserPrivacy>
    </div>
</template>
<script setup>
import { ref, onBeforeMount, onBeforeUnmount, onMounted } from 'vue'
import md5 from 'md5'
import { login, getQRCode } from '@/api/user'
import { useRouter } from 'vue-router'
import message from '@/components/feedback/message'
import Stars from '@/common/starts'
import { setUserInfo } from '@/common/userInfo'
import Fish from '@/components/animation/Fish.vue'
import ProInput from '@/components/entry/ProInput.vue'
import UserPrivacy from './UserPrivacy.vue'
const mobile = ref('');
const verification = ref('');
const router = useRouter();
let starsInstance = null;
const privacy = ref(false);
const onLogin = () => {
    if (!privacy.value) {
        message.error('请先阅读并同意隐私协议');
        return;
    }
    console.log(mobile.value, verification.value);
    login({ mobile: mobile.value, verification: verification.value }).then((result) => {
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
</script>


<style lang='scss'>
.blink {
    animation: blink .8s step-end infinite;
}
</style>