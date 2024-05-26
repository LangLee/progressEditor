import axios from "axios";
const login = (params: Object) => {
    return axios.post("/users/login", params);
}
const register = (params: Object) => {
    return axios.post("/users/register", params);
}
export {
    login,
    register
}