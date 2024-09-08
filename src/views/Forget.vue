<template>
    <div class="h-screen flex flex-col items-center justify-center lg:bg-slate-300/20 p-2 lg:p-4">
        <div class="w-full lg:w-96 flex flex-col bg-white p-8 rounded-md lg:shadow-md">
            <div
                class="flex h-12 justify-center items-center font-sans font-medium lg:font-semibold text-2xl lg:text-3xl leading-12 text-slate-500 mt-2">
                <Fish />
                <p>Progress</p>
            </div>
            <!-- <ProInput class="my-3" name="name" v-model="name" placeholder="输入用户名" /> -->
            <ProInput class="my-2" name="email" v-model="email" placeholder="输入邮箱" />
            <div class="w-full my-2 flex flex-row justify-between">
                <ProInput :width="48" name="verification" v-model="verification" placeholder="输入验证码" />
                <button class="px-2 bg-slate-300 text-white font-semibold rounded-md hover:bg-slate-600"
                    @click.stop="onSign">{{ verifying ? '重新发送' : '发送验证码' }}</button>
            </div>
            <ProInput class="my-2" type="password" name="password" v-model="password" placeholder="输入大于6位密码" />
            <ProInput class="my-2" type="password" name="checkPassword" v-model="checkPassword" placeholder="再次输入大于6位密码" />
            <span class="text-red-400 text-sm">{{ errorMessage }}</span>
            <button
                class="py-2 lg:py-3 px-4 my-2 bg-slate-400 text-white font-semibold rounded-md shadow-md hover:bg-slate-700"
                @click="onChangePassword">修改密码</button>
        </div>
    </div>

</template>
<script setup>
import { ref } from 'vue'
import md5 from 'md5'
import { login } from '@/api/user'
import { useRouter } from 'vue-router'
import message from '@/components/feedback/message'
import Fish from '@/components/animation/Fish.vue'
import ProInput from '@/components/entry/ProInput.vue'
import { sign, verifyAndUpdatePassword } from '@/api/verification'
const name = ref('');
const mobile = ref('');
const email = ref('');
const password = ref('');
const checkPassword = ref('');
const errorMessage = ref('');
const router = useRouter();
const verification = ref('');
const verifying = ref(false);
const validate = () => {
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
    return { message, success };
}
const onChangePassword = () => {
    let res = validate();
    if (!res.success) {
        errorMessage.value = res.message;
        console.log(errorMessage)
        return;
    }
    verifyAndUpdatePassword({ email: email.value, password: md5(password.value) }, verification.value).then((result) => {
        if (result) {
            router.push('login')
        } else {
            console.log('更新失败');
        }
    })
}
const onSign = () => {
    sign({ email: email.value }).then((res) => {
        if (res) {
            verifying.value = true;
        }
    })
}
</script>

<style lang='scss' scoped></style>