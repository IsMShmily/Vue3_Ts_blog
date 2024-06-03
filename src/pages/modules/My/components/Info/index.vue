<script setup lang="ts">
import { ref } from "vue";
import API from "@/api";
import { useToast } from "@/hook/useToast";
import useUserStore from "@/store/modules/user";
const { showToast } = useToast();
import dayjs from "dayjs";

const userStore = useUserStore();
const loadingStatus = ref(false);

/** @module 修改昵称 */
const userName = ref();
const userName_text_ref = ref();
const rules = [
  (value: any) => !!value || "新的昵称不能为空.",
  (value: any) => (value && value.length >= 2) || "新的昵称不能少于2个字符.",
  (value: any) => (value && value.length <= 10) || "起这么长名字？作者不同意",
];
const updateUserName = async () => {
  const valid = await userName_text_ref.value.validate();
  console.log("valid", valid);
  if(valid && valid.length) return
  loadingStatus.value = true;
  const res = await API.Login.updateUserInfo_AJAX({
    userName: userName.value,
  });
  loadingStatus.value = false;
  if (res.data && res.code == 200) {
    userName_text_ref.value.reset();
    userName_text_ref.value.resetValidation();
    getUserInfo();
    showToast("昵称修改成功！", "success");
  } else {
    showToast("昵称修改失败！", "error");
  }
};

/** @module 修改头像 */
const imgFile = ref();
const imgUrl = ref("");
/** 上传头像 */
const changeImg = async (val: File[] | File) => {
  console.log("val", val);
  const formData = new FormData();
  formData.append("file", val as File);
  const res = await API.uploadImg_AJAX({ file: formData });
  if (res.code == 200) {
    imgUrl.value = res.data;
  } else {
    showToast("图片上传失败！", "error");
  }
};
/** 修改头像 */
const submitImg = async () => {
  loadingStatus.value = true;
  const res = await API.Login.updateUserInfo_AJAX({
    avatar: imgUrl.value,
  });
  loadingStatus.value = false;
  if (res.data && res.code == 200) {
    imgUrl.value = "";
    imgFile.value = null;
    getUserInfo();
    showToast("头像修改成功！", "success");
  } else {
    showToast("头像修改失败！", "error");
  }
};

/** @module 获取用户信息 */
const getUserInfo = async () => {
  const res = await API.Login.getUserInfo_AJAX();
  if (res.code == 200) {
    await useUserStore().setUserInfo(res.data);
  }
};

/** @module 修改密码 */
const newPassword = ref("");
const alignPassword = ref("");
const password_ref = ref();
const email = ref("");
const alignPasswordRules = [
  (v: string) => !!v || "确认密码不能为空",
  (v: string) => v === newPassword.value || "两次输入密码不一致",
];
const newPasswordRule = [
  (v: string) => !!v || "密码不能为空",
  (v: string) =>
    /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(v) ||
    "密码应为字母和数字组成，且不能小于6位",
];

const emailRules = [
  (v: string) => !!v || "邮箱不能为空",
  (v: string) => /.+@.+\..+/.test(v) || "请输入正确的邮箱",
];

const updatePassword = async () => {
  const {valid} = await password_ref.value.validate()
  console.log(valid)
  if(!valid) return
  const res = await API.Login.updateUserInfo_AJAX({
    password: alignPassword.value,
    email: email.value,
  });
  if (res.code == 200) {
    password_ref.value.reset();
    password_ref.value.resetValidation();
    getUserInfo()
    showToast("密码修改成功！", "success");
  } else {
    showToast("密码修改失败！", "error");
  }
};
</script>

<template>
  <div>
    <v-expansion-panels class="max-w-5xl">
      <!-- 个人信息 -->
      <v-card
        class="w-full"
        :subtitle="
          '绑定邮箱：' +
          `${userStore.userInfo?.email ? userStore.userInfo?.email : '暂未绑定邮箱'}`
        "
        :title="'用户名：' + `${userStore.userInfo?.userName}`"
      >
        <template v-slot:prepend>
          <v-avatar class="mr-3">
            <v-img alt="John" :src="userStore.userInfo?.avatar"></v-img>
          </v-avatar>
        </template>

        <v-card-text class="my-3"
          >加入博客时间：{{
            dayjs(userStore.userInfo?.createdAt).format("YYYY-MM-DD HH:mm:ss")
          }}</v-card-text
        >
      </v-card>

      <!-- 修改头像 -->
      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4"> 修改头像 </v-col>
            <v-col class="text--secondary" cols="8">
              <v-fade-transition leave-absolute>
                <span v-if="expanded" key="0"> 开始修改您的头像 🤩 </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-file-input
              class="max-w-2xl"
              v-model="imgFile"
              @update:modelValue="changeImg"
              accept="image/jpg, image/jpeg, image/png"
              label="上传一个您喜欢的图片"
            ></v-file-input>
          </v-row>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              @click="submitImg"
              :loading="loadingStatus"
            >
              提交！！！
            </v-btn>
          </v-card-actions>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- 修改昵称 -->
      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4"> 修改昵称 </v-col>
            <v-col class="text--secondary" cols="8">
              <v-fade-transition leave-absolute>
                <span v-if="expanded">开始修改您的昵称 🤔</span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-text-field
              class="max-w-2xl"
              :rules="rules"
              hide-details="auto"
              label="新的昵称"
              ref="userName_text_ref"
              v-model="userName"
            >
            </v-text-field>
          </v-row>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              variant="text"
              @click="updateUserName"
              :loading="loadingStatus"
            >
              提交！！！
            </v-btn>
          </v-card-actions>
        </v-expansion-panel-text>
      </v-expansion-panel>

      <!-- 修改密码 -->
      <v-expansion-panel>
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4"> 修改密码 </v-col>
            <v-col class="text--secondary" cols="8">
              <v-fade-transition leave-absolute>
                <span v-if="expanded">
                  {{
                    userStore.userInfo?.githubId
                      ? "Tip：GitHub一键登录用户 需要初始化一个邮箱哦~ "
                      : "开始修改你的密码 😎"
                  }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row no-gutters>
            <v-form
              fast-fail
              @submit.prevent
              class="w-full max-w-2xl"
              ref="password_ref"
            >
              <v-text-field
                v-if="!userStore.userInfo?.email"
                v-model="email"
                :rules="emailRules"
                label="设置您的email"
              ></v-text-field>

              <v-text-field
                v-model="newPassword"
                :rules="newPasswordRule"
                label="新的密码"
              ></v-text-field>

              <v-text-field
                v-model="alignPassword"
                :rules="alignPasswordRules"
                label="再次输入新密码"
              ></v-text-field>

              <v-btn
                class="mt-2"
                type="submit"
                block
                :loading="loadingStatus"
                @click="updatePassword"
                >提交</v-btn
              >
            </v-form>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style lang="scss" scoped></style>
