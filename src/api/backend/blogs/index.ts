import REQUEST from "@/utils/request";
import type { ResponseData } from "@/utils/request";
import type { get_blogs_list_type, get_blogs_list_res } from "./type";

enum API {
  BLOGS_LIST_API = "/blogs/getList",
}

/**
 * @description: 获取文章列表 /blogs/getList
 * @param {get_blogs_list_type} data
 * @return {*}
 */
export const get_blogs_list_AXJAX = (
  data: get_blogs_list_type
): Promise<ResponseData<get_blogs_list_res>> =>
  REQUEST("POST", API.BLOGS_LIST_API, data);
