<template>
    <div class="h-screen flex items-center justify-center">
        <div class="h-80 w-80 p-4 flex flex-col bg-transparent rounded-lg shadow-md">
            <span class="font-sans font-normal lg:font-semibold text-2xl lg:text-3xl leading-10 text-slate-500">
                I Want Progress
            </span>
            <input
                class="px-4 py-3 my-2 bg-transparent text-slate-300 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="text" v-model="name" placeholder="请输入用户名" />
            <input
                class="px-4 py-3 my-2 bg-transparent text-slate-300 placeholder-slate-300 shadow-sm border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                type="password" v-model="password" placeholder="请输入密码">
            <div class="flex flex-row justify-between my-2">
                <button
                    class="w-32 py-3 px-4 bg-blue-300 text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
                    @click="onLogin">登录</button>
                <button class="w-32 py-3 px-4 bg-red-300 text-white font-semibold rounded-md shadow-md hover:bg-red-600"
                    @click="onRegister">注册</button>
            </div>
            <!-- <div class="my-2 text-slate-300">
                <input id="remember" class="mr-4" type="checkbox" />
                <label for="remember">记住密码</label>
            </div> -->
        </div>
    </div>
</template>
<script setup>
import { ref, onBeforeMount, onBeforeUnmount } from 'vue'
import md5 from 'md5'
import { login, register } from '../api/user'
import { useRouter } from 'vue-router'
import message from '../components/feedback/message'
import Stars from '@/common/starts'
const name = ref('');
const password = ref('');
const router = useRouter();
let starsInstance = null;
const onLogin = () => {
    console.log(name.value, password.value, md5(password.value));
    login({ name: name.value, password: md5(password.value) }).then((result) => {
        console.log(result);
        if (result && result.data) {
            if (result.data.success) {
                let token = result.data.data;
                if (token) {
                    localStorage.setItem('me_token', token);
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
onBeforeMount(() => {
    starsInstance = new Stars({count: 50, background: 'rgb(41 37 36)'});
    starsInstance.animate();
})
onBeforeUnmount(() => {
    starsInstance.canvas.remove();
    starsInstance = null;
})
</script>


<style lang='scss'>
// .me-form-item {
//     height: 2rem;
//     line-height: 1.5;
//     font-size: 0.875rem;
// }

// .me-login {
//     display: flex;
//     width: 20rem;
//     height: 20rem;
//     flex-direction: column;
//     justify-content: center;
//     padding: 2rem;
//     input {
//         @extend .me-form-item;
//         border: 1px solid #e1e5eb;
//         margin-bottom: 0.5rem;
//         padding: 0 0.5rem;
//         color: #1a253b;
//     }

//     button {
//         @extend .me-form-item;
//         background-color: #1377eb;
//         font-size: 1rem;
//         color: #fff;
//         border: none;
//         border-radius: 0.25rem;
//         outline: none;
//         box-shadow: 0;
//     }
//     button:active {
//         box-shadow: 1;
//     }
// }</style>