<template>
    <div class="h-screen">
        <Header :hiddenFold="true"></Header>
        <div class="p-4">
            <AvatarUploader :upload="uploader" :img="imgUrl" @remove="remove"/>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed } from 'vue'
import Header from '@/components/navigation/Header.vue'
// import Switch from '@/components/common/Switch.vue'
import AvatarUploader from '@/components/common/AvatarUploader.vue'
// import { upload, remove } from '@/api/file'
import { useUserInfo, setUserInfo } from '@/common/userInfo'
import { baseUrl } from '@/api/globalConfig'
import { updateUser } from '@/api/user.ts'
import {uploadAvatar, removeAvatar} from '@/api/user.ts'
const user = useUserInfo();
const imgUrl = computed(() => {
    if (user.value && user.value.avatar) {
        return `${baseUrl}/file/download?file=${user.value.avatar}`
    }
})
const uploader = (file) => {
    // const formData = new FormData();
    // formData.append('file', file);
    // return upload(formData).then((file) => {
    //     if (file) {
    //         let { filename } = file || {};
    //         user.value.avatar = filename;
    //         return updateUser(user.value)
    //     }
    // });
    return uploadAvatar(user.value._id, file).then((data) => {
        if (data) {
            user.value = data;
            setUserInfo(data)
        }
    });
}
const remove = () => {
    // return remove(user.value.avatar).then(() => {
    //     user.value.avatar = '';
    //     updateUser(user.value);
    // });
    return removeAvatar(user.value).then((data) => {
        if (data) {
            user.value = data;
            setUserInfo(data)
        }
    })
}
</script>
<style lang='scss' scoped></style>