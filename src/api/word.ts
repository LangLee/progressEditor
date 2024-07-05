import message from "@/components/feedback/message";
import axios from "axios";
import Word from "@/types/word";
const getDailyEnglish = () => {
    return axios.get("/word/getDailyEnglish").then((res) => {
        if (res.data.success) {
            return res.data.data;
        } else if (res.data.message) {
            message.error(res.data.message);
        }
    })
}
const getWords = (newWord: boolean) => {
    return axios.get("/word/getWords", {params: {newWord}}).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
const createWord = (params: Word) => {
    return axios.post("/word/createWord", params).then((res) => {
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
const toggleNewWord = (id: string, newWord: boolean) => {
    return axios.post("/word/toggleNewWord", {id, newWord}).then((res) => {
        if (res && res.data && res.data.success) {
            res.data.message && message.success(res.data.message);
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
// 新华字典
const getXHZDWord = (word: string) => {
    return axios.get("/word/getXHZDWord", {params: {word}}).then((res) => {
        if (res && res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res && res.data && res.data.message);
        }
    });
}
export {
    getDailyEnglish,
    getWords,
    createWord,
    toggleNewWord,
    getXHZDWord
}