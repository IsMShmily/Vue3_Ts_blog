<script setup lang="ts">
/**
 * @module 注册相关
 */
import API from "@/api";
import { ref } from "vue";
import { useToast } from "@/hook/useToast";

const { showToast } = useToast();
const signInDialog = ref(false);
const email = ref("");
const code = ref("");
const password = ref("");
const AlignPassword = ref("");
const loading = ref(false);
const isValid = ref(false);
const form_ref = ref();
const emailField = ref();
const pwdShow = ref(false);
const pwdShow2 = ref(false);

const rules = {
  email: [
    (v: string) => !!v || "邮箱不能为空",
    (v: string) => /.+@.+\..+/.test(v) || "请输入正确的邮箱",
  ],
  code: [
    (v: string) => !!v || "验证码不能为空",
    (v: string) => v?.length == 4 || "验证码应为4位字符",
  ],
  password: [
    (v: string) => !!v || "密码不能为空",
    (v: string) =>
      /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(v) ||
      "密码应为字母和数字组成，且不能小于6位",
  ],
  AlignPassword: [
    (v: string) => !!v || "确认密码不能为空",
    (v: string) => v === password.value || "两次输入密码不一致",
  ],
};

/** 发送验证码 */
const sendCode = async () => {
  const valid = await emailField.value.validate();
  if (valid.length) return;
  loading.value = true;
  const res = await API.getCode_AJAX({ email: email.value });
  loading.value = false;
  if (res.code == 200) {
    showToast("发送成功！", "success");
  } else {
    showToast(`发送失败：${res.msg}`, "error");
  }
};

/** 注册 */
const register = async () => {
  if (password.value != AlignPassword.value) {
    showToast("两次密码不一致", "error");
    return;
  }
  const { valid } = await form_ref.value.validate();
  if (valid) {
    const res = await API.Login.register_AJAX({
      email: email.value,
      code: code.value,
      password: password.value,
    });
    if (res.code == 200) {
      form_ref.value.reset();
      form_ref.value.resetValidation();
      signInDialog.value = false;
      showToast("注册成功", "success");
    } else {
      showToast(`注册失败：${res.msg}`, "error");
    }
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
          <v-form class="w-full" ref="form_ref" v-model="isValid">
            <v-text-field
              hide-details="auto"
              ref="emailField"
              v-model="email"
              label="邮箱"
              placeholder="johndoe@163.com"
              :rules="rules.email"
            ></v-text-field>
            <v-text-field
              v-model="code"
              :loading="loading"
              class="mt-4"
              label="输入验证码"
              hide-details="auto"
              :rules="rules.code"
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
            <v-text-field
              :append-icon="pwdShow ? 'mdi-eye' : 'mdi-eye-off'"
              class="mt-4"
              v-model="password"
              :type="pwdShow ? 'text' : 'password'"
              hint="密码应为字母和数字组成，且不能小于6位"
              hide-details="auto"
              label="密码"
              :rules="rules.password"
              @click:append="pwdShow = !pwdShow"
            ></v-text-field>
            <v-text-field
              class="mt-4"
              v-model="AlignPassword"
              hide-details="auto"
              label="再次输入密码"
              :type="pwdShow2 ? 'text' : 'password'"
              :append-icon="pwdShow2 ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="pwdShow2 = !pwdShow2"
              :rules="rules.AlignPassword"
            ></v-text-field>
            <v-card-actions class="my-2 d-flex justify-end">
              <v-btn
                class="text-none"
                rounded="xl"
                text="注册"
                @click="register"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-account-plus"></v-icon> </template
              ></v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped></style>
