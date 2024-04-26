<script setup lang="ts">
interface Iprops {
  name: string;
  color?: string;
  size?: string;
}
defineProps<Iprops>();
</script>

<template>
  <svg aria-hidden="true" :style="{ width: size, height: size }">
    <use :xlink:href="'#icon-' + name" :fill="color" />
  </svg>
</template>

<style scoped lang="scss"></style>
