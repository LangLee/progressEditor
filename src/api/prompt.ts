import message from "@/components/feedback/message";
import axios from "axios";
const getPrompts = () => {
    return axios.get("/prompt/getPrompts").then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const createPrompt = (params) => {
    return axios.post("/prompt/createPrompt", params).then((res) => {
        if (res && res.data && res.data.success) {
            if (res.data.message) {
                message.success(res.data.message);
            }
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const updatePrompt = (params) => {
    return axios.post("/prompt/updatePrompt", params).then((res) => {
        if (res && res.data && res.data.success) {
            if (res.data.message) {
                message.success(res.data.message);
            }
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const removePrompt = (id) => {
    return axios.post("/prompt/removePrompt", {params: {id: id}}).then((res) => {
        if (res && res.data && res.data.success) {
            if (res.data.message) {
                message.success(res.data.message);
            }
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
} 
export {
    getPrompts,
    createPrompt,
    updatePrompt,
    removePrompt
}