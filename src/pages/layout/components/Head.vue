<script setup lang="ts">
import { useTheme } from "vuetify";
import { Moon, Sun, Github, Gitlab, EllipsisVertical } from "lucide-vue-next";
import { ref } from "vue";

const theme = useTheme();
const drawer = ref(false);
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
    title: "工具",
    value: "utils",
    icon: "Wrench",
  },
  {
    title: "留言",
    value: "leave",
    icon: "Send",
  },
];

/**
 * @description: 切换主题
 * @return {*}
 */
const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
};
</script>
<template>
  <v-app-bar :elevation="0">
    <v-toolbar color="rgba(255,255,255,0.001)" :dark="true" class="px-5 box-border">
      <v-toolbar-title class="">
        <div class="flex items-center">
          <img src="/logo.png" class="rounded-full w-10" alt="" />
          <div class="ml-3 font-bold cursor-pointer">shmily_yy 博客</div>
        </div>
      </v-toolbar-title>

      <!-- <v-btn size="small" elevation="3" icon="">
        <Gitlab :size="17" />
      </v-btn>
      <v-btn size="small" elevation="3" icon="" class="ml-3">
        <Github :size="17" />
      </v-btn> -->

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
      <v-btn size="small" elevation="3" icon="" class="ml-3">
        <EllipsisVertical @click="drawer = true" class="cursor-pointer" />
      </v-btn>
    </v-toolbar>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'top' : 'right'"
    temporary
  >
    <v-list nav>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :value="item.value"
        :to="item.value"
      >
        <template v-slot:prepend>
          <S-Icon :name="item.icon" :size="16" class="mr-3" />
        </template>
        <v-list-item-title v-text="item.title"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<style lang="scss" scoped>
.logo {
  width: 50px;
  height: 50px;
}
</style>
