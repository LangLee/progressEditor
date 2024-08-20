<template>
    <div class="fish-container relative w-full max-w-[20rem] min-h-[10rem] bg-sky-500 dark:bg-transparent dark:border-slate-300/20 dark:border rounded-lg overflow-hidden">
        <div class="fish absolute flex flex-row fish w-12 h-6">
            <div class="fish-head w-3 h-6 bg-purple-300">
                <div class="fish-eye w-2 h-2 bg-white rounded-full absolute top-1 left-1"></div>
                <div class="fish-eyeball w-1 h-1 bg-neutral-900 rounded-full absolute top-1 left-1"></div>
            </div>
            <div class="fish-body w-6 h-6 bg-blue-300"></div>
            <div class="fish-tail w-3 h-6 bg-red-300"></div>
            <div class="fish-shark w-5 h-5 bg-red-300"></div>
        </div>
        <div class="seaweed absolute w-2 h-20 bg-green-300 bottom-0 left-8"></div>
        <div class="seaweed absolute w-2 h-10 bg-green-400 bottom-0 left-28"></div>
        <div class="seaweed absolute w-2 h-28 bg-green-300 bottom-0 right-8"></div>
        <div class="stone absolute w-4 h-5 bg-gray-300 bottom-0 left-12"></div>
        <div class="stone absolute w-2 h-2 bg-white bottom-0 right-24"></div>
        <div class="stone absolute w-2 h-2 bg-white bottom-0 left-6"></div>
        <div class="stone absolute w-3 h-2 bg-white bottom-0 right-2"></div>
        <div class="stone absolute w-8 h-6 bg-gray-200 bottom-0 right-32"></div>
        <div class="stone absolute w-8 h-10 bg-gray-100 bottom-0 right-10 rotate-45"></div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'

const fishPosition = reactive({
    top: 8,
    right: 4
});

// 模拟鱼的移动
setInterval(() => {
    fishPosition.top -= 0.5;
    fishPosition.right += 0.5;
}, 50);
</script>

<style lang='scss' scoped>
.fish {
    animation: swim 4s infinite alternate ease-in-out;
    top: 8rem;
    right: 4rem;
}
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

.seaweed {
    transform-origin: bottom center;
    animation: sway 3s infinite ease-in-out;
}

.stone {
  border-radius: 50%;
//   clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

@keyframes swim {
    0% {
        top: 8rem;
        right: 4rem;
    }
    20% {
        top: 6rem;
        right: 6rem;
    }
    40% {
        top: 4rem;
        right: 8rem;
    }
    60% {
        top: 6rem;
        right: 12rem;
    }
    80% {
        top: 4rem;
        right: 14rem;
    }
    100% {
        top: 2rem;
        right: 16rem;
    }
}

@keyframes tailWag {
    0% {
        clip-path: polygon(0% 50%, 70% 0%, 100% 60%);
    };
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
    0%, 100% {
        transform: rotate(0deg) translate(-180%, 18%);
    }
    50% {
        transform: rotate(-10deg) translate(-180%, 18%);
    }
}
@keyframes sway {
    0%, 100% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(10deg);
    }
}
</style>