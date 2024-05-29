import REQUEST from "@/utils/request";
import type { ResponseData } from "@/utils/request";
import type {
  register_type,
  register_res,
  login_type,
  login_res,
} from "./type";

enum API {
  LOGIN_URL = "/user/login",
  LOGIN_GITHUB_API = "/user/auth/github",
  REGISTER_URL = "/user/registered",
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
