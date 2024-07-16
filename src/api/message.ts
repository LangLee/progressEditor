import axios from "axios";
const getContactMessages = (contact) => {
    return axios.get("/message/getContactMessages", {params: {contact}}).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const updateContactMessageStatus = (from, to, status) => {
    return axios.post("/message/updateContactMessageStatus", {from, to, status}).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
export {getContactMessages, updateContactMessageStatus}