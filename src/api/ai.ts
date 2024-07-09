import axios from "axios";

// 百度千帆
export const getQianFanAiChart = (messages, question)=>{
    return axios.post("/ai/getQianFanAiChart", {messages, question}).then((res) => {
        if (res.data && res.data.success) {
            return res.data.data && res.data.data.result;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}
// 阿里通义
export const getTongYiAiChart = (messages, question)=>{
    return axios.post("/ai/getTongYiAiChart", {messages, question}).then((res) => {
        if (res?.data?.success) {
            return res?.data?.data?.output?.text;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}
//有道智云
export const getYouDaoAiTranslate = (params)=>{
    return axios.post("/ai/getYouDaoAiTranslate", params).then((res) => {
        if (res.data && res.data.success) {
            return res.data.data && res.data.data;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}
//有道词典
export const getYouDaoAiDict = (params)=>{
    return axios.post("/ai/getYouDaoAiDict", params).then((res) => {
        if (res.data && res.data.success) {
            return res.data.data && res.data.data;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}
//月之暗面
export const getMoonshotAiChart = (messages, question)=>{
    return axios.post("/ai/getMoonshotAiChart", {messages, question}).then((res) => {
        if (res?.data?.success) {
            return res?.data?.data;
        } else {
            return Promise.reject(res?.data?.message);
        }
    });
}
export const getAiChat = (id, mode, question)=>{
    return axios.post("/ai/getAiChat", {id, mode, question}).then((res) => {
        if (res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}