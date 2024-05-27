<script setup lang="ts">
/** @module 留言模态框 */
import { ref } from "vue";
import API from "@/api";
import Snackbar from "@/components/basic/Snackbar/index.vue";

interface IEmits {
  (e: "updataList"): void;
}

const visable = ref(false);
const isValid = ref(false);
const content = ref("");
const Snackbar_ref = ref();
const snackbar_text = ref("");
const emits = defineEmits<IEmits>();
const contentRules = [
  (value: any) => {
    if (value?.length > 0) return true;
    return "留言消息不能为空";
  },
  (v: any) => v.length <= 50 || "留言消息不能超过50个字符",
];

/** 发送消息 */
const sendMessage = async () => {
  const res = await API.Message.add_message_AXJAX({
    content: content.value,
  });
  if (res.code == 200) {
    visable.value = false;
    content.value = "";
    snackbar_text.value = "留言成功！";
    Snackbar_ref.value.visable = true;
    emits("updataList");
  } else {
    snackbar_text.value = res.msg;
    Snackbar_ref.value.visable = true;
  }
};

defineExpose({
  visable,
});
</script>
<template>
  <v-dialog v-model="visable" width="auto">
    <v-card class="px-5 py-5" min-width="330" max-width="600">
      <div class="mb-2 text-xl">留言</div>
      <div class="mb-3 text-xs">在留言簿中留下您的意见和见解</div>
      <v-form
        fast-fail
        @submit.prevent
        class="w-full"
        ref="form"
        v-model="isValid"
      >
        <v-textarea
          v-model="content"
          :rules="contentRules"
          label="留言消息"
          rows="1"
          variant="filled"
          counter
          auto-grow
        ></v-textarea>
      </v-form>
      <template v-slot:actions>
        <v-btn class="ms-auto" @click="sendMessage" :disabled="!isValid">
          <template v-slot:prepend> <Send :size="13" /></template>

          发送</v-btn
        >
      </template>
    </v-card>
  </v-dialog>
  <Snackbar :snackbar_text="snackbar_text" ref="Snackbar_ref"></Snackbar>
</template>

<style lang="scss" scoped></style>
