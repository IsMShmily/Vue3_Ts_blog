<script setup lang="ts">
/** @module 留言模态框 */
import { ref } from "vue";
import API from "@/api";
import { useToast } from "@/hook/useToast";

interface IEmits {
  (e: "updataList"): void;
}
const { showToast } = useToast();
const visable = ref(false);
const isValid = ref(false);
const content = ref("");
const contentRef = ref();
const emits = defineEmits<IEmits>();
const contentRules = [
  (value: any) => {
    if (value?.length > 0) return true;
    return "留言消息不能为空";
  },
  (v: any) => v?.length <= 50 || "留言消息不能超过50个字符",
];

/** 发送消息 */
const sendMessage = async () => {
  const res = await API.Message.add_message_AXJAX({
    content: content.value,
  });
  if (res.code == 200) {
    contentRef.value.reset();
    contentRef.value.resetValidation();
    visable.value = false;
    showToast("留言成功！", "success");
    emits("updataList");
  } else {
    showToast(`${res.msg}`, "error");
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

      <v-form class="w-full" v-model="isValid">
        <v-textarea
          ref="contentRef"
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
          <template v-slot:append>
            <v-icon icon="mdi-send-check-outline"></v-icon
          ></template>
          发送</v-btn
        >
      </template>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
