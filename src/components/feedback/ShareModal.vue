<template>
    <Modal title="发布" ok-text="发布" :width="96" v-model:visible="visibleState" @confirm="confirm" @cancel="cancel">
        <div class="flex items-center my-2">
            <label class="inline-block mb-2 w-24 text-gray-500 dark:text-gray-400">封面</label>
            <label for="cover" class="cursor-pointer relative inline-block w-32 h-32 overflow-hidden bg-gray-200">
                <RemixIcon v-if="coverPreview" name="close-line" class="text-2xl text-gray-300 hover:text-gray-500 absolute top-0 right-0" />
                <img v-if="coverPreview" :src="coverPreview" class="w-full h-full object-cover" />
                <RemixIcon v-else name="image-2-line"
                    class="text-[4rem] text-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <input type="file" id="cover" class="hidden" accept="image/*" @change="onFileChange"
                    accept-charset="utf-8" />
            </label>
        </div>
        <div class="my-2">
            <ProTextarea label="简介" v-model="description" placeholder="请输入简介" class="w-full" />
        </div>
    </Modal>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import Modal from './Modal.vue'
import Book from "@/types/book";
import { updateBook } from "@/api/book";
import { upload } from "@/api/file";
import { baseUrl } from '@/api/globalConfig';
import RemixIcon from "@/components/common/RemixIcon.vue";
import ProTextarea from '@/components/entry/ProTextarea.vue';
import message from '@/components/feedback/message';
const props = defineProps<{
    book: Book;
    visible: boolean;
}>();

const emits = defineEmits(['confirm', 'cancel']);
const description = ref('');
const image = ref('');

const coverPreview = computed(() => {
    if (image.value) {
        return `${baseUrl}/file/preview?file=${image.value}&thumbnail=true`
    }
});
const onFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        upload(target.files[0]).then((file) => {
            if (file) {
                // 处理上传后的文件路径
                image.value = file;
                message.success('封面上传成功');
            }
        })
    }
};
const visibleState = ref(props.visible)
const confirm = () => {
    const updatedBook: Book = {
        ...props.book,
        share: true,
        description: description.value,
        image: image.value // 处理封面上传后的路径
    };
    updateBook(updatedBook).then(() => {
        message.success('发布成功');
        emits('confirm')
        visibleState.value = false;
    })
}
const cancel = () => {
    emits('cancel')
    visibleState.value = false;
}
watch(() => props.visible, () => {
    visibleState.value = props.visible
})
watch(() => props.book, () => {
    description.value = props.book.description || ' ';
    image.value = props.book.image || '';
})
</script>