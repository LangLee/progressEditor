<template>
    <div class="inline-block text-center leading-none bg-blue-300" :class="sizeClasses">
        <img v-if="imageBase64 || img" :src="imageBase64 || img" class="inline-block w-full h-full object-cover" :class="{'rounded-full': rounded}">
        <RemixIcon v-else class="text-white" :name="icon" :class="textClasses"></RemixIcon>
    </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import RemixIcon from '@/components/common/RemixIcon.vue'
import { getAvatarCache} from '@/common/userInfo.ts'

const props = defineProps({
    file: {
        type: String,
        default: ''
    },
    size: {
        type: String,
        default: 'md',
        validate: function (value) {
            return ['sm', 'md', 'lg'].indexOf(value) !== -1
        }
    },
    img: {
        type: String,
        default: ''
    },
    icon: {
        type: String,
        default: 'user-line'
    },
    rounded: {
        type: Boolean,
        default: true
    }
})
const imageBase64 = ref();
const sizeClasses = computed(() => {
    let classes = '';
    switch (props.size) {
        case 'sm':
            classes = 'w-6 h-6';
            break;
        case 'md':
            classes = 'w-8 h-8';
            break;
        case 'lg':
            classes = 'w-10 h-10';
            break;
    }
    if (props.rounded) {
        classes += ' rounded-full'
    }
    return classes;
})
const textClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'font-normal text-base'
        case 'md':
            return 'font-medium text-xl'
        case 'lg':
            return 'font-bold text-2xl'
    }
})
onMounted(async () => {
    if (props.file) {
        let base64 = getAvatarCache(props.file);
        if (base64 instanceof Promise) {
            imageBase64.value = await base64;
        } else {
            imageBase64.value = base64;
        }
    }
})
watch(() => props.file, async (newVal, oldVal) => {
    if (newVal) {
        let base64 = getAvatarCache(newVal);
        if (base64 instanceof Promise) {
            imageBase64.value = await base64;
        } else {
            imageBase64.value = base64;
        }
    }
})
</script>


<style lang='scss' scoped></style>