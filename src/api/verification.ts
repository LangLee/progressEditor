import axios from "axios";
import message from '@/components/feedback/message';
const sign = (user) => {
    return axios.post("/verification/sign", {user}, {withCredentials:true}).then((res) => {
        if (res && res.data && res.data.success) {
            message.success(res.data.message);
            return true;
        } else {
            message.error(res.data.message);
            return false;
        }
    });
}
const verify = (code) => {
    return axios.post("/verification/verify", {code}, {withCredentials:true}).then((res) => {
        if (res && res.data && res.data.success) {
            message.success(res.data.message);
            return true;
        } else {
            message.error(res.data.message);
            return false;
        }
    });
}
const verifyAndUpdate = (user, code) => {
    return axios.post("/verification/verifyAndUpdate", {user, code}, {withCredentials:true}).then((res) => {
        if (res && res.data && res.data.success) {
            message.success(res.data.message);
            return res.data.data;
        } else {
            message.error(res.data.message);
            return false;
        }
    });
}

const verifyAndUpdatePassword = (user, code) => {
    return axios.post("/verification/verifyAndUpdatePassword", {user, code}, {withCredentials:true}).then((res) => {
        if (res && res.data && res.data.success) {
            message.success(res.data.message);
            return true;
        } else {
            message.error(res.data.message);
            return false;
        }
    });
}

export {sign, verify, verifyAndUpdate, verifyAndUpdatePassword}