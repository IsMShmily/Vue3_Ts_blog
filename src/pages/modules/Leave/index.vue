<script setup lang="ts">
import { ref } from "vue";
import { Send } from "lucide-vue-next";
import img from "@/assets/img/bgc.png";
const page = ref(1);
const dialog = ref(false);
const content = ref("");
const contentRules = [
  (value: any) => {
    if (value?.length > 3) return true;
    return "留言消息不能为空";
  },
];
</script>
<template>
  <div class="w-screen min-h-screen">
    <!-- dialog -->
    <v-dialog v-model="dialog" width="auto">
      <v-card class="px-5 py-5" min-width="330" max-width="600">
        <div class="mb-2 text-xl">留言</div>
        <div class="mb-3 text-xs">在留言簿中留下您的意见和见解</div>
        <v-form fast-fail @submit.prevent class="w-full">
          <v-text-field
            v-model="content"
            :rules="contentRules"
            label="留言消息"
          ></v-text-field>
        </v-form>
        <template v-slot:actions>
          <v-btn class="ms-auto" @click="dialog = false">
            <template v-slot:prepend> <Send :size="13" /></template>

            发送</v-btn
          >
        </template>
      </v-card>
    </v-dialog>
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
                <v-btn class="mt-2" type="submit" @click="dialog = true">
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
        <v-col v-for="i in 6" :key="i" cols="12" md="4">
          <v-card class="mx-auto">
            <template v-slot:prepend>
              <v-avatar
                color="grey-darken-3"
                image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-avatar>
              <v-list-item-title class="ml-3">大闹天宫</v-list-item-title>
            </template>
            <v-card-text class="py-2"> 2024-10-12 14:31:20 </v-card-text>

            <v-card-text class="py-2">
              "Turns out semicolon-less style is easier and safer in TS because
              most gotcha edge cases are type invalid as well."
            </v-card-text>

            <v-card-actions>
              <v-list-item class="w-100">
                <template v-slot:append>
                  <div class="justify-self-end">
                    <v-icon class="me-1" size="17" icon="mdi-heart"></v-icon>
                    <span class="subheading me-2">256</span>
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
        <v-pagination v-model="page" :length="5" class=""></v-pagination>
      </div>
    </v-container>
  </div>
</template>
<style lang="scss" scoped></style>
