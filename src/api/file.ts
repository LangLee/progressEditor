import axios from "axios";
const upload = (formData) => {
    return axios.post("/file/upload", formData, {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    }).then((res) => {
        if (res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data.message);
        }
    });
}
const download = (file: string) => {
    return axios.get("/file/download", { params: { file } }).then(res => {
        if (res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data.message);
        }
    })
}
const remove = (file: string) => {
    return axios.get("/file/delete", { params: { file } }).then(res => {
        if (res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data.message);
        }
    })
}
export {
    upload,
    download,
    remove
}