import axios from "axios";
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { baseUrl } from '@/api/globalConfig'

// 百度千帆
export const getQianFanAiChart = (messages, question) => {
    return axios.post("/ai/getQianFanAiChart", { messages, question }).then((res) => {
        if (res.data && res.data.success) {
            return res.data.data && res.data.data.result;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}
// 阿里通义
export const getTongYiAiChart = (messages, question) => {
    return axios.post("/ai/getTongYiAiChart", { messages, question }).then((res) => {
        if (res?.data?.success) {
            return res?.data?.data?.output?.text;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}
//有道智云
export const getYouDaoAiTranslate = (params) => {
    return axios.post("/ai/getYouDaoAiTranslate", params).then((res) => {
        if (res.data && res.data.success) {
            return res.data.data && res.data.data;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}
//有道词典
export const getYouDaoAiDict = (params) => {
    return axios.post("/ai/getYouDaoAiDict", params).then((res) => {
        if (res.data && res.data.success) {
            return res.data.data && res.data.data;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}
//月之暗面
export const getMoonshotAiChart = (messages, question) => {
    return axios.post("/ai/getMoonshotAiChart", { messages, question }).then((res) => {
        if (res?.data?.success) {
            return res?.data?.data;
        } else {
            return Promise.reject(res?.data?.message);
        }
    });
}
export const getAiChat = (id, mode, question) => {
    return axios.post("/ai/getAiChat", { id, mode, question }).then((res) => {
        if (res.data && res.data.success) {
            return res.data.data;
        } else {
            return Promise.reject(res.data && res.data.message);
        }
    });
}
export const getAiChatStream = ({ appId, id, mode, question, autoSave }, onUpdate, onEnd) => {
    let ctrl = new AbortController();
    const Authorization = localStorage.getItem("me_token") || "";
    return fetchEventSource(`${baseUrl}/ai/getAiChatStream`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Authorization,
            "appId": appId
        },
        openWhenHidden: true,
        body: JSON.stringify({ id, mode, question, autoSave }),
        signal: ctrl?.signal,
        onmessage: (event) => {
            const data = event.data || ''
            if (data === '[DONE]') {
                onEnd();
                ctrl.abort()
                return;
            }

            const obj = JSON.parse(data) // 服务端每次 res.write 返回的信息
            if (obj.Done) {
                let id = obj.id;
                onEnd(id);
                ctrl.abort()
                return;
            }
            const content = obj.choices[0].delta.content
            if (content === null || content === undefined) {
                console.log('stop...')  // 可能因为其他原因停止
                onEnd();
                return;
            }
            onUpdate(content);
            console.log(content)
        },
        onclose() {
            console.log('close')
        },
        onerror(err) {
            ctrl.abort()
            throw err // 直接抛出错误，避免反复调用
        }
    })
}