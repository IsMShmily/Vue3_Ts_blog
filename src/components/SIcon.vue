<script setup lang="ts">
import { computed } from "vue";
import * as icons from "lucide-vue-next";

interface Iprops {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  defaultClass?: string;
}
const props = defineProps<Iprops>();

const icon = computed(() => icons[props.name]);
</script>

<template>
  <component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :default-class="defaultClass"
  />
</template>
