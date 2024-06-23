import axios from "axios";

// 百度千帆
export const getQianFanAiChart = (messages, question)=>{
    messages = [...messages, {role: 'user', content: question}]
    return axios.post("/ai/getQianFanAiChart", {messages}).then((res) => {
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
            return res.data.data && res.data.data[0];
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}
