import REQUEST from "@/utils/request";
import type { ResponseData } from "@/utils/request";
import type { get_category_list_type, get_category_list_res } from "./type";

enum API {
  TYPE_LIST_API = "/category/getList",
}

/**
 * @description: 获取分类列表 /category/getList
 * @param {get_category_list_type} data
 * @return {*}
 */
export const get_category_list_AJAX = (
  data: get_category_list_type
): Promise<ResponseData<get_category_list_res>> =>
  REQUEST("POST", API.TYPE_LIST_API, data);
