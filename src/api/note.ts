import message from "@/components/feedback/message";
import axios from "axios";

const getOneNote = () => {
    return axios.get("/note/getOneNote").then((res) => {
        if (res.data.success) {
            return res.data.data;
        } else if (res.data.message) {
            message.error(res.data.message);
        }
    })
}
export {getOneNote}