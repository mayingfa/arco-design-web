<template>
  <div
    class="header"
    :style="{ backgroundImage: 'url(' + userInfoBackgroundImage + ')' }"
  >
    <a-space class="user-card" :size="10" direction="vertical" align="center">
      <a-avatar
        :size="64"
        :style="{
          backgroundColor: userInfo.avatar ? '#c9cdd4' : '#3370ff',
        }"
      >
        <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="avatar" />
        <IconUser v-else />
      </a-avatar>
      <div class="user-info">
        <a-typography-title :heading="6" style="margin: 0">
          {{ userInfo.nickName }}
        </a-typography-title>
        <div class="user-msg">
          <a-space :size="19">
            <div>
              <icon-email />
              <a-typography-text>{{ userInfo.email }}</a-typography-text>
            </div>
            <div>
              <icon-phone />
              <a-typography-text>{{ userInfo.phone }}</a-typography-text>
            </div>
          </a-space>
        </div>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '@/store';
import { UserState } from '@/store/modules/user/types';
import { GenderEnum } from '@/enums/GenderEnum';
import userInfoBackgroundImage from '@/assets/images/user-info-background.jpg';

export default defineComponent({
  setup() {
    const userStore: UserState = useUserStore();
    return {
      userInfo: userStore,
      userInfoBackgroundImage,
      GenderEnum,
    };
  },
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 204px;
  color: var(--gray-10);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 4px;

  .arco-space {
    width: 100%;
  }

  .user-info {
    padding: 10px 0;
    background: rgba(255, 255, 255, 0.5);
  }

  :deep(.user-card > .arco-space-item) {
    width: 100%;
    text-align: center;
  }

  .user-msg {
    .arco-space {
      justify-content: center;
    }

    .arco-icon {
      color: rgb(var(--gray-10));
    }

    .arco-typography {
      margin-left: 6px;
    }
  }
}
</style>
