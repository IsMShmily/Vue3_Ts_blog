<script setup lang="ts">
/**
 * @module 已有账号登录
 */
import { ref } from "vue";
import Register from "./register.vue";
import API from "@/api";
import Snackbar from "@/components/basic/Snackbar/index.vue";
import createUserStore from "@/store/modules/user";

const LoginDialogstatus = ref(false);
const userStore = createUserStore();
const Register_ref = ref();
const color = ref("");
const openSignInDiaog = () => {
  Register_ref.value.signInDialog = true;
};

const email = ref("");
const password = ref("");
const snackbar_text = ref("");
const Snackbar_ref = ref();

const login = async () => {
  const res = await API.Login.login_AJAX({
    email: email.value,
    password: password.value,
  });
  if (res.code == 200) {
    color.value = "success";
    email.value = "";
    password.value = "";
    userStore.setUserInfo(res.data);
    LoginDialogstatus.value = false;
  } else {
    color.value = "error";
    snackbar_text.value = `登录失败：${res.msg}`;
    Snackbar_ref.value.visable = true;
  }
};

defineExpose({
  LoginDialogstatus,
});
</script>

<template>
  <v-dialog v-model="LoginDialogstatus" max-width="500">
    <template v-slot:default="{ isActive }">
      <v-card rounded="lg">
        <v-card-title class="d-flex justify-space-between align-center">
          <div class="text-h5 text-medium-emphasis ps-2">登录您的账号</div>
          <v-btn
            icon="mdi-close"
            variant="text"
            @click="isActive.value = false"
          ></v-btn>
        </v-card-title>

        <v-card-text>
          <div class="text-medium-emphasis mb-4">请输入您的用户名和密码</div>
          <v-text-field
            v-model="email"
            hide-details="auto"
            label="邮箱"
          ></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-text-field
            v-model="password"
            hide-details="auto"
            label="密码"
          ></v-text-field
        ></v-card-text>

        <v-divider class="mt-2"></v-divider>

        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn
            class="text-none"
            rounded="xl"
            text="去注册"
            @click="openSignInDiaog"
          ></v-btn>

          <v-btn
            class="text-none"
            rounded="xl"
            text="登录"
            variant="flat"
            @click="login"
          ></v-btn>
        </v-card-actions>
      </v-card>

      <!-- 注册 -->
      <Register ref="Register_ref"></Register>
    </template>
  </v-dialog>

  <Snackbar
    :snackbar_text="snackbar_text"
    :color="color"
    ref="Snackbar_ref"
  ></Snackbar>
</template>

<style lang="scss" scoped></style>
