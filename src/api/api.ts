import axios from "axios";

const getHotTop = (type: string) => {
    return axios.get("/api/hotTop", {params: {type}}).then((res) => {
        if (res.data.success) {
            return res.data.data;
        }
    })
}
export {getHotTop}