<script setup lang="ts">
import { onMounted, ref } from "vue";
import API from "@/api";
import { get_blogs_list_res } from "@/api/backend/blogs/type";

const model = ref(null);
const list = ref<get_blogs_list_res["records"]>([]);

/** 获取文章列表 */
const getList = async () => {
  const res = await API.Blogs.get_blogs_list_AXJAX({
    categoryId: null,
    page: 1,
    size: 10,
  });
  list.value = res.data.records;
};
onMounted(() => {
  getList();
});
</script>
<template>
  <v-sheet class="mx-auto mt-14">
    <v-slide-group
      v-model="model"
      selected-class="bg-primary"
      show-arrows
      center-active
    >
      <v-slide-group-item
        v-for="n in list"
        :key="n.id"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          :class="['ma-4', selectedClass]"
          height="200"
          width="300"
          @click="toggle"
        >
          <img
            src="@/assets/logo.png"
            class="w-100 h-100 absolute left-0 right-0 z-0"
            lt=""
          />
          <div class="absolute left-0 bottom-0 z-10 w-full px-3 py-3 bg-black-50">
            <div>{{ n.title }}</div>
          </div>

          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                v-if="isSelected"
                color="white"
                icon="mdi-close-circle-outline"
                size="48"
              ></v-icon>
            </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="model != null" height="200">
        <div class="d-flex fill-height justify-center flex-col items-center">
          <div class="pl-20 pr-20 pb-5 text-center leading-6">
            {{ list[model].brief }}
          </div>
          <div class="self-end mr-15">
            <v-btn variant="text">去详情 </v-btn>
          </div>
          <div class="self-end mr-15">
            {{ list[model].createdAt }}
          </div>
        </div>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>
<style lang="scss" scoped>
.a {
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
