<script setup lang="ts">
import { ref } from "vue";
const model = ref(null);
</script>
<template>
  <v-sheet class="mx-auto mt-14">
    <v-slide-group
      v-model="model"
      selected-class="bg-primary"
      show-arrows
      center-active
    >
      <v-slide-group-item
        v-for="n in 15"
        :key="n"
        v-slot="{ isSelected, toggle, selectedClass }"
      >
        <v-card
          :class="['ma-4', selectedClass]"
          color="grey-lighten-1"
          height="200"
          width="300"
          @click="toggle"
        >
          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                v-if="isSelected"
                color="white"
                icon="mdi-close-circle-outline"
                size="48"
              ></v-icon>
            </v-scale-transition>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="model != null" height="200">
        <div class="d-flex fill-height align-center justify-center">
          <h3 class="text-h6">Selected {{ model }}</h3>
        </div>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
</template>
<style lang="scss" scoped></style>
