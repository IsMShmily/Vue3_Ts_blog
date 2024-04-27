<script setup lang="ts"></script>
<template>
  <v-main>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </v-main>
</template>
<style lang="scss" scoped>
.main {
  background-color: #ccc;
}
// -------渐隐
/* 路由切换动画 */
.fade-enter-from,
.fade-leave-to {
  /*定义进入开始和离开结束的透明度为0*/
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  /*定义进入结束和离开开始的透明度为1*/
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  /*定义进入和离开过渡状态的透明度变化的时间和变化曲线*/
  transition: opacity 0.2s ease;
}

// -------从上向下
.top-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}

.top-enter-to {
  transform: translateY(0px);
}

.top-leave-from {
  transform: translateY(0);
}

.top-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.top-enter-active,
.top-leave-active {
  transition: all 0.3s;
}
// ---------从左向右
.left-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.left-enter-to {
  transform: translateX(0px);
}

.left-leave-from {
  transform: translateX(0);
}

.left-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.left-enter-active,
.left-leave-active {
  transition: all 0.3s;
}
</style>
