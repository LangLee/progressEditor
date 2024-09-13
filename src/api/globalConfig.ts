import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL
let baseUrl = BASE_URL || window.location.origin;
let baseWebUrl = import.meta.env.VITE_WEB_URL || window.location.origin;
// import message from '@/components/feedback/message'
export default function initialize(route, logout: Function) {
    // 添加请求拦截器  
    axios.interceptors.request.use(function (config) {
        // 登录权限
        const Authorization = localStorage.getItem("me_token");
        config.headers['Authorization'] = Authorization;
        config.headers['appId'] = route.query.appId;
        // 或者你可以在这里打印出所有请求的详细信息  
        if (config.url && !new RegExp(/http|https/).test(config.url)) {
            config.url = baseUrl + config.url;
        }
        console.log('Starting request', config);
        return config;
    }, function (error) {
        // 对请求错误做些什么  
        console.log('Request error', error);
        return Promise.reject(error);
    });

    // 添加响应拦截器  
    axios.interceptors.response.use(function (response) {
        // 对响应数据做点什么  
        // 例如，你可以在这里检查响应状态码  
        if (response.status === 200) {
            // 你可以在这里打印出所有响应的详细信息  
            console.log('Successful response', response);
            return response;
        } else if (response.status === 401) {
            // 你可以在这里处理错误响应  
            logout();
            return Promise.reject(response);
        } else {
            return Promise.reject(response);
        }
    }, function (error) {
        // 对响应错误做点什么  
        if (error.response && error.response.status === 401) {
            logout();
        }
        // message.error(error.message);
        return Promise.reject(error);
    });
}
export {baseUrl, baseWebUrl}