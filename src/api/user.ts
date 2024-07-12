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
export {
    login,
    register,
    getLoginUser,
    getContactList
}