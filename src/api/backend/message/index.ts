import REQUEST from "@/utils/request";
import type { ResponseData } from "@/utils/request";
import type {
  add_message_type,
  get_message_type,
  get_message_res,
} from "./type";

enum API {
  ADD_MESSAGE_API = "/comment/add",
  GET_MESSAGE_LIST_API = "/comment/list",
}

/**
 * @description: 留言 /comment/add
 * @param {add_message_type} data
 * @return {*}
 */
export const add_message_AXJAX = (
  data: add_message_type
): Promise<ResponseData<boolean>> => REQUEST("POST", API.ADD_MESSAGE_API, data);

/**
 * @description: 留言列表 /comment/list
 * @param {get_message_type} data
 * @return {*}
 */
export const get_message_list_AJAX = (
  data: get_message_type
): Promise<ResponseData<get_message_res>> =>
  REQUEST("POST", API.GET_MESSAGE_LIST_API, data);
