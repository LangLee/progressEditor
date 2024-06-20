import axios from "axios";

export const getQianfanAiChart = (messages)=>{
    return axios.post("/ai/getQianfanAiChart", {messages}).then((res) => {
        if (res.data && res.data.success) {
            return res.data.data && res.data.data.result;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}