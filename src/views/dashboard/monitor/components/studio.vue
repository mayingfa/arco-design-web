<template>
  <a-card class="general-card" title="直播预览">
    <template #extra>
      <icon-more />
    </template>
    <div class="studio-wrapper">
      <img
        class="studio-preview"
        src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/c788fc704d32cf3b1136c7d45afc2669.png~tplv-uwbnlip3yd-webp.webp"
        alt="cover"
      />
      <div class="studio-bar">
        <div v-if="userInfo">
          <a-space :size="12">
            <a-avatar :size="24">
              <img :src="userInfo.avatar" alt="avatar" />
            </a-avatar>
            <a-typography-text> {{ userInfo.name }} 直播间 </a-typography-text>
          </a-space>
        </div>
        <a-typography-text type="secondary"> 36,000 在看 </a-typography-text>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/store';
import { UserState } from '@/store/modules/user/types';

export default defineComponent({
  setup() {
    const userStore: UserState = useUserStore();
    return {
      userInfo: userStore,
    };
  },
});
</script>

<style scoped lang="less">
.studio {
  &-preview {
    display: block;
    max-width: 600px;
    margin: 0 auto;
  }

  &-bar {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }
}
</style>
