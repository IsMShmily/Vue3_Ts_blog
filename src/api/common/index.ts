import REQUEST from "@/utils/request";
import type { code_type, front_commits_res } from "./type";
import type { ResponseData } from "@/utils/request";

enum API {
  GET_CODE_API = "/sendCode",
  FRONT_COMMITS_API = "/frontGit/commits",
}

/**
 * @description: 获取验证码 /sendCode
 * @param {code_type} data
 * @return {*}
 */
export const getCode_AJAX = (data: code_type): Promise<ResponseData<boolean>> =>
  REQUEST("POST", API.GET_CODE_API, data);

/**
 * @description: 获取前端代码提交记录 /frontGit/commits
 * @return {*}
 */
export const getFrontCommits_AJAX = (): Promise<
  ResponseData<front_commits_res>
> => REQUEST("GET", API.FRONT_COMMITS_API);
