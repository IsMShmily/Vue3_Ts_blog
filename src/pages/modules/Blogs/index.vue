<script setup lang="ts">
import API from "@/api";
import { get_blogs_list_res } from "@/api/backend/blogs/type";
import { get_category_list_res } from "@/api/backend/type/type";
import SvgIcon from "@/components/SvgIcon.vue";
import { onMounted, ref } from "vue";

const tabActive = ref(0);

/** @module 顶部tab相关 */
const categoryList = ref<get_category_list_res["records"]>([]);
/** 获取分类列表 */
const getCategoryList = async () => {
  const res = await API.Type.get_category_list_AJAX({
    page: 1,
    size: 10,
  });
  categoryList.value = res.data.records;
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
  });
  list.value = res.data.records;
  loading.value = false;
};

onMounted(() => {
  getList();
  getCategoryList();
});
</script>

<template>
  <div class="w-screen min-h-screen">
    <v-tabs v-model="tabActive" align-tabs="end" @click="tabChange">
      <v-tab :value="0">全部</v-tab>
      <v-tab v-for="item in categoryList" :key="item.id" :value="item.id">{{
        item.categoryName
      }}</v-tab>
    </v-tabs>
    <v-window v-model="tabActive">
      <v-window-item v-for="n in categoryList" :key="n.id" :value="n.id">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in list" :key="i.id" cols="12" md="3">
              <v-card class="mx-auto" hover>
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
                    <v-card-title>{{ i.title }}</v-card-title>
                  </v-img>
                  <v-card-subtitle class="pt-4">
                    {{ i.createdAt }}
                  </v-card-subtitle>
                  <v-card-text>
                    <div>
                      {{ i.brief }}
                    </div>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn>
                      <SvgIcon name="love" size="20"></SvgIcon>
                      <div class="ml-1 text-xs font-bold">{{ i.praise }}</div>
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
