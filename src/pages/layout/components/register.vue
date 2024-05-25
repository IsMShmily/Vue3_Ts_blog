<script setup lang="ts">
/**
 * @module 注册相关
 */
import API from "@/api";
import { ref } from "vue";
import Snackbar from "@/components/basic/Snackbar/index.vue";

const signInDialog = ref(false);
const email = ref("");
const code = ref("");
const password = ref("");
const AlignPassword = ref("");
const loading = ref(false);
const snackbar_text = ref("");
const Snackbar_ref = ref();
const color = ref("");
/** 发送验证码 */
const sendCode = async () => {
  loading.value = true;
  const res = await API.getCode_AJAX({ email: email.value });
  loading.value = false;
  if (res.code == 200) {
    color.value = "success";
    snackbar_text.value = "发送成功！";

    Snackbar_ref.value.visable = true;
  } else {
    color.value = "error";
    Snackbar_ref.value.visable = true;
    snackbar_text.value = `发送失败：${res.msg}`;
  }
};

/** 注册 */
const register = async () => {
  if (password.value != AlignPassword.value) {
    Snackbar_ref.value.visable = true;
    snackbar_text.value = `两次密码不一致`;
    return;
  }
  const res = await API.Login.register_AJAX({
    email: email.value,
    code: code.value,
    password: password.value,
  });
  if (res.code == 200) {
    code.value = "";
    password.value = "";
    AlignPassword.value = "";
    email.value = "";
    signInDialog.value = false;
    snackbar_text.value = `注册成功`;
    Snackbar_ref.value.visable = true;
  } else {
    Snackbar_ref.value.visable = true;
    snackbar_text.value = `注册失败：${res.msg}`;
  }
};
defineExpose({
  signInDialog,
});
</script>

<template>
  <v-dialog v-model="signInDialog" max-width="500">
    <template v-slot:default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">注册您的账号</div>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-title>
        <v-card-text>
          <div class="text-medium-emphasis mb-4">请输入您的用户名和密码</div>
          <v-text-field
            hide-details="auto"
            v-model="email"
            label="邮箱"
            placeholder="johndoe@163.com"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="code"
            :loading="loading"
            density="compact"
            label="输入验证码"
            hide-details="auto"
          >
            <template v-slot:append>
              <v-btn @click="sendCode">
                获取验证码
                <template v-slot:append>
                  <v-icon icon="mdi-email-arrow-right"></v-icon>
                </template>
              </v-btn>
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="password"
            hide-details="auto"
            label="密码"
          ></v-text-field
        ></v-card-text>
        <v-card-text>
          <v-text-field
            v-model="AlignPassword"
            hide-details="auto"
            label="再次输入密码"
          ></v-text-field
        ></v-card-text>
        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn
            class="text-none"
            rounded="xl"
            text="注册"
            @click="register"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

  <Snackbar
    :snackbar_text="snackbar_text"
    :color="color"
    ref="Snackbar_ref"
  ></Snackbar>
</template>

<style lang="scss" scoped></style>
