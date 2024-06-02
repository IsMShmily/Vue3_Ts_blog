import type { login_res } from "@/api/backend/user/type";

const key = "token";
const userKey = "user";

/** 获取token */
export const getTokenStorage = () => {
  return localStorage.getItem(key);
};

/** 设置token */
export const setTokenStorage = (token: string) => {
  return localStorage.setItem(key, token);
};

/** 删除token */
export const removeTokenStorage = () => {
  return localStorage.removeItem(key);
};

/** 获取用户信息 */
export const getUserStorage = () => {
  return localStorage.getItem(userKey);
};

/** 设置用户信息 */
export const setUserStorage = (userInfo: login_res) => {
  return localStorage.setItem(userKey, JSON.stringify(userInfo));
};

/** 删除用户信息 */
export const removeUserStorage = () => {
  return localStorage.removeItem(userKey);
};
