<script setup lang="ts">
import { useTheme } from "vuetify";
import {
  Moon,
  Sun,
  EllipsisVertical,
  Github,
  UserRoundPlus,
  LogOut,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import router from "@/router";
import { storeToRefs } from "pinia";
import Login from "./Login.vue";
import useUserStore from "@/store/modules/user";
import API from "@/api";
import { useDisplay } from "vuetify";
import noLoginImg from "@/assets/img/noLogin.png";

const { mdAndUp } = useDisplay();
const userStore = useUserStore();
const { userInfo, token } = storeToRefs(userStore);
const theme = useTheme();
const drawer = ref(false);
const menu = ref(false);
const dialog = ref(false);

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
  {
    title: "博客历程",
    value: "course",
    icon: "Users",
  },
  {
    title: "我的",
    value: "my",
    icon: "Users",
  },
];
const jumpRouter = (item: any) => {
  localStorage.setItem("activeMenu", item.value);
  menu.value = false;
  router.push(item.value);
};
const goOut = () => {
  userStore.delUserInfo();
  dialog.value = false;
};
/** @module 移动端与Pc菜单逻辑 */
const activeMenu = ref(
  localStorage.getItem("activeMenu")
    ? localStorage.getItem("activeMenu")
    : "home"
);
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
const overlay = ref(false);
const githubLoadingText = ref("");

const prodStatus = import.meta.env.VITE_USER_NODE_ENV == "prod";
const userLogin = () => {
  Login_ref.value.LoginDialogstatus = true;
};
const githubLogin = async (code: string) => {
  try {
    const res = await API.Login.login_github_AJAX({
      code,
    });
    if (res.code == 200) {
      await useUserStore().setUserInfo(res.data);
      githubLoadingText.value = `登录成功！欢迎您${userInfo.value.userName}`;
    } else {
      githubLoadingText.value = `登录失败！授权已过期，请重新授权`;
    }
  } catch (error) {
    githubLoadingText.value = `登录失败！授权已过期，请重新授权`;
  } finally {
    setTimeout(() => {
      overlay.value = false;
      githubLoadingText.value = "";
      clearCodeFromUrl();
    }, 2000);
  }
};
const clearCodeFromUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  window.history.replaceState(null, "", url.toString());
};

