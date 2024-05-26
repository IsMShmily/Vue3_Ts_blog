import { defineStore } from "pinia";
import { reactive, ref } from "vue";
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
  const token = ref(getTokenStorage() ? getTokenStorage() : null);
  const userInfo = reactive(
    getUserStorage() ? JSON.parse(getUserStorage()!) : null
  );

  /** 储存用户信息 */
  const setUserInfo = async (info: login_res) => {
    setTokenStorage(info.token);
    setUserStorage(info);
    userInfo.value = info;
  };

  /** 删除用户信息 */
  const delUserInfo = () => {
    removeTokenStorage();
    removeUserStorage();
    userInfo.value = null;
    token.value = null;
  };

  return {
    token,
    userInfo,
    setUserInfo,
    delUserInfo,
  };
});

export default createUserStore;
