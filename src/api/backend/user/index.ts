import REQUEST from "@/utils/request";
import type { ResponseData } from "@/utils/request";
import type {
  register_type,
  register_res,
  login_type,
  login_res,
  update_userInfo_type,
  get_userInfo_res,
} from "./type";

enum API {
  LOGIN_URL = "/user/login",
  LOGIN_GITHUB_API = "/user/auth/github",
  REGISTER_URL = "/user/registered",
  UPDATE_USERINFO_API = "/user/updateUserinfo",
  GET_USERINFO_API = "/user/getUser",
}

/**
 * @description: 登录 /user/login
 * @param {login_type} data
 * @return {*}
 */
export const login_AJAX = (
  data: login_type
): Promise<ResponseData<login_res>> => REQUEST("POST", API.LOGIN_URL, data);

/**
 * @description: github登录 /user/auth/github
 * @param {string} code
 * @return {*}
 */
export const login_github_AJAX = (data: {
  code: string;
}): Promise<ResponseData<login_res>> =>
  REQUEST("POST", API.LOGIN_GITHUB_API, data);

/**
 * @description: 注册用户 /user/registered
 * @param {register_type} data
 * @return {*}
 */
export const register_AJAX = (
  data: register_type
): Promise<ResponseData<register_res>> =>
  REQUEST("POST", API.REGISTER_URL, data);

/**
 * @description: 修改用户信息 /user/updateUserinfo
 * @param {update_userInfo_type} data
 * @return {*}
 */
export const updateUserInfo_AJAX = (
  data: update_userInfo_type
): Promise<ResponseData<true>> =>
  REQUEST("POST", API.UPDATE_USERINFO_API, data);

/**
 * @description: 获取用户信息 /user/getUser
 * @param {*} Promise
 * @return {*}
 */
export const getUserInfo_AJAX = (): Promise<ResponseData<get_userInfo_res>> =>
  REQUEST("GET", API.GET_USERINFO_API);
