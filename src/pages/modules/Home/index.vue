<script setup lang="ts">
import Footer from "./components/Footer/index.vue";
import BlogsGroup from "./components/BlogsGroup/index.vue";
import LeaveMsg from "./components/LeaveMsg/index.vue";
import Motivational from "./components/Motivational/index.vue";
</script>
<template>
  <div class="w-screen min-h-screen">
    <!-- 个人语录 -->
    <Motivational></Motivational>
    <!-- 博客组 -->
    <BlogsGroup></BlogsGroup>

    <!-- 留言组 -->
    <LeaveMsg></LeaveMsg>

    <!-- 页脚 -->
    <Footer></Footer>
  </div>
</template>
<style lang="scss" scoped></style>
