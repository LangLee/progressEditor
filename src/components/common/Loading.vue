<template>
    <div class="absolute w-full h-full top-0 left-0 flex justify-center items-center bg-slate-50 opacity-60 z-[100]">
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
    // width: 6rem;
    height: 4rem;
    margin: 0 auto;
}
.loading span {
    display: inline-block;
    width: 0.5rem;
    height: 100%;
    border-radius: 0.25rem;
    margin: 0 0.25rem;
    background: rgb(233 213 255);
    animation: load 1s ease infinite;
}
@keyframes load {
    0%,
    100% {
        height: 4rem;
        margin: 0 0.25rem;
        background-color: rgb(233 213 255);
    }

    20% {
        height: 1rem;
        margin: 1.5rem 0.25rem;
        background-color: rgb(192 132 252);
    }
    40% {
        height: 2rem;
        margin: 1rem 0.25rem;
        background-color: rgb(147 51 234);
    }
    80% {
        height: 3rem;
        margin: 0.5rem 0.25rem;
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