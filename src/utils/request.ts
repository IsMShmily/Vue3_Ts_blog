import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

export interface ResponseData<T = any> {
  code: number;
  msg: string;
  data: T;
}

// 定义请求方法类型
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 7000,
  validateStatus: (status: number) => status >= 200 && status < 300, // 默认的
});

// 请求拦截器
request.interceptors.request.use((config: any) => {
  config.headers = {
    token: localStorage.getItem("token") || "",
  };
  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse<ResponseData<any>>) => {
    const responseData = response.data;
    return responseData as any;
  },
  (error: AxiosError) => {
    let message = "";
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401:
          message = "TOKEN过期";
          break;
        case 404:
          message = "页面丢失了";
          break;
        case 403:
          message = "您无权访问";
          break;
        case 500:
          message = "服务器繁忙";
          break;
        default:
          message = "网络异常，请稍后重试";
      }
    } else {
      message = "网络异常，请稍后重试";
    }

    // 统一处理错误信息
    return Promise.reject(new Error(message));
  }
);

export default function requestWithMethod(
  method: RequestMethod,
  url: string,
  data?: any
): Promise<any> {
  switch (method) {
    case "GET":
      return request.get(url, { params: data });
    case "POST":
      return request.post(url, data);
    case "PUT":
      return request.put(url, data);
    case "DELETE":
      return request.delete(url, { data });
    default:
      throw new Error("Invalid request method");
  }
}
