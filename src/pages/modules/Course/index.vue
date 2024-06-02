<script setup lang="ts">
import { onMounted, ref } from "vue";
import API from "@/api";
import type { front_commits_res } from "@/api/common/type";
import dayjs from "dayjs";
import { driver } from "driver.js";
import type {
  get_score_res,
  get_score_list_res,
} from "@/api/backend/score/type";
import { useToast } from "@/hook/useToast";
import useUserStore from "@/store/modules/user";

const { showToast } = useToast();
const list = ref<front_commits_res>();
const loading = ref(true);
const labels = ["bad", "so so", "ok", "good", "great"];
const colors = ["red", "orange", "grey", "cyan", "green"];
const rating = ref(4);
const userStore = useUserStore();

const getFrontCommits = async () => {
  const res = await API.getFrontCommits_AJAX();
  loading.value = false;
  list.value = res.data;
};

/** @module 星星 */
const scoreDetail = ref<get_score_res>();
const scoreList = ref<get_score_list_res>();
const hoverStatus = ref(true);

/** 打星 */
const addScore = async () => {
  if (scoreDetail.value?.isRating) return;
  const res = await API.Score.add_score_AXJAX({
    starsNum: rating.value,
  });
  console.log(res);
  if (res.code == 200) {
    showToast("评星成功！谢谢您的支持Thanks♪(･ω･)ﾉ", "success", 7000);
    getScore();
    getScoreList();
  } else {
    showToast(`${res.msg}`, "error");
  }
};

/** 获取当前分值和总打分个数 */
const getScore = async () => {
  const res = await API.Score.getScore_AJAX({
    userId: userStore.userInfo ? userStore.userInfo.id : null,
  });
  scoreDetail.value = res.data;
  rating.value = res.data.MyStar;
  if (res.data.isRating) {
    hoverStatus.value = false;
  }
};

/** 获取分值列表 */
const getScoreList = async () => {
  const res = await API.Score.getScoreList_AJAX();
  scoreList.value = res.data;
};

/** @module 页面引导 */
const ratingOverviewCard = ref();
const rating_ref = ref();
const list_ref = ref();

const startDriver = () => {
  const driverObj = driver({
    showProgress: true,
    steps: [
      {
        element: ratingOverviewCard.value.$el!,
        popover: {
          title: "评星概述模块",
          description:
            "通过该模块浏览博客的总打星量以及评星情况，欢迎留下你的⭐️，谢谢！",
        },
      },
      {
        element: rating_ref.value.$el!,
        popover: {
          title: "打⭐️模块",
          description: "通过鼠标划过星星，得到实时反馈，鼠标按下即可为网站评星",
        },
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
  getFrontCommits();
  getScoreList();
  getScore();
});
</script>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" class="">
        <v-card
          class="d-flex flex-column mx-auto py-8 animate__animated animate__fadeInLeft"
          elevation="2"
          height="550"
          ref="ratingOverviewCard"
        >
          <div class="absolute left-4 top-4" @click="startDriver">
            <v-btn density="compact" icon="">
              <v-icon icon="mdi-help" size="10"></v-icon>
            </v-btn>
          </div>

          <div class="d-flex justify-center mt-auto text-h5">评星概述</div>
          <div class="d-flex align-center flex-column my-auto">
            <div class="text-h4 mt-2 mb-4">
              {{ scoreDetail?.proportion }}
              <span class="text-h6 ml-n3">/5.0</span>
            </div>

            <v-rating
              v-model="rating"
              :item-labels="labels"
              :hover="hoverStatus"
              ref="rating_ref"
              :readonly="scoreDetail?.isRating"
              @click="addScore"
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
            <div class="px-3 mt-4">
              总打星量 {{ scoreDetail?.totalStarsCount }}
            </div>
          </div>

          <v-list
            bg-color="transparent"
            class="d-flex flex-column-reverse"
            density="compact"
            ref="list_ref"
          >
            <v-list-item v-for="item in scoreList" :key="item.starsNum">
              <v-progress-linear
                :model-value="
                  ((item.count / scoreDetail?.totalStarsCount!) * 100).toFixed(
                    2
                  )
                "
                class="mx-n5"
                color="dark-blue"
                height="9"
                rounded
              ></v-progress-linear>

              <template v-slot:prepend>
                <span>{{ item.starsNum }}</span>
                <v-icon class="mx-3" icon="mdi-star"></v-icon>
              </template>

              <template v-slot:append>
                <div class="rating-values">
                  <span class="d-flex justify-end"> {{ item.count }} </span>
                </div>
              </template>
            </v-list-item>
          </v-list>
          <div
            class="px-3 mt-4 font-black flex items-center animate__animated animate__fadeIn"
            v-if="scoreDetail?.isRating"
          >
            您的评星为：
            <SvgIcon
              name="star"
              class="ml-2 animate__animated animate__heartBeat"
              size="17"
              v-for="_item in scoreDetail?.MyStar"
            ></SvgIcon>
          </div>
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
