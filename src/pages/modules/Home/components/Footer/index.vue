<script setup lang="ts">
const list = [
  {
    name: "Vue3",
    icon: "csdn",
    href: "https://blog.csdn.net/shmilynn_",
  },
  {
    name: "Ts",
    icon: "github",
    href: "https://github.com/IsMShmily",
  },
  // {
  //   name: "Tailwind",
  //   icon: "tailwind",
  // },
  // {
  //   name: "NodeJs",
  //   icon: "node",
  // },
  // {
  //   name: "Koa",
  //   icon: "koa",
  // },
  // {
  //   name: "MySQL",
  //   icon: "mysql",
  // },
];
</script>
<template>
  <v-divider></v-divider>
  <div class="my-2">
    <div class="text-center text-sm font-bold px-5">
      <div class="flex justify-evenly font-bold mt-1 flex-wrap w-24 m-auto">
        <div
          class="flex items-center rounded-md p-0.5 cursor-pointer"
          v-for="item in list"
          :key="item.name"
        >
          <a :href="item.href">
            <SvgIcon :name="item.icon" size="20" color="#000"></SvgIcon>
          </a>
        </div>
      </div>
      <div class="mb-2">Copyright ©2024 · @shmily_yy</div>
      <a href="https://beian.miit.gov.cn">浙ICP备2024087931号-1</a>
      <div class="flex justify-center items-center">
        <SvgIcon name="filing" size="17" color="#000"></SvgIcon>
        <span class="ml-2">浙网安备2024087931号</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
