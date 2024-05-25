import { defineStore } from "pinia";
import { ref } from "vue";
import type { login_res } from "@/api/backend/user/type";
import {
  getTokenStorage,
  setTokenStorage,
  removeTokenStorage,
  getUserStorage,
  setUserStorage,
  removeUserStorage,
} from "@/utils/storage";

let createUserStore = defineStore("user", () => {
  const token = ref(getTokenStorage() || null);
  const userInfo = ref(getUserStorage() ? JSON.parse(getUserStorage()!) : null);

  /** 储存用户信息 */
  const setUserInfo = async (info: login_res) => {
    userInfo.value = info;
    setTokenStorage(info.token);
    setUserStorage(info);
  };

  /** 删除用户信息 */
  const delUserInfo = () => {
    userInfo.value = null;
    token.value = null;
    removeTokenStorage();
    removeUserStorage();
  };

  return {
    token,
    userInfo,
    setUserInfo,
    delUserInfo,
  };
});

export default createUserStore;
