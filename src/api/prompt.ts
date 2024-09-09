import message from "@/components/feedback/message";
import axios from "axios";
const getPrompts = () => {
    return axios.get("/prompt/getPrompts").then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            message.error(res && res.data && res.data.message);
            return false;
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
            message.error(res && res.data && res.data.message);
            return false;
        }
    });
}
const removePrompt = (id) => {
    return axios.post("/prompt/removePrompt", {id}).then((res) => {
        if (res && res.data && res.data.success) {
            if (res.data.message) {
                message.success(res.data.message);
            }
            return true;
        } else {
            message.error(res && res.data && res.data.message);
            return false;
        }
    });
} 
export {
    getPrompts,
    createPrompt,
    updatePrompt,
    removePrompt
}