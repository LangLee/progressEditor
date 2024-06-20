import { createVNode, render } from 'vue';
import MessageComponent from './message.vue';
interface MessageOptions {
  content: String,
  type: String
};
const createMessage = (options: MessageOptions) => {
  const messageVNode = createVNode(MessageComponent, {
    config: options,
    onClose: () => {
      // 这里处理关闭逻辑，比如移除组件
      removeMessage(messageEl);
    }
  });

  // 创建一个元素来承载消息组件
  const messageEl = document.createElement('div');
  messageEl.className = 'fixed top-4 left-0 w-full z-50'; // 添加一些基本定位样式

  // 渲染组件到新创建的元素上
  render(messageVNode, messageEl);

  // 将元素添加到DOM中
  document.body.appendChild(messageEl);

  // 如果需要自动关闭，可以设置定时器
  setTimeout(() => {
    removeMessage(messageEl);
  }, 3000);
}

const removeMessage = (messageEl: HTMLElement) => {
  render(null, messageEl);
  messageEl.remove();
}
const info = (content: string) => {
  createMessage({
    content,
    type: 'info'
  })
}
const warning = (content: string) => {
  createMessage({
    content,
    type: 'warning'
  })
}
export const error = (content: string) => {
  createMessage({
    content,
    type: 'error'
  })
}
export const success = (content: string) => {
  createMessage({
    content,
    type: 'success'
  })
}
export default {
  info,
  warning,
  error,
  success
}