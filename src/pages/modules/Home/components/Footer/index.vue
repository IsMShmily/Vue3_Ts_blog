<script setup lang="ts">
const list = [
  {
    name: "Vue3",
    icon: "vue",
  },
  {
    name: "Ts",
    icon: "ts",
  },
  {
    name: "Tailwind",
    icon: "tailwind",
  },
  {
    name: "NodeJs",
    icon: "node",
  },
  // {
  //   name: "Koa",
  //   icon: "koa",
  // },
  {
    name: "MySQL",
    icon: "mysql",
  },
];
</script>
<template>
  <v-divider></v-divider>
  <div class="my-2">
    <div class="text-center text-sm font-bold">
      Copyright ©2024 by @shmily_yy All rights reserved ·
      <a href="https://beian.miit.gov.cn">浙ICP备2024087931号-1</a>
    </div>
    <div class="flex justify-center font-bold mt-1 flex-wrap">
      <div
        class="flex items-center ml-5 rounded-md p-0.5"
        v-for="item in list"
        :key="item.name"
      >
      
        <SvgIcon :name="item.icon" size="17" color="#000"></SvgIcon>
        <div class="text-xs ml-1">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
