<template>
    <div class="absolute w-full h-full max-h-screen top-0 left-0 flex justify-center items-center opacity-60 z-[100]">
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
    height: 2rem;
    margin: 0 auto;
}
.loading span {
    display: inline-block;
    width: 0.25rem;
    height: 100%;
    border-radius: 0.1rem;
    margin: 0 0.1rem;
    background: rgb(219 234 254);
    animation: load 1s ease infinite;
}
@keyframes load {
    0%,
    100% {
        height: 2rem;
        margin: 0 0.1rem;
        background-color: rgb(219 234 254);
    }

    20% {
        height: 0.5rem;
        margin: 0.75rem 0.1rem;
        background-color: rgb(147 197 253);
    }
    40% {
        height: 1rem;
        margin: 0.5rem 0.1rem;
        background-color: rgb(59 130 246);
    }
    80% {
        height: 1.5rem;
        margin: 0.25rem 0.1rem;
        background-color: rgb(29 78 216);
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