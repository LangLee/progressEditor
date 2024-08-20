<template>
    <div class="relative fish flex flex-row fish w-12 h-6">
        <!-- <div class="fish-circle w-2 h-2 rounded-full border border-gray-300"></div> -->
        <div class="fish-head w-3 h-6 bg-purple-300">
            <div class="fish-eye w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
            <div class="fish-eyeball w-1 h-1 bg-neutral-900 rounded-full absolute top-1 left-1"></div>
        </div>
        <div class="fish-body w-6 h-6 bg-blue-300"></div>
        <div class="fish-tail w-3 h-6 bg-red-300"></div>
        <div class="fish-shark w-5 h-5 bg-red-300"></div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

</script>

<style lang='scss' scoped>
.fish {
    // animation: swim 4s infinite alternate ease-in-out;
    // top: 8rem;
    // right: 4rem;
}
// .fish-circle {
//     animation: floatUp 1s infinite alternate ease-in-out;
// }
.fish-head {
    clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
}

.fish-body {
    clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
}

.fish-tail {
    transform: translateX(-20%);
    clip-path: polygon(0% 50%, 100% 20%, 100% 80%);
    animation: tailWag 1s ease-in-out infinite;
}

.fish-shark {
    transform: translate(-180%, 18%);
    clip-path: polygon(20% 50%, 50% 0%, 100% 90%);
    animation: sharkWag 1s ease-in-out infinite;
}

@keyframes tailWag {
    0% {
        clip-path: polygon(0% 50%, 70% 0%, 100% 60%);
    }

    ;

    20% {
        clip-path: polygon(0% 50%, 80% 10%, 100% 70%);
    }

    50% {
        clip-path: polygon(0% 50%, 100% 20%, 100% 80%);
    }

    80% {
        clip-path: polygon(0% 50%, 100% 30%, 80% 90%);
    }

    100% {
        clip-path: polygon(0% 50%, 100% 40%, 70% 100%);
    }
}

@keyframes sharkWag {

    0%,
    100% {
        transform: rotate(0deg) translate(-180%, 18%);
    }

    50% {
        transform: rotate(-10deg) translate(-180%, 18%);
    }
}
@keyframes floatUp {
    0%,
    100% {
        transform: translate(0, 0);
    }

    50% {
        transform: translate(-100%, -100%);
    }
}
</style>