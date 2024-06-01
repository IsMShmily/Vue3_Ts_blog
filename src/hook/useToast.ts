// useToast.ts
import { getCurrentInstance } from "vue";

export function useToast() {
  const instance = getCurrentInstance();
  if (!instance) {
    throw new Error(
      "useToast must be called within a component setup function."
    );
  }

  const showToast = (
    message: string,
    type: "info" | "success" | "error" = "info",
    duration = 3000
  ) => {
    if (instance.proxy) {
      instance.proxy.$toast.show(message, type, duration);
    }
  };

  return { showToast };
}
