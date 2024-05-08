<script setup lang="ts">
import Footer from "./components/Footer/index.vue";
import BlogsGroup from "./components/BlogsGroup/index.vue";
import LeaveMsg from "./components/LeaveMsg/index.vue";
import Motivational from "./components/Motivational/index.vue";
import Three from "./components/Three/index.vue";

import { ref } from "vue";

const Motivational_ref = ref();

const goMotivational = () => {
  console.log(Motivational_ref.value.$el);
  Motivational_ref.value.$el.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
};
</script>
<template>
  <div class="w-screen min-h-screen">
    <!-- 星系 -->
    <Three @goMotivational="goMotivational"></Three>

    <!-- 个人语录 -->
    <Motivational ref="Motivational_ref"></Motivational>

    <!-- 博客组 -->
    <BlogsGroup></BlogsGroup>

    <!-- 留言组 -->
    <LeaveMsg></LeaveMsg>

    <!-- 页脚 -->
    <Footer></Footer>
  </div>
</template>
<style lang="scss" scoped></style>
