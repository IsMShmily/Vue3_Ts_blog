<script setup lang="ts">
import SvgIcon from "@/components/SvgIcon.vue";
import { onMounted, ref } from "vue";

const loading = ref(true);
const page = ref(1);
const tab = ref(null);

const getList = async () => {
  await new Promise((resolve, _) => {
    console.log("--请求");
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
  console.log("--结束");
  loading.value = false;
};

onMounted(() => {
  getList();
});
</script>

<template>
  <div class="w-screen min-h-screen">
    <v-tabs v-model="tab" align-tabs="end">
      <v-tab :value="1">全部</v-tab>
      <v-tab :value="2">Vue</v-tab>
      <v-tab :value="3">React</v-tab>
      <v-tab :value="4">Next</v-tab>
      <v-tab :value="5">Ts</v-tab>
      <v-tab :value="6">Node</v-tab>
      <v-tab :value="7">八股</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="n in 7" :key="n" :value="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 8" :key="i" cols="12" md="3">
              <v-card class="mx-auto"  hover>
                <v-skeleton-loader
                  class=""
                  height="100%"
                  type="image,article, actions"
                  :loading="loading"
                >
                  <v-img
                    class="align-end text-white"
                    height="100%"
                    width="100%"
                    src="https://img2.baidu.com/it/u=808485391,814342496&fm=253&fmt=auto&app=138&f=JPEG?w=1235&h=800"
                    cover
                  >
                    <v-card-title> Vue Router 的重定向基础...</v-card-title>
                  </v-img>
                  <v-card-subtitle class="pt-4">
                    2024-10-05 22:35:12
                  </v-card-subtitle>
                  <v-card-text>
                    <div>
                      当使用VueRouter构建单页面应用程序时，路由重定向是一个非常有用的功能，它...
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn>
                      <SvgIcon name="love" size="20"></SvgIcon>
                      <div class="ml-1 text-xs font-bold">111</div>
                    </v-btn>

                    <v-btn>
                      <SvgIcon name="msg" size="20"></SvgIcon>
                      <div class="ml-1 text-xs font-bold">12</div>
                    </v-btn>
                  </v-card-actions>
                </v-skeleton-loader>
              </v-card>
            </v-col>
          </v-row>
          <v-pagination v-model="page" :length="5" class="my-4"></v-pagination>
        </v-container>
      </v-window-item>
    </v-window>
  </div>
</template>
<style lang="scss" scoped>
:deep(.v-pagination__list) {
  justify-content: end !important;
}
</style>
