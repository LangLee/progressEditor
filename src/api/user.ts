import axios from "axios";
const login = (params: Object) => {
    return axios.post("/users/login", params);
}
const register = (params: Object) => {
    return axios.post("/users/register", params);
}
const getLoginUser = ()=>{
    return axios.get("/users/getLoginUser").then((res)=>{
        if (res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data.message);
        }
    });
}
const getContactList = ()=>{
    return axios.get("/users/getContactList").then(res=>{
        if (res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data.message);
        }
    })
}
const updateUser = (data)=>{
    return axios.post("/users/update", data).then(res=>{
        if (res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data.message);
        }
    })
}
const uploadAvatar = (userId, avatar) => {
    let formData = new FormData();
    formData.append("userId", userId);
    formData.append("avatar", avatar);
    return axios.post("/users/uploadAvatar", formData, {headers: {
        'Content-Type': 'multipart/form-data',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(file.name)}`
    }}).then(res=>{
        if (res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data.message);
        }
    })
}
const removeAvatar = (user) => {
    return axios.post("/users/removeAvatar", user).then(res=>{
        if (res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data.message);
        }
    })
}
export {
    login,
    register,
    getLoginUser,
    getContactList,
    updateUser,
    uploadAvatar,
    removeAvatar
}