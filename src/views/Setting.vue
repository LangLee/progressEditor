<template>
    <div class="h-screen w-full flex flex-col overflow-y-auto">
        <Header :hiddenFold="true"></Header>
        <div class="flex-1 flex flex-wrap justify-start bg-gray-300/20">
            <div class="flex flex-col w-full items-center max-w-screen-sm mx-auto bg-white p-8 lg:px-16">
                <AvatarUploader :upload="uploader" :img="imgUrl" @remove="remove" />
                <ProInput class="" name="name" label="用户名称" v-model="user.name" placeholder="请输入用户名称"></ProInput>
                <ProInput class="" name="email" label="邮箱" v-model="user.email" placeholder="请输入邮箱"></ProInput>
                <ProInput class="" name="mobile" label="手机号码" v-model="user.mobile" placeholder="请输入手机号码"></ProInput>
                <button
                    class="w-full py-2 lg:py-3 my-2 lg:my-3 bg-blue-300 lg:text-lg text-white font-semibold rounded-md shadow-md hover:bg-blue-600"
                    @click="save">
                    保存
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import Header from '@/components/navigation/Header.vue'
import ProInput from '@/components/entry/ProInput.vue'
// import Switch from '@/components/common/Switch.vue'
import AvatarUploader from '@/components/common/AvatarUploader.vue'
// import { upload, remove } from '@/api/file'
import { getUserInfo, setUserInfo } from '@/common/userInfo'
import { baseUrl } from '@/api/globalConfig'
import { updateUser } from '@/api/user.ts'
import { uploadAvatar, removeAvatar, getLoginUser } from '@/api/user.ts'
const user = ref(getUserInfo() || {});
const imgUrl = computed(() => {
    if (user.value && user.value.avatar) {
        return `${baseUrl}/file/preview?file=${user.value.avatar}`
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
const save = () => {
    updateUser(user.value).then((data) => {
        if (data) {
            setUserInfo(data);
        }
    });
}
onMounted(() => {
    if (!user.value || !user.value._id) {
        getLoginUser().then((data) => {
            setUserInfo(data);
            user.value = data;
        })
    }
})
</script>
<style lang='scss' scoped></style>