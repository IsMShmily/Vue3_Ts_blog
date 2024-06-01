<script setup lang="ts">
import { ref } from "vue";

const visible = ref(false);
const message = ref("");
const type = ref("");

const show = (
  msg: string,
  toastType: "info" | "success" | "error" = "info",
  duration = 5000
) => {
  message.value = msg;
  type.value = toastType;
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, duration);
};

defineExpose({ show });
</script>

<template>
  <transition
    enter-active-class="animate__animated animate__bounceInRight"
    leave-active-class="animate__animated animate__fadeOutRight"
  >
    <div v-if="visible" class="toast" :class="type">
      <p>{{ message }}</p>
    </div>
  </transition>
</template>

<style>
.toast {
  position: fixed;
  top: 10%;
  right: 10px;
  padding: 10px 20px;
  border-radius: 5px;
  color: #000000;
  font-weight: 500;
  z-index: 999;
  font-size: 14px;
  z-index: 9999;
}
.toast.info {
  background-color: rgb(233, 244, 254);
  border: 1px solid rgba(157, 200, 250);
}
.toast.success {
  background-color: rgba(185, 227, 153, 0.8);
  border: 1px solid green;
}
.toast.error {
  background-color: rgb(241, 211, 206);
  border: 1px solid rgb(250, 109, 109);
}
</style>
