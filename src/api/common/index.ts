import REQUEST from "@/utils/request";
import type { code_type } from "./type";
import type { ResponseData } from "@/utils/request";

enum API {
  GET_CODE_API = "/sendCode",
}

/**
 * @description: 获取验证码 /sendCode
 * @param {code_type} data
 * @return {*}
 */
export const getCode_AJAX = (data: code_type): Promise<ResponseData<boolean>> =>
  REQUEST("POST", API.GET_CODE_API, data);
