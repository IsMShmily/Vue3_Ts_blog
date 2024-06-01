<script setup lang="ts">
import { onMounted, ref } from "vue";
import API from "@/api";
import type { front_commits_res } from "@/api/common/type";
import dayjs from "dayjs";
import { driver } from "driver.js";
// import { useToast } from "@/hook/useToast";

// const { showToast } = useToast();
const list = ref<front_commits_res>();
const loading = ref(true);
const labels = ["bad", "so so", "ok", "good", "great"];
const colors = ["red", "orange", "grey", "cyan", "green"];
const rating = ref(4);

const getFrontCommits = async () => {
  const res = await API.getFrontCommits_AJAX();
  loading.value = false;
  list.value = res.data;
};

/** 页面引导 */
const ratingOverviewCard = ref();
const rating_ref = ref();
const list_ref = ref();

const startDriver = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: ratingOverviewCard.value.$el!,
        popover: { title: "评级概述模块", description: "通过该模块浏览博客的访问量以及整体评星情况，欢迎留下你的⭐️，谢谢！" },
      },
      {
        element: rating_ref.value.$el!,
        popover: { title: "打⭐️模块", description: "通过鼠标触摸星星，得到实时反馈，鼠标点击星星即可为网站评星" },
      },
      {
        element: list_ref.value.$el!,
        popover: { title: "星星总览", description: "浏览网站整体评星情况" },
      },
    ],
  });

  driverObj.drive();
};

onMounted(() => {
  // showToast("发送成功！", "success", 99999);
  getFrontCommits();
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="">
        <v-card
          class="d-flex flex-column mx-auto py-8"
          elevation="2"
          height="500"
          ref="ratingOverviewCard"
        >
          <div class="absolute left-4 top-4" @click="startDriver">
            <v-btn density="compact" icon="">
              <v-icon icon="mdi-help" size="10"></v-icon>
            </v-btn>
          </div>

          <div class="d-flex justify-center mt-auto text-h5">评级概述</div>
          <div class="d-flex align-center flex-column my-auto">
            <div class="text-h4 mt-2 mb-4">
              3.5
              <span class="text-h6 ml-n3">/5</span>
            </div>

            <v-rating
              v-model="rating"
              :item-labels="labels"
              hover
              ref="rating_ref"
            >
              <template v-slot:item-label="props">
                <span
                  :class="`text-${colors[props.index]}`"
                  class="font-weight-black text-caption"
                >
                  {{ props.label }}
                </span>
              </template>
            </v-rating>
            <div class="px-3 mt-4">总访问量 3,360</div>
          </div>

          <v-list
            bg-color="transparent"
            class="d-flex flex-column-reverse"
            density="compact"
            ref="list_ref"
          >
            <v-list-item v-for="(rating, i) in 5" :key="i">
              <v-progress-linear
                :model-value="rating * 15"
                class="mx-n5"
                color="dark-blue"
                height="9"
                rounded
              ></v-progress-linear>

              <template v-slot:prepend>
                <span>{{ rating }}</span>
                <v-icon class="mx-3" icon="mdi-star"></v-icon>
              </template>

              <template v-slot:append>
                <div class="rating-values">
                  <span class="d-flex justify-end"> {{ rating * 224 }} </span>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <v-col cols="12" md="8" class="d-flex justify-center">
        <v-skeleton-loader
          :loading="loading"
          height="740"
          type="list-item-avatar,paragraph,article,paragraph,article,article"
          class="w-full"
        >
          <v-card class="w-full" elevation="2">
            <v-card-text>
              <div class="font-weight-bold ms-1 mb-2">Today</div>
              <v-timeline align="start" density="compact">
                <v-timeline-item
                  v-for="item in list"
                  :key="item.id"
                  :dot-color="item.color"
                  size="x-small"
                >
                  <div class="flex items-center mb-3">
                    <v-avatar :image="item.avatar" class="mr-4"></v-avatar>
                    <div>
                      <div class="font-weight-normal">
                        <strong>{{ item.name }}</strong> @
                        {{ dayjs(item.date).format("YYYY-MM-DD HH:mm:ss") }}
                      </div>

                      <div>{{ item.message }}</div>
                    </div>
                  </div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped></style>
