import ModalComponent from './Modal.vue';
import { createVNode, render, Slot, VNode } from 'vue';
interface ModalOptions {
    title: String,
    content: String | VNode | Slot,
    onOk: Function,
    onCancel: Function
};
const createModal = (options: ModalOptions) => {
    const modalVNode = createVNode(ModalComponent, {
        visible: true,
        title: options.title,
        onConfirm: ()=>{
            options.onOk && options.onOk();
            removeModal(modalEl)
        },
        onCancel: () => {
            options.onCancel && options.onCancel();
            removeModal(modalEl)
        }
    }, options.content);
    // 创建一个元素来承载消息组件
    const modalEl = document.createElement('div');
    // modalEl.className = 'fixed top-4 left-0 w-full z-50'; // 添加一些基本定位样式

    // 渲染组件到新创建的元素上
    render(modalVNode, modalEl);

    // 将元素添加到DOM中
    document.body.appendChild(modalEl);
}
const removeModal = (modalEl: HTMLElement) => {
    render(null, modalEl);
    modalEl.remove();
}
const confirm = (options: ModalOptions) => {
    return createModal(options);
}

export default {
    confirm
}