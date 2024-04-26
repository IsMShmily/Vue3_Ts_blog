import REQUEST from "@/utils/request";

enum API {
  LOGIN_URL = "/v3/system/account/login",
}
// 登录
export const reqLogin = (data: any) => REQUEST("POST", API.LOGIN_URL, data);
