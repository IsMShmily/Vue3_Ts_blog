import { RouteRecordRaw } from "vue-router";

export const constantRoute: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/pages/layout/index.vue"),
    redirect: "/home",
    meta: {
      title: "layout",
    },
    children: [
      {
        path: "home",
        name: "home",
        meta: {
          title: "首页",
        },
        component: () => import("@/pages/modules/Home/index.vue"),
      },
      {
        path: "Blogs",
        name: "Blogs",
        meta: {
          title: "博客",
        },
        component: () => import("@/pages/modules/Blogs/index.vue"),
      },
      {
        path: "chat",
        name: "chat",
        meta: {
          title: "聊天",
        },
        component: () => import("@/pages/modules/Chat/index.vue"),
      },
      {
        path: "leave",
        name: "leave",
        meta: {
          title: "留言",
        },
        component: () => import("@/pages/modules/Leave/index.vue"),
      },
    ],
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
    name: "Any",
  },
];
