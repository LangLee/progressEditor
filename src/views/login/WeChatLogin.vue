<template>
    <div class="w-full flex flex-col items-center justify-center">
        <img v-if="qrCode" class="w-full h-full" :src="qrCode" alt="小程序码">
        <div v-else class="relative w-full min-h-56">
            <Loading></Loading>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getQRCode } from '@/api/user'
import { setUserInfo } from '@/common/userInfo'
import Loading from '@/components/common/Loading.vue'
const qrCode = ref('');
onMounted(() => {
    getQRCode().then(data => {
        qrCode.value = data;
    })
})
</script>

<style lang='scss'>
.blink {
    animation: blink .8s step-end infinite;
}
</style>