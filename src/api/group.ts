import axios from "axios";
import Group from "@/types/group"
const getPortalAndBooks = () => {
    return axios.get("/groups/getPortalAndBooks").then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const getGroupAndBooks = (defaultGroup) => {
    return axios.get("/groups/getAppGroupAndBooks", {params: {defaultGroup}}).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const createGroup = (params: Group) => {
    return axios.post("/groups/createGroup", params).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const updateGroup = (params: Group) => {
    return axios.post("/groups/updateGroup", params).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const removeGroup = (id: string) => {
    return axios.post("/groups/removeGroup", { id }).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
export {
    getPortalAndBooks,
    getGroupAndBooks,
    createGroup,
    updateGroup,
    removeGroup
}