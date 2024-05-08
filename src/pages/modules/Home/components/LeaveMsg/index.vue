<script setup lang="ts"></script>
<template>
  <v-container class="mb-6">
    <h1 class="my-4 font-semibold text-xl flex justify-center">Guestbook</h1>
    <div class="mb-10 flex justify-center text-center">
      Exploring Conversations: A Journey through the Guestbook
    </div>
    <v-row class="mb-6">
      <v-col v-for="i in 3" :key="i" cols="12" md="4">
        <v-card class="mx-auto">
          <template v-slot:prepend>
            <v-avatar
              color="grey-darken-3"
              image="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
            ></v-avatar>
            <v-list-item-title class="ml-3">大闹天宫</v-list-item-title>
          </template>
          <v-card-text class="py-2"> 2024-10-12 14:31:20 </v-card-text>

          <v-card-text class="py-2">
            "Turns out semicolon-less style is easier and safer in TS because
            most gotcha edge cases are type invalid as well."
          </v-card-text>

          <v-card-actions>
            <v-list-item class="w-100">
              <template v-slot:append>
                <div class="justify-self-end">
                  <v-icon class="me-1" size="17" icon="mdi-heart"></v-icon>
                  <span class="subheading me-2">256</span>
                  <span class="me-1">·</span>
                  <v-icon
                    class="me-1"
                    size="17"
                    icon="mdi-share-variant"
                  ></v-icon>
                  <span class="subheading">45</span>
                </div>
              </template>
            </v-list-item>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped></style>
