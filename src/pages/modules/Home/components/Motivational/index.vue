<script setup lang="ts">
    
</script>
<template>
     <div class="flex justify-center mt-32">
      <div class="flex justify-center items-center flex-col w-screen">
        <img src="/logo.png" class="rounded-full w-36 mb-2" alt="" />
        <div
          class="text-1xl font-semibold mt-1 title"
          content="我们终将轻舟过万山，前路亦灿灿"
        >
          我们终将轻舟过万山，前路亦灿灿
        </div>
        <div class="text-lg mt-10 font-semibold text-center w-11/12">
          We will finally sail across the mountains, and the road ahead is
          bright
        </div>
      </div>
    </div>

</template>

<style lang="scss" scoped>
    
.title {
  position: relative;
  max-width: 80%;
}
.title::before {
  content: attr(content);
  position: absolute;
  inset: 0;
  transform: rotatex(180deg) translatey(-1px) translateX(0px);
  transform-origin: 50% 100%;
  filter: blur(0.8px) brightness(1.5);
}
</style>