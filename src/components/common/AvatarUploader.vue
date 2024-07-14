<template>
    <div class="flex flex-col items-center justify-center">
        <label for="avatar"
            class="cursor-pointer relative inline-block w-32 h-32 rounded-full overflow-hidden bg-gray-200"
            :class="{ 'border-4 border-dashed border-blue-500': !avatarPreview }">
            <img v-if="avatarPreview" :src="avatarPreview" class="w-full h-full object-cover" />
            <svg v-else xmlns="http://www.w3.org/2000/svg"
                class="w-16 h-16 text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input type="file" id="avatar" class="hidden" accept="image/*" @change="onFileChange" accept-charset="utf-8"/>
        </label>
        <button v-if="avatarPreview" class="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            @click="removeAvatar">
            删除头像
        </button>
        <p class="mt-2 text-sm text-gray-500">
            {{ statusMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
const props = defineProps({
    img: {
        type: String,
        default: ''
    },
    upload: {
        type: Function,
        default: () => {
            return null;
        }
    }
});
const emits = defineEmits(['remove']);
const avatarPreview = ref();
const statusMessage = ref('');
const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
        statusMessage.value = '只允许上传jpeg/png格式的图片';
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        statusMessage.value = '图片上传大小不能超过2MB';
        return;
    }
    if (props.upload) {
        let res = await props.upload(file);
        if (res) {
            const reader = new FileReader();
            reader.onload = (e) => {
                avatarPreview.value = e.target && e.target.result;
                statusMessage.value = '';
            };
            reader.readAsDataURL(file);
        }
    }
}
const removeAvatar = () => {
    avatarPreview.value = null;
    statusMessage.value = '';
    emits('remove');
}
watch(() => props.img, (newVal) => {
    if (newVal) {
        avatarPreview.value = newVal;
    }
}, {immediate: true})
</script>