<script setup lang="ts">
import router from "@/router";
import avatar from "@/assets/img/myAvavar.jpg";
import API from "@/api";
import { onMounted, ref } from "vue";
import type { blogs_detail_res } from "@/api/backend/blogs/type";
import createUserStore from "@/store/modules/user";
import dayjs from "dayjs";

// const text = ref("");
const userStore = createUserStore();
const love = async () => {
  const res = await API.Blogs.like_blogs_AJAX({
    blogId: detail.value?.id!,
  });
  console.log(res);
  if (res.code == 200) {
    getBlogsDetail();
  }
};
// const editorChange = (a, b) => {
//   console.log("a", a);

// };

/** 获取博客详情 */
const detail = ref<blogs_detail_res>();

const id = router.currentRoute.value.query.id;

const getBlogsDetail = async () => {
  const res = await API.Blogs.get_blogs_detail_AXJAX({
    id: Number(id),
    userId: userStore.userInfo?.id,
  });
  detail.value = res.data;
};

onMounted(() => {
  getBlogsDetail();
});
</script>

<template>
  <v-container>
    <v-row class="flex-child text-subtitle-2">
      <v-col class="d-flex h-fit" cols="12" md="3">
        <v-sheet class="d-flex w-full p-3" rounded :elevation="2">
          <sheet-footer class="w-full">
            <div class="w-full flex flex-col">
              <div class="flex items-center">
                <v-avatar :image="avatar"></v-avatar>
                <span class="ml-2">@shmily_yy</span>
              </div>

              <div class="flex items-center ml-2 mt-2">
                <div class="flex items-center">
                  <SvgIcon name="look" size="20"></SvgIcon>
                  <div class="ml-1 text-xs font-bold">{{ detail?.browse }}</div>
                </div>
                <v-btn @click.stop="love" variant="text" class="ml-2">
                  <SvgIcon
                    name="love"
                    size="20"
                    class="animate__animated animate__tada"
                    v-if="detail?.isLike"
                  ></SvgIcon>
                  <SvgIcon
                    name="love-no"
                    size="18"
                    v-else
                    class="animate__animated animate__tada"
                  ></SvgIcon>
                  <div class="ml-1 text-xs font-bold">{{ detail?.praise }}</div>
                </v-btn>
              </div>

              <div class="mt-5">
                <div class="font-black mb-2">热门文章</div>
                <div class="text-slate-500 ml-1">
                  <div class="cursor-pointer mt-1">react 重定向...</div>
                  <div class="cursor-pointer mt-1">vue router 重定向...</div>
                  <div class="cursor-pointer mt-1">next 路由解析...</div>
                </div>
              </div>

              <v-btn
                class="mt-5 w-fit"
                prepend-icon="mdi-arrow-left"
                variant="text"
                @click="
                  () => {
                    router.back();
                  }
                "
              >
                返回列表
              </v-btn>
            </div>
          </sheet-footer>
        </v-sheet>
      </v-col>

      <v-col class="d-flex" cols="12" md="9">
        <v-sheet class="d-flex w-full p-5" :elevation="1" rounded height="">
          <sheet-footer class="w-full">
            <div class="text-center w-full text-stone-400">
              {{ dayjs(detail?.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
            </div>
            <div class="text-xl text-center w-full mt-2">
              {{ detail?.title }}
            </div>
            <v-divider class="my-5" :thickness="2"></v-divider>
            <!-- <div class="mt-1" v-highlight v-html="detail?.description"></div> -->
            <!-- <v-md-editor
                  v-model="text"
                  @change="editorChange"
                  height="400px"
                ></v-md-editor> -->
            <v-md-preview :text="detail?.description"></v-md-preview>
          </sheet-footer>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped></style>
