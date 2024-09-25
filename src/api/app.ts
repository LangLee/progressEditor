import axios from "axios";
import App from "@/types/app";
import message from "@/components/feedback/message";

const getApps = (type, urlMatcher) => {
    return axios.get("/app/getApps", {params: {type, url: urlMatcher}}).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const createApp = (params: App) => {
    return axios.post("/app/createApp", params).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const updateApp = (params: App) => {
    return axios.post("/app/updateApp", params).then((res) => {
        if (res && res.data && res.data.success) {
            res.data.message && message.success(res.data.message);
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const publishApp = ({_id, published, publishAll = true}) => {
    return axios.post("/app/publishApp", {_id, published, publishAll}).then((res) => {
        if (res && res.data && res.data.success) {
            res.data.message && message.success(res.data.message);
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const removeApp = (id: string) => {
    return axios.post("/app/removeApp", { id }).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}

export {
    getApps,
    createApp,
    updateApp,
    removeApp,
    publishApp
}