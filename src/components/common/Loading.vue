<template>
    <div class="absolute w-full h-full top-0 left-0 flex justify-center items-center z-[100]">
        <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

</script>


<style lang='scss' scoped>
.loading {
    width: 100px;
    height: 100px;
    margin: 0 auto;
}
.loading span {
    display: inline-block;
    width: 8px;
    height: 100%;
    border-radius: 4px;
    margin: 0 4px;
    background: rgb(233 213 255);
    animation: load 1s ease infinite;
}
@keyframes load {
    0%,
    100% {
        height: 100px;
        margin: 0 4px;
        background-color: rgb(233 213 255);
    }

    20% {
        height: 20px;
        margin: 40px 4px;
        background-color: rgb(192 132 252);
    }
    50% {
        height: 50px;
        margin: 25px 4px;
        background-color: rgb(147 51 234);
    }
    80% {
        height: 80px;
        margin: 10px 4px;
        background-color: rgb(107 33 168);
    }
}

.loading span:nth-child(2) {
    animation-delay: 0.2s;
}

.loading span:nth-child(3) {
    animation-delay: 0.4s;
}

.loading span:nth-child(4) {
    animation-delay: 0.6s;
}

.loading span:nth-child(5) {
    animation-delay: 0.8s;
}
</style>