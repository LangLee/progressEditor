import LoadingComponent from '@/components/common/Loading.vue';
import { createVNode, render } from 'vue';

let count = 0;
let modalEl: HTMLElement|undefined;
const show = () => {
    count++;
    if (modalEl) return;
    const modalVNode = createVNode(LoadingComponent);
    // 创建一个元素来承载消息组件
    modalEl = document.createElement('div');
    // modalEl.className = 'fixed top-4 left-0 w-full z-50'; // 添加一些基本定位样式

    // 渲染组件到新创建的元素上
    render(modalVNode, modalEl);

    // 将元素添加到DOM中
    document.body.appendChild(modalEl);
}
const hide = () => {
    count--;
    if (count === 0 && modalEl) {
        render(null, modalEl);
        modalEl.remove();
        modalEl = undefined;
    }
}

export default {
    show,
    hide
}