<template>
  <a-carousel indicator-type="slider" show-arrow="hover" auto-play>
    <a-carousel-item v-for="(src, idx) in imageSrc" :key="idx">
      <div>
        <img class="banner" :src="src" alt="banner" />
      </div>
    </a-carousel-item>
  </a-carousel>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import birdImage from '@/assets/svg/bird.svg?url';
import bannerImage from '@/assets/svg/banner-1.svg?url';

const imageSrc = [bannerImage, birdImage];
export default defineComponent({
  setup() {
    return {
      imageSrc,
    };
  },
});
</script>

<style scoped lang="less">
.arco-carousel {
  width: 100%;
  height: 170px;
  overflow: hidden;
  border-radius: 4px;
}

.banner {
  width: 280px;
  height: 170px;
  background-color: #fff;
}

:deep(.arco-carousel-arrow > div) {
  background-color: rgba(0, 0, 0, 0.3);
}

:deep(.arco-carousel-arrow > div:hover) {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
