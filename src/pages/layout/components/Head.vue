<script setup lang="ts">
import { useTheme } from "vuetify";
import { Moon, Sun, EllipsisVertical } from "lucide-vue-next";
import { ref } from "vue";
import router from "@/router";
import { Github, UserRoundPlus, LogOut } from "lucide-vue-next";
import Login from "./Login.vue";
import createUserStore from "@/store/modules/user";

const userStore = createUserStore();
const { userInfo } = userStore;
const theme = useTheme();
const drawer = ref(false);
const menu = ref(false);

const items = [
  {
    title: "主页",
    value: "home",
    icon: "Home",
  },
  {
    title: "博客",
    value: "blogs",
    icon: "BookCheck",
  },
  {
    title: "留言",
    value: "leave",
    icon: "Send",
  },
  // {
  //   title: "我的",
  //   value: "chat",
  //   icon: "Users",
  // },
];
const jumpRouter = (item: any) => {
  menu.value = false;
  router.push(item.value);
};
const goOut = () => {
  userStore.delUserInfo();
};
/**
 * @description: 切换主题
 * @return {*}
 */
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};

/**
 * 用户登录
 */
const Login_ref = ref();
const userLogin = () => {
  Login_ref.value.LoginDialogstatus = true;
};
</script>
<template>
  <v-app-bar scroll-behavior="elevate">
    <v-toolbar
      color="rgba(255,255,255,0.001)"
      :dark="true"
      class="px-5 box-border"
    >
      <v-toolbar-title class="">
        <div class="flex items-center">
          <img src="/logo.png" class="rounded-full w-10" alt="" />
          <div class="ml-3 font-bold cursor-pointer">shmily_yy blog</div>
        </div>
      </v-toolbar-title>

      <v-btn
        class="ml-3"
        @click="toggleTheme"
        size="small"
        elevation="3"
        rounded="xl"
        icon=""
      >
        <v-expand-x-transition>
          <Moon v-show="!theme.global.current.value.dark" :size="17" />
        </v-expand-x-transition>
        <v-expand-x-transition>
          <Sun v-show="theme.global.current.value.dark" :size="17" />
        </v-expand-x-transition>
      </v-btn>

      <v-menu v-model="menu" :close-on-content-click="false" location="top">
        <template v-slot:activator="{ props }">
          <v-btn
            size="small"
            elevation="3"
            icon=""
            class="ml-3"
            @click="drawer = true"
            v-bind="props"
          >
            <EllipsisVertical class="cursor-pointer" />
          </v-btn>
        </template>

        <!-- card -->
        <v-card min-width="280">
          <v-list>
            <v-list-item
              v-if="userInfo"
              :prepend-avatar="userInfo.avatar"
              subtitle="欢迎来到shmily_yy的博客"
              :title="userInfo.userName"
            >
              <template v-slot:append>
                <v-btn variant="text" @click="goOut">
                  <LogOut :size="16"
                /></v-btn>
              </template>
            </v-list-item>
            <v-list-item v-else class="text-center">
              <v-list-item-title>选择登录方式</v-list-item-title>
              <v-list-item-title class="mt-3">
                <v-btn-toggle variant="outlined">
                  <v-btn variant="text">
                    <div
                      class="text-xs flex justify-center items-center flex-col"
                    >
                      <Github :size="16" />
                      <div class="mt-1 scale-x-75 scale-y-75">github</div>
                    </div>
                  </v-btn>
                  <v-btn variant="text" @click="userLogin">
                    <div
                      class="text-xs flex justify-center items-center flex-col"
                    >
                      <UserRoundPlus :size="16" />
                      <div class="mt-1 scale-x-75 scale-y-75">已有用户</div>
                    </div>
                  </v-btn>
                </v-btn-toggle></v-list-item-title
              >
              <template v-slot:append> </template>
            </v-list-item>
          </v-list>
          <v-list>
            <v-list-item
              v-for="(item, i) in items"
              :key="i"
              class="min-w-36 text-center cursor-pointer"
            >
              <v-list-item-title @click="jumpRouter(item)">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
        <!-- card -->
      </v-menu>
    </v-toolbar>
  </v-app-bar>

  <Login ref="Login_ref"></Login>
</template>
<style lang="scss" scoped>
.logo {
  width: 50px;
  height: 50px;
}

header {
  position: fixed !important;
}
</style>
