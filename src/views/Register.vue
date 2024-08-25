<template>
    <div class="h-screen flex flex-col items-center justify-center lg:bg-slate-300/20 p-4">
        <div class="w-full lg:w-96 flex flex-col bg-white p-8 rounded-md lg:shadow-md">
            <div
            class="flex h-12 justify-center items-center font-sans font-medium lg:font-semibold text-2xl lg:text-3xl leading-12 text-slate-500 mt-2">
            <Fish />
            <p>Progress</p>
        </div>
            <input class="px-4 py-2 lg:py-3 my-2 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="text" v-model="name" placeholder="输入用户名" />
            <!-- <input class="px-4 py-2 lg:py-3 my-2 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="text" v-model="mobile" placeholder="输入手机号" /> -->
            <input class="px-4 py-2 lg:py-3 my-2 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="text" v-model="email" placeholder="输入邮箱" />
            <input class="px-4 py-2 lg:py-3 my-2 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="password" v-model="password" placeholder="输入大于6位密码">
            <input class="px-4 py-2 lg:py-3 my-2 bg-white text-slate-600 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent" type="password" v-model="checkPassword" placeholder="再次输入大于6位密码">
            <span class="text-red-400 text-sm">{{ errorMessage }}</span>
            <button class="py-2 lg:py-3 px-4 my-2 bg-slate-400 text-white font-semibold rounded-md shadow-md hover:bg-slate-700"
                @click="onRegister">注册</button>
        </div>
    </div>

</template>
<script setup>
import { ref } from 'vue'
import md5 from 'md5'
import { login, register } from '@/api/user'
import { useRouter } from 'vue-router'
import message from '@/components/feedback/message'
import Fish from '@/components/animation/Fish.vue'
const name = ref('');
const mobile = ref('');
const email = ref('');
const password = ref('');
const checkPassword = ref('');
const errorMessage = ref('');
const router = useRouter();
const validate = ()=>{
    let message = "";
    let success = true;
    if (!password.value) {
        message = "请输入密码"
        success = false
    } else if (password.value.length < 6) {
        message = "请输入至少6位的密码"
        success = false
    } else if (password.value !== checkPassword.value) {
        message = "两次输入密码不同"
        success = false
    }
    return {message, success};
}
const onRegister = () => {
    let res = validate();
    if (!res.success) {
        errorMessage.value = res.message;
        console.log(errorMessage)
        return;
    }
    console.log(name.value, password.value, md5(password.value));
    register({ name: name.value, email: email.value, password: md5(password.value) }).then((result) => {
        console.log(result);
        if (result && result.data) {
            if (result.data.success) {
                result.data.message && message.success(result.data.message);
                router.push('login')
            } else {
                console.log('注册失败');
                result.data.message && message.error(result.data.message);
            }
        } else {
            console.log('注册失败');
            message.error('注册失败');
        }
    })
}
</script>

<style lang='scss' scoped>
</style>