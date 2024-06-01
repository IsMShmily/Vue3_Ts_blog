// global.d.ts
import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  // 为 this.$toast 提供类型声明
  interface ComponentCustomProperties {
    $toast: {
      show(
        message: string,
        type?: 'info' | 'success' | 'error',
        duration?: number
      ): void;
    };
  }
}
