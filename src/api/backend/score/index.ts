import REQUEST from "@/utils/request";
import type { ResponseData } from "@/utils/request";
import type { add_score_type, get_score_res, get_score_list_res } from "./type";

enum API {
  ADD_SCORE_API = "/score/addScore",
  GET_SCORE_API = "/score/getScore",
  GET_SCORE_LIST_API = "/score/getScoreList",
}

/**
 * @description: 评星 /addScore
 * @param {add_score_type} data
 * @return {*}
 */
export const add_score_AXJAX = (
  data: add_score_type
): Promise<ResponseData<boolean>> => REQUEST("POST", API.ADD_SCORE_API, data);

/**
 * @description: 获取当前分值和总打分个数 /score/getScore
 * @return {*}
 */
export const getScore_AJAX = (data: {
  userId: number;
}): Promise<ResponseData<get_score_res>> =>
  REQUEST("GET", API.GET_SCORE_API, data);

/**
 * @description: 获取分值列表 /score/getScoreList
 * @return {*}
 */
export const getScoreList_AJAX = (): Promise<
  ResponseData<get_score_list_res>
> => REQUEST("GET", API.GET_SCORE_LIST_API);
