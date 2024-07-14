import {ref} from 'vue';
// import User from '@/types/user.ts'
const _userInfo = ref();
const setUserInfo = (info)=>{
    _userInfo.value = info;
}
const getUserInfo = ()=>{
    return _userInfo.value;
}
const getUserId = ()=>{
    return _userInfo.value?._id;
}
const useUserInfo = ()=>{
    return _userInfo;
}
export {
    useUserInfo,
    setUserInfo,
    getUserInfo,
    getUserId
}