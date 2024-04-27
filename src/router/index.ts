import { createRouter, createWebHashHistory } from "vue-router";
// import createUserStore from "@/store/modules/user";
import { constantRoute } from "./routes";
let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  // 滚动行为 切换路由的位置
  scrollBehavior() {
    return {
      top: 0,
      left: 0,
    };
  },
});

// const whiteList = ["/", "/404"];

// 路由前置守卫

router.beforeEach((to, _, next) => {
  // const userStore = createUserStore();

  // const whiteRouterList = [...list, ...whiteList];

  // // 登录
  // if (token && userInfo) {
  //   // 管理员
  //   if (userInfo.isAdmin == 1) {
  //     return next();
  //   }
  //   // 判断去的路由是否在白名单
  //   const status = whiteRouterList.some((item) => item == to.path);
  //   if (status) {
  //     next();
  //   } else {
  //     next(`/404`);
  //   }
  // } else {
  //   // 未登录状态 判断
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next();
  //   } else {
  //     next(`/login`);
  //   }
  // }

  next();
});

export default router;
