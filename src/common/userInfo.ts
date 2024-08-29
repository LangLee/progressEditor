import {ref} from 'vue';
import { download } from '@/api/file';
// import User from '@/types/user.ts'
//{_id: '', name: '', avatar: '',mobile: '', email: ''}
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
const _avatarCache = {};
const getAvatarCache = (avatar)=>{
    if(_avatarCache[avatar] == undefined) {
        _avatarCache[avatar] = download(avatar).then((data)=>{
            _avatarCache[avatar] = data || '';
            return data;
        }).catch(()=>{
            _avatarCache[avatar] = '';
            return '';
        });
    };
    return _avatarCache[avatar];
}
export {
    useUserInfo,
    setUserInfo,
    getUserInfo,
    getUserId,
    getAvatarCache
}