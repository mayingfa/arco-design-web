<template>
  <a-drawer
    :width="300"
    unmount-on-close
    :visible="visible"
    cancel-text="关闭"
    ok-text="复制配置"
    @ok="copySettings"
    @cancel="cancel"
  >
    <template #title> 页面配置 </template>
    <Block :options="contentOpts" title="内容区域" />
    <Block :options="othersOpts" title="其他设置" />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { Message } from '@arco-design/web-vue';
import { useAppStore } from '@/store';
import Block from './block.vue';

export default defineComponent({
  components: {
    Block,
  },
  emits: ['cancel'],
  setup(props, { emit }) {
    const appStore = useAppStore();
    const { copy } = useClipboard();
    const visible = computed(() => appStore.globalSettings);
    const contentOpts = [
      { name: '导航栏', key: 'navbar', defaultVal: true },
      { name: '菜单栏', key: 'menu', defaultVal: true },
      { name: '底部', key: 'footer', defaultVal: true },
      {
        name: '菜单宽度 (px)',
        key: 'menuWidth',
        defaultVal: appStore.menuWidth,
        type: 'number',
      },
    ];
    const othersOpts = [
      { name: '色弱模式', key: 'colorWeek', defaultVal: false },
    ];

    const cancel = () => {
      appStore.updateSettings({ globalSettings: false });
      emit('cancel');
    };
    const copySettings = async () => {
      const text = JSON.stringify(appStore.$state, null, 2);
      await copy(text);
      Message.success('复制成功');
    };
    return {
      visible,
      contentOpts,
      othersOpts,
      copySettings,
      cancel,
    };
  },
});
</script>
