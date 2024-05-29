<script setup lang="ts">
/**
 * @module 已有账号登录
 */
import { ref } from "vue";
import Register from "./register.vue";
import API from "@/api";
import Snackbar from "@/components/basic/Snackbar/index.vue";
import useUserStore from "@/store/modules/user";

const LoginDialogstatus = ref(false);
const Register_ref = ref();
const color = ref("");

const openSignInDiaog = () => {
  Register_ref.value.signInDialog = true;
};
const rules = {
  email: [
    (v: string) => !!v || "邮箱不能为空",
    (v: string) => /.+@.+\..+/.test(v) || "请输入正确的邮箱",
  ],
  password: [
    (v: string) => !!v || "密码不能为空",
    (v: string) =>
      /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(v) ||
      "密码应为字母和数字组成，且不能小于6位",
  ],
};

const isValid = ref(false);
const email = ref("");
const password = ref("");
const snackbar_text = ref("");
const Snackbar_ref = ref();
const form_ref = ref();

const login = async () => {
  const { valid } = await form_ref.value.validate();
  if (valid) {
    const res = await API.Login.login_AJAX({
      email: email.value,
      password: password.value,
    });
    if (res.code == 200) {
      color.value = "success";
      email.value = "";
      password.value = "";
      await useUserStore().setUserInfo(res.data);
      LoginDialogstatus.value = false;
    } else {
      color.value = "error";
      snackbar_text.value = `登录失败：${res.msg}`;
      Snackbar_ref.value.visable = true;
    }
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
          <div class="text-medium-emphasis">请输入您的用户名和密码</div>
        </v-card-text>
        <v-form class="w-full" ref="form_ref" v-model="isValid">
          <v-card-text>
            <v-text-field
              v-model="email"
              hide-details="auto"
              :rules="rules.email"
              label="邮箱"
            ></v-text-field>
          </v-card-text>

          <v-card-text>
            <v-text-field
              v-model="password"
              hide-details="auto"
              :rules="rules.password"
              label="密码"
            ></v-text-field
          ></v-card-text>
        </v-form>

        <v-divider class="mt-2"></v-divider>

        <v-card-actions class="my-2 d-flex justify-end">
          <v-btn class="text-none" text="去注册" @click="openSignInDiaog">
            <template v-slot:prepend>
              <v-icon icon="mdi-account-convert"></v-icon> </template
          ></v-btn>

          <v-btn
            prepend-icon="$vuetify"
            class="text-none"
            text="登录"
            @click="login"
          >
            <template v-slot:prepend>
              <v-icon icon="mdi-arrow-up-bold-box-outline"></v-icon> </template
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
