<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Send } from "lucide-vue-next";
import img from "@/assets/img/bgc.png";
import API from "@/api";
import { get_message_res } from "@/api/backend/message/type";
import Dialog from "./components/dialog.vue";
import createUserStore from "@/store/modules/user";

const userStore = createUserStore();
const page = ref(1);
const dialog_ref = ref();

/** @module 留言列表 */
const list = ref<get_message_res["records"]>([]);
const getMessageList = async () => {
  const res = await API.Message.get_message_list_AJAX({
    page: page.value,
    size: 10,
  });
  list.value = res.data.records;
};
onMounted(() => {
  getMessageList();
});
</script>
<template>
  <div class="w-screen min-h-screen">
    <!-- 图片组件 -->
    <v-card class="mx-auto" elevated="15">
      <v-row dense>
        <v-col :cols="12">
          <v-card>
            <v-img
              :src="img"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="300px"
              cover
            >
              <v-card-title class="text-white">留言板</v-card-title>
              <v-card-text class="text-white"
                >在留言簿中留下您的意见和见解</v-card-text
              >
              <v-card-text>
                <v-btn
                  class="mt-2"
                  type="submit"
                  :disabled="!userStore.userInfo"
                  @click="dialog_ref.visable = true"
                >
                  <template v-slot:prepend> <Send :size="13" /></template>

                  留个言</v-btn
                ></v-card-text
              >
            </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-card>

    <v-container class="mb-6 mt-3">
      <v-row class="mb-3">
        <v-col v-for="i in list" :key="i.id" cols="12" md="4">
          <v-card class="mx-auto">
            <template v-slot:prepend>
              <v-avatar color="grey-darken-3" :image="i.user.avatar"></v-avatar>
              <v-list-item-title class="ml-3">{{
                i.user.username
              }}</v-list-item-title>
            </template>
            <v-card-text class="py-2"> {{ i.createdAt }} </v-card-text>

            <v-card-text class="py-2">
              {{ i.content }}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="w-100">
                <template v-slot:append>
                  <div class="justify-self-end">
                    <v-icon class="me-1" size="17" icon="mdi-heart"></v-icon>
                    <span class="subheading me-2">{{ i.praise }}</span>
                    <span class="me-1">·</span>
                    <v-icon
                      class="me-1"
                      size="17"
                      icon="mdi-share-variant"
                    ></v-icon>
                    <span class="subheading">45</span>
                  </div>
                </template>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <div class="flex justify-end">
        <v-pagination v-model="page" :length="3" class=""></v-pagination>
      </div>
    </v-container>

    <Dialog
      ref="dialog_ref"
      @updataList="
        () => {
          page = 1;
          getMessageList();
        }
      "
    ></Dialog>
  </div>
</template>
<style lang="scss" scoped></style>
