<script setup lang="ts">
import Info from "./components/Info/index.vue";
import Chat from "./components/Chat/index.vue";
import { ref } from "vue";
const tab = ref("one");
</script>
<template>
  <v-card>
    <v-tabs v-model="tab">
      <v-tab value="one">我的信息</v-tab>
      <v-tab value="two" disabled>聊天室</v-tab>
    </v-tabs>

    <v-window v-model="tab" class="p-5">
      <v-window-item value="one"> <Info /> </v-window-item>
      <v-window-item value="two"> <Chat /> </v-window-item>
    </v-window>
  </v-card>
</template>
<style lang="scss" scoped></style>
