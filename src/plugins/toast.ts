import { App, createVNode, render } from 'vue';
import Toast from '../components/basic/Toast/index.vue';

export default {
  install(app: App) {
    const toastVNode = createVNode(Toast);
    render(toastVNode, document.createElement('div'));
    document.body.appendChild(toastVNode.el as HTMLElement);

    const { show } = toastVNode.component!.exposed as {
      show: (msg: string, type?: string, duration?: number) => void;
    };

    app.config.globalProperties.$toast = {
      show(
        message: string,
        type: 'info' | 'success' | 'error' = 'info',
        duration = 3000
      ) {
        show(message, type, duration);
      },
    };
  },
};
