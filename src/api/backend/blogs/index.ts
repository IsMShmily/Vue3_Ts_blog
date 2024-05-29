import REQUEST from "@/utils/request";
import type { ResponseData } from "@/utils/request";
import type {
  get_blogs_list_type,
  get_blogs_list_res,
  blogs_detail_res,
  list_blogs_res,
} from "./type";

enum API {
  BLOGS_LIST_API = "/blogs/getList",
  BLOGS_DETAIL_API = "/blogs/getById",
  BLOGS_LIKE_API = "/like",
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

/**
 * @description: 获取博客详情 /blogs/getById
 * @param {get_blogs_list_type} data
 * @return {*}
 */
export const get_blogs_detail_AXJAX = (data: {
  id: number;
  userId: number;
}): Promise<ResponseData<blogs_detail_res>> =>
  REQUEST("GET", API.BLOGS_DETAIL_API, data);

/**
 * @description: 文章点赞 /like
 * @param {number} blogId
 * @return {*}
 */
export const like_blogs_AJAX = (data: {
  blogId: number;
}): Promise<ResponseData<list_blogs_res>> =>
  REQUEST("POST", API.BLOGS_LIKE_API, data);
