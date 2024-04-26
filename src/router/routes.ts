import { RouteRecordRaw } from "vue-router";

export const constantRoute: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "login",
    component: () => import("@/pages/login/index.vue"),
    meta: {
      title: "登录",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/404/index.vue"),
  },
  // 如果所有路由没匹配上会重定向到该路由
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
  },
];
