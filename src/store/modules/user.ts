import { defineStore } from "pinia";
import { ref } from "vue";

let createUserStore = defineStore("user", () => {
  const token = ref();

  /**
   * 获取用户信息
   */
  const getUserInfoFn = async () => {};

  return {
    token,
    getUserInfoFn,
  };
});

export default createUserStore;
