<script setup lang="ts">
/**
 * @module 弹出框（提示信息）
 */
import { ref } from "vue";
interface Props {
  snackbar_text: string;
  color?: string;
}
defineProps<Props>();
const visable = ref(false);

defineExpose({
  visable,
});
</script>

<template>
  <v-snackbar
    v-model="visable"
    :timeout="3000"
    :color="color ? color : 'grey-darken-4'"
  >
    {{ snackbar_text }}
    <template v-slot:actions>
      <v-btn color="pink" variant="text" @click="visable = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<style lang="scss" scoped></style>