onMounted(() => {
  if (!(window.location.href.indexOf("code=") == -1)) {
    githubLoadingText.value = "授权验证中...";
    overlay.value = true;
    const urlParams = new URLSearchParams(window.location.search);
    githubLogin(urlParams.get("code")!);
  }
});
</script>
<template>
  <v-dialog v-model="overlay" max-width="370" persistent>
    <v-list class="py-2" elevation="12" rounded="lg">
      <v-list-item prepend-icon="mdi-github" :title="githubLoadingText">
        <template v-slot:prepend>
          <div class="pe-4">
            <v-icon color="shades" size="x-large"></v-icon>
          </div>
        </template>

        <template v-slot:append>
          <v-progress-circular
            color="shades"
            indeterminate="disable-shrink"
            size="16"
            width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
  <v-app-bar scroll-behavior="elevate">
    <v-toolbar
      color="rgba(255,255,255,0.001)"
      :dark="true"
      class="px-5 box-border"
    >
      <v-toolbar-title class="">
        <div class="flex items-center">
          <img src="/logo.png" class="rounded-full w-10" alt="" />
          <div class="ml-3 font-bold cursor-pointer">Shmily_yy Blog</div>
        </div>
      </v-toolbar-title>

      <v-btn
        class="ml-3"
        @click="toggleTheme"
        size="small"
        elevation="3"
        rounded="xl"
        icon=""
        v-if="!mdAndUp"
      >
        <v-expand-x-transition>
          <Moon v-show="!theme.global.current.value.dark" :size="17" />
        </v-expand-x-transition>
        <v-expand-x-transition>
          <Sun v-show="theme.global.current.value.dark" :size="17" />
        </v-expand-x-transition>
      </v-btn>

      <!-- 小屏展示 -->
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        location="top"
        v-if="!mdAndUp"
      >
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
              v-if="token"
              :prepend-avatar="userInfo?.avatar"
              subtitle="欢迎来到shmily_yy的博客"
              :title="userInfo?.userName"
            >
              <template v-slot:append>
                <v-dialog v-model="dialog" max-width="400" persistent>
                  <template v-slot:activator="{ props: activatorProps }">
                    <v-btn variant="text" v-bind="activatorProps">
                      <LogOut :size="16"
                    /></v-btn>
                  </template>

                  <v-card
                    prepend-icon="mdi-logout-variant"
                    title="你确定要退出登录吗？"
                  >
                    <template v-slot:actions>
                      <v-spacer></v-spacer>
                      <v-btn @click="dialog = false"> 取消 </v-btn>
                      <v-btn @click="goOut"> 确认 </v-btn>
                    </template>
                  </v-card>
                </v-dialog>
              </template>
            </v-list-item>
            <v-list-item v-else class="text-center">
              <v-list-item-title>选择登录方式</v-list-item-title>
              <v-list-item-title class="mt-3">
                <v-btn-toggle variant="outlined">
                  <v-btn
                    variant="text"
                    @click="
                      () => {
                        overlay = true;
                        githubLoadingText = 'GitHub 授权中...';
                      }
                    "
                  >
                    <a
                      href="https://github.com/login/oauth/authorize?client_id=Ov23ctUuyRd07F88pHxd&redirect_uri=http://www.shmilyyy.cn/#/home"
                      v-if="prodStatus"
                    >
                      <div
                        class="text-xs flex justify-center items-center flex-col"
                      >
                        <Github :size="16" />
                        <div class="mt-1 scale-x-75 scale-y-75">github</div>
                      </div></a
                    >
                    <a
                      href="https://github.com/login/oauth/authorize?client_id=Ov23ctUuyRd07F88pHxd&redirect_uri=http://localhost:5200/#/home"
                      v-else
                    >
                      <div
                        class="text-xs flex justify-center items-center flex-col"
                      >
                        <Github :size="16" />
                        <div class="mt-1 scale-x-75 scale-y-75">github</div>
                      </div></a
                    >
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
              :disabled="item.value == 'my' && !token"
            >
              <v-list-item-title @click="jumpRouter(item)">{{
                item.title
              }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card>
        <!-- card -->
      </v-menu>

      <!-- 大屏展示 -->
      <template v-else>
        <v-switch
          @click="toggleTheme"
          hide-details
          class="mr-5"
          color="blue-grey-darken-2"
        ></v-switch>

        <v-btn-toggle v-model="activeMenu" borderless>
          <v-btn
            :value="item.value"
            v-for="item in items"
            :key="item.value"
            :disabled="item.value == 'my' && !token"
            @click="jumpRouter(item)"
          >
            <span class="hidden-sm-and-down">{{ item.title }}</span>
          </v-btn>
        </v-btn-toggle>

        <v-menu v-model="menu" :close-on-content-click="false" location="top">
          <template v-slot:activator="{ props }">
            <v-btn
              size="small"
              elevation="3"
              icon=""
              class="ml-5"
              @click="drawer = true"
              v-bind="props"
            >
              <v-avatar :image="noLoginImg" v-if="!userInfo?.avatar"></v-avatar>
              <v-avatar :image="userInfo?.avatar" v-else></v-avatar>
            </v-btn>
          </template>

          <!-- card -->
          <v-card min-width="280">
            <v-list>
              <v-list-item
                v-if="token"
                :prepend-avatar="userInfo?.avatar"
                subtitle="欢迎来到shmily_yy的博客"
                :title="userInfo?.userName"
              >
                <template v-slot:append>
                  <v-dialog v-model="dialog" max-width="400" persistent>
                    <template v-slot:activator="{ props: activatorProps }">
                      <v-btn variant="text" v-bind="activatorProps">
                        <LogOut :size="16"
                      /></v-btn>
                    </template>

                    <v-card
                      prepend-icon="mdi-logout-variant"
                      title="你确定要退出登录吗？"
                    >
                      <template v-slot:actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="dialog = false"> 取消 </v-btn>
                        <v-btn @click="goOut"> 确认 </v-btn>
                      </template>
                    </v-card>
                  </v-dialog>
                </template>
              </v-list-item>

              <v-list-item v-if="!token" class="text-center">
                <v-list-item-title>选择登录方式</v-list-item-title>
                <v-list-item-title class="mt-3">
                  <v-btn-toggle variant="outlined">
                    <v-btn
                      variant="text"
                      @click="
                        () => {
                          overlay = true;
                          githubLoadingText = 'GitHub 授权中...';
                        }
                      "
                    >
                      <a
                        href="https://github.com/login/oauth/authorize?client_id=Ov23ctUuyRd07F88pHxd&redirect_uri=http://www.shmilyyy.cn/#/home"
                        v-if="prodStatus"
                      >
                        <div
                          class="text-xs flex justify-center items-center flex-col"
                        >
                          <Github :size="16" />
                          <div class="mt-1 scale-x-75 scale-y-75">github</div>
                        </div></a
                      >
                      <a
                        href="https://github.com/login/oauth/authorize?client_id=Ov23ctUuyRd07F88pHxd&redirect_uri=http://localhost:5200/#/home"
                        v-else
                      >
                        <div
                          class="text-xs flex justify-center items-center flex-col"
                        >
                          <Github :size="16" />
                          <div class="mt-1 scale-x-75 scale-y-75">github</div>
                        </div></a
                      >
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
          </v-card>
          <!-- card -->
        </v-menu>
      </template>
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
