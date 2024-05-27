<script setup lang="ts">
import { onMounted, ref } from "vue";
import { get_message_res } from "@/api/backend/message/type";
import API from "@/api";
const list = ref<get_message_res["records"]>([]);
const getMessageList = async () => {
  const res = await API.Message.get_message_list_AJAX({
    page: 1,
    size: 3,
  });
  list.value = res.data.records;
};
onMounted(() => {
  getMessageList();
});
</script>
<template>
  <v-container class="mb-6">
    <h1 class="my-4 font-semibold text-xl flex justify-center">Guestbook</h1>
    <div class="mb-10 flex justify-center text-center">
      Exploring Conversations: A Journey through the Guestbook
    </div>
    <v-row class="mb-6">
      <v-col v-for="i in list" :key="i.id" cols="12" md="4">
        <v-card class="mx-auto">
          <template v-slot:prepend>
            <v-avatar color="grey-darken-3" :image="i.user.avatar"></v-avatar>
            <v-list-item-title class="ml-3">{{
              i.user.username
            }}</v-list-item-title>
          </template>
          <v-card-text class="py-2"> {{ i.createdAt }} </v-card-text>

          <v-card-text class="py-2 min-h-17">
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
  </v-container>
</template>

<style lang="scss" scoped></style>
