<script setup lang="ts">
import API from "@/api";
import { get_blogs_list_res } from "@/api/backend/blogs/type";
import { get_category_list_res } from "@/api/backend/type/type";
import SvgIcon from "@/components/SvgIcon.vue";
import router from "@/router";
import createUserStore from "@/store/modules/user";
import { onMounted, ref } from "vue";
import dayjs from "dayjs";

const tabActive = ref(0);
const userStore = createUserStore();

/** @module 顶部tab相关 */
const categoryList = ref<get_category_list_res["records"]>([]);
/** 获取分类列表 */
const getCategoryList = async () => {
  const res = await API.Type.get_category_list_AJAX({
    page: 1,
    size: 10,
  });
  categoryList.value = [
    {
      id: 0,
      categoryName: "全部",
      createdAt: "",
      updatedAt: "",
    },
    ...res.data.records,
  ];
};
const tabChange = () => {
  getList();
};

/** @module 获取文章列表 */
const loading = ref(true);
const page = ref(1);
const list = ref<get_blogs_list_res["records"]>([]);

/** 获取文章列表 */
const getList = async () => {
  const res = await API.Blogs.get_blogs_list_AXJAX({
    categoryId: tabActive.value == 0 ? null : tabActive.value,
    page: page.value,
    size: 10,
    userId: userStore.userInfo?.id,
  });
  list.value = res.data.records;
  loading.value = false;
};

/** 跳转详情 */
const goDetail = (id: number) => {
  console.log(id);
  router.push(`/blogsDetail?id=${id}`);
};

const love = async (id: number) => {
  const res = await API.Blogs.like_blogs_AJAX({
    blogId: id,
  });
  if (res.code == 200) {
    getList();
  }
};
onMounted(() => {
  getList();
  getCategoryList();
});
</script>

<template>
  <div class="w-screen min-h-screen">
    <v-tabs v-model="tabActive" align-tabs="end" @click="tabChange">
      <v-tab v-for="item in categoryList" :key="item.id" :value="item.id">{{
        item.categoryName
      }}</v-tab>
    </v-tabs>
    <v-window v-model="tabActive">
      <v-window-item v-for="n in categoryList" :key="n.id" :value="n.id">
        <v-container fluid>
          <v-row>
            <v-col
              v-for="i in list"
              :key="i.id"
              cols="12"
              md="3"
              @click="goDetail(i.id)"
            >
              <v-card class="mx-auto" hover>
                <v-skeleton-loader
                  class=""
                  height="100%"
                  type="image,article, actions"
                  :loading="loading"
                >
                  <v-img
                    class="align-end text-white"
                    height="180px"
                    width="100%"
                    :src="i.thumbnail"
                    cover
                  >
                    <v-card-title class="bg-black-50"
                      ><div class="text-hide-one ">
                        {{ i.title }}
                      </div></v-card-title
                    >
                  </v-img>
                  <v-card-subtitle class="pt-4">
                    {{ dayjs(i.createdAt).format("YYYY-MM-DD HH:mm:ss") }}
                  </v-card-subtitle>
                  <v-card-text class="text-hide-one">
                    {{ i.brief }}
                  </v-card-text>
                  <v-card-actions class="justify-end">
                    <SvgIcon name="look" size="20" class="ml-2"></SvgIcon>
                    <div class="ml-1 text-xs font-bold">{{ i.browse }}</div>
                    <v-btn class="ml-3" @click.stop="love(i.id)">
                      <SvgIcon name="love" size="20" v-if="i?.isLike"></SvgIcon>
                      <SvgIcon name="love-no" size="16" v-else></SvgIcon>
                      <div class="ml-1 text-xs font-bold">{{ i.praise }}</div>
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
