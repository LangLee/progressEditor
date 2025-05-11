<template>
    <div class="w-full flex flex-col items-center justify-center relative">
        <div v-if="expire" class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-slate-50/90">
            <RemixIcon class="text-5xl" name="refresh-line" @click="refreshQRCode"/>
        </div>
        <img v-if="qrCode" class="w-full h-full" :src="qrCode" alt="小程序码">
        <div v-else class="relative w-full min-h-56">
            <Loading></Loading>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getQRCode, checkLogin } from '@/api/user'
import { setUserInfo } from '@/common/userInfo'
import Loading from '@/components/common/Loading.vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
const qrCode = ref('');
const expire = ref(false);
let scene = '';
let timer = null;
const refreshQRCode = () => {
    getQRCode().then(data => {
        let {scene: sceneTag, image} = data || {};
        qrCode.value = image;
        scene=sceneTag;
        expire.value = false;
        setTimeout(() => {
            expire.value = true;
            clearInterval(timer);
        }, 1000 * 60 * 2)
    })
}
onMounted(() => {
    refreshQRCode();
    timer = setInterval(() => {
        if (scene) {
            checkLogin(scene).then((data) => {
                let {token, user} = data || {};
                if (token) {
                    localStorage.setItem('me_token', token);
                    // 缓存个人信息
                    setUserInfo(user);
                    clearInterval(timer);
                    window.location.href = '/home';
                }
            }).catch((err) => {
                console.log(err);
                clearInterval(timer);
            })
        }
    }, 1500)
})
</script>

<style lang='scss'>
.blink {
    animation: blink .8s step-end infinite;
}
</style>