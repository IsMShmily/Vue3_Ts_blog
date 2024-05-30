import { defineStore } from "pinia";
import { ref } from "vue";
import type { login_res } from "@/api/backend/user/type";
import {
  getTokenStorage,
  setTokenStorage,
  removeTokenStorage,
  setUserStorage,
  removeUserStorage,
  getUserStorage,
} from "@/utils/storage";

const useUserStore = defineStore("user", () => {
  const token = ref(getTokenStorage() ? getTokenStorage() : null);
  let userInfo = ref(getUserStorage() ? JSON.parse(getUserStorage()!) : null);

  /** 储存用户信息 */
  const setUserInfo = async (info: login_res) => {
    setTokenStorage(info.token);
    setUserStorage(info);
    token.value = info.token;
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

export default useUserStore;
