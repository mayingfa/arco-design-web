<template>
  <div class="navbar">
    <div class="left-side">
      <a-space>
        <img class="navbar-logo" :src="logImage" alt="logo" />
        <a-typography-title
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          Arco Design Starter
        </a-typography-title>
      </a-space>
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip content="消息通知">
          <div class="message-box-trigger">
            <a-badge :count="9" dot>
              <a-button
                class="nav-btn"
                type="outline"
                :shape="'circle'"
                @click="setPopoverVisible"
              >
                <icon-notification />
              </a-button>
            </a-badge>
          </div>
        </a-tooltip>
        <a-popover
          trigger="click"
          :arrow-style="{ display: 'none' }"
          :content-style="{ padding: 0, width: '412px' }"
          content-class="message-popover"
        >
          <div ref="refBtn" class="ref-btn"></div>
          <template #content>
            <message-box />
          </template>
        </a-popover>
      </li>
      <li>
        <a-tooltip
          :content="
            theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'
          "
        >
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="toggleTheme"
          >
            <template #icon>
              <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="页面配置">
          <a-button
            class="nav-btn"
            type="outline"
            :shape="'circle'"
            @click="setVisible"
          >
            <template #icon>
              <icon-settings />
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar :size="32" :style="{ marginRight: '8px' }">
            <img alt="avatar" :src="avatar" />
          </a-avatar>
          <template #content>
            <a-doption>
              <a-space @click="switchRoles">
                <icon-tag />
                <span> 切换角色 </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'info' })">
                <icon-user />
                <span> 用户中心 </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'setting' })">
                <icon-settings />
                <span> 用户设置 </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span> 退出登录 </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useDark, useToggle } from '@vueuse/core';
import { useAppStore, useUserStore } from '@/store';
import useUser from '@/hooks/user';
import logImage from '@/assets/icons/arco-logo.svg?url';
import MessageBox from '../message-box/index.vue';

export default defineComponent({
  components: {
    MessageBox,
  },
  setup() {
    const appStore = useAppStore();
    const userStore = useUserStore();
    const { logout } = useUser();
    const avatar = computed(() => {
      return userStore.avatar;
    });
    const theme = computed(() => {
      return appStore.theme;
    });
    const isDark = useDark({
      selector: 'body',
      attribute: 'arco-theme',
      valueDark: 'dark',
      valueLight: 'light',
      storageKey: 'arco-theme',
      onChanged(dark: boolean) {
        appStore.toggleTheme(dark);
      },
    });
    const toggleTheme = useToggle(isDark);
    const setVisible = () => {
      appStore.updateSettings({ globalSettings: true });
    };
    const refBtn = ref();
    const triggerBtn = ref();
    const setPopoverVisible = () => {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      refBtn.value.dispatchEvent(event);
    };
    const handleLogout = () => {
      logout();
    };
    const setDropDownVisible = () => {
      const event = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      triggerBtn.value.dispatchEvent(event);
    };
    const switchRoles = async () => {
      const res = await userStore.switchRoles();
      Message.success(res as string);
    };
    return {
      theme,
      avatar,
      toggleTheme,
      setVisible,
      setPopoverVisible,
      refBtn,
      triggerBtn,
      handleLogout,
      setDropDownVisible,
      switchRoles,
      logImage,
    };
  },
});
</script>

<style scoped lang="less">
.navbar {
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: var(--color-bg-2);
  border-bottom: 1px solid var(--color-border);

  .navbar-logo {
    width: 33px;
    height: 33px;
  }
}

.left-side {
  display: flex;
  align-items: center;
  padding-left: 20px;
}

:deep(.arco-list) {
  .arco-list-content {
    max-height: 258px;
    overflow-y: auto;

    .arco-list-item {
      position: relative;
    }
  }

  .arco-list-content::-webkit-scrollbar {
    width: 9px;
    height: 9px;
  }

  .arco-list-content::-webkit-scrollbar-thumb {
    background-color: #ddd;
    background-clip: padding-box;
    border-radius: 2em;
  }

  .arco-list-content::-webkit-scrollbar-track-piece {
    background-color: #f8f8f8;
    border-radius: 2em;
  }
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    color: rgb(var(--gray-8));
    font-size: 16px;
    border-color: rgb(var(--gray-2));
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
  }
}
</style>

<style lang="less">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
