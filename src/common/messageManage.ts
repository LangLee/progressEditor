
import { ref } from 'vue';
import { getUserId, setUserInfo } from './userInfo';
import { getContactMessages, updateContactMessageStatus } from '@/api/message'
import { getContactList, getLoginUser } from '@/api/user'
const WS_URL = import.meta.env.VITE_API_BASE_WS
class MessageManage {
    sender: any = ref();
    recipient: string;
    contacts: any = ref([]);
    messages: any = ref([]);
    socket: WebSocket;
    constructor() {
        this.sender = ref(getUserId());
        this.recipient = "";
        getContactList().then((data) => {
            this.contacts.value = data || [];
        })
        this.socket = new WebSocket(WS_URL);
        this.bindEvent();
    }
    sendMessage(message) {
        if (message) {
            this.socket.send(JSON.stringify(message));
            this.appendMessage(message);
        }
    }
    appendMessage(message, isReceive = false) {
        let { from, to } = message;
        let chatter = isReceive ? from : to;
        if (chatter === this.recipient || !isReceive) {
            this.messages.value = this.messages.value.concat([message]);
        }
        let contact = this.contacts.value.find(({ _id }) => _id === chatter);
        if (contact) {
            contact.noReadCount = contact.noReadCount ? contact.noReadCount + 1 : 1;
            if (contact.messages) {
                contact.messages.push(message);
            }
        }
    }
    close() {
        this.socket.close();
        this.contacts = null;
        this.messages = null;
    }
    bindEvent() {
        // 连接打开时执行的回调
        this.socket.addEventListener('open', () => {
            console.log("Connection opened");
            if (this.sender && this.sender.value) {
                this.socket.send(this.sender.value);
            } else {
                getLoginUser().then((data) => {
                    this.sender.value = data._id;
                    setUserInfo(data);
                    this.socket.send(data._id);
                })
            }
        });
        // 接收消息时执行的回调
        this.socket.addEventListener('message', (event) => {
            let message = event.data;
            console.log(`Received message: ${message}`);
            message = JSON.parse(message);
            if (Object.prototype.toString.call(message) === '[object Array]') {
                message.forEach(item => {
                    this.appendMessage(item, true);
                })
            } else {
                this.appendMessage(message, true);
            }
        });

        // 连接关闭时执行的回调
        this.socket.addEventListener('close', () => {
            console.log("Connection closed");
        });
    }
    getContacts() {
        return this.contacts?.value;
    }
    useContacts() {
        return this.contacts;
    }
    useMessages = () => {
        return this.messages;
    }
    useUserId = () => {
        return this.sender;
    }
    setContacts(contacts) {
        this.contacts.value = contacts;
    }
    changeRecipient(userId) {
        this.recipient = userId;
        let contact = this.contacts.value.find(({ _id }) => _id === userId);
        let messages = contact?.messages;
        if (messages) {
            this.messages.value = messages;
        } else {
            getContactMessages(userId).then((data) => {
                this.messages.value = data || [];
                this.contacts.value.find(({ _id }) => _id === userId).messages = this.messages.value;
            });
        }
        if (contact?.noReadCount) {
            updateContactMessageStatus(userId, this.sender.value, 'read').then(() => {
                contact.noReadCount = 0;
            })
        }
    }
    onChat(content) {
        this.sendMessage({
            from: this.sender.value,
            to: this.recipient,
            content
        })
    }
}

export default MessageManage;