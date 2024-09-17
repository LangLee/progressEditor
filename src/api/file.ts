import axios from "axios";
const getFiles = ()=>{
    return axios.get("/file/getFiles").then(res=>{
        if (res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data.message);
        }
    })
}
const upload = (file) => {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post("/file/upload", formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    ).then((res) => {
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
            return true;
        } else {
            return Promise.reject(res.data.message);
        }
    })
}
export {
    getFiles,
    upload,
    download,
    remove
}