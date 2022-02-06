<template>
  <a-card :bordered="false">
    <a-space :size="10">
      <a-upload
        action="/"
        :file-list="file ? [file] : []"
        :show-file-list="false"
        @change="onChange"
      >
        <template #upload-button>
          <a-avatar
            :size="100"
            class="info-avatar"
            trigger-type="mask"
            :style="{
              backgroundColor: file.url ? '#c9cdd4' : '#3370ff',
            }"
          >
            <template #trigger-icon>
              <icon-camera />
            </template>
            <img v-if="file.url" :src="file.url" alt="" />
            <icon-user v-else />
          </a-avatar>
        </template>
      </a-upload>
      <a-descriptions
        :data="renderData"
        :column="2"
        align="right"
        layout="inline-horizontal"
        :label-style="{
          width: '100px',
          fontWeight: 'normal',
          color: 'rgb(var(--gray-8))',
        }"
        :value-style="{
          width: '200px',
          paddingLeft: '8px',
          textAlign: 'left',
        }"
      >
        <template #label="{ label }">{{ label }} :</template>
        <template #value="{ value, data }">
          <a-tag v-if="data.label === '实名认证'" color="green" size="small">
            已认证
          </a-tag>
          <span v-else>{{ value }}</span>
        </template>
      </a-descriptions>
    </a-space>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useUserStore } from '@/store';

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const file = reactive({
      uid: '-2',
      name: 'avatar.png',
      url: userStore.avatar,
    });
    const renderData = [
      {
        label: '用户名',
        value: userStore.name,
      },
      {
        label: '实名认证',
        value: userStore.certification,
      },
      {
        label: '账号ID',
        value: userStore.accountId,
      },
      {
        label: '手机号码',
        value: userStore.phone,
      },
      {
        label: '注册时间',
        value: userStore.registrationDate,
      },
    ];
    const onChange = (_: any, currentFile: any) => {
      file.url = URL.createObjectURL(currentFile.file);
    };
    return {
      file,
      renderData,
      onChange,
    };
  },
});
</script>

<style scoped lang="less">
.arco-card {
  padding: 14px 0 4px 4px;
  border-radius: 4px;

  :deep(.arco-avatar-trigger-icon-button) {
    width: 32px;
    height: 32px;
    line-height: 32px;
    background-color: #e8f3ff;

    .arco-icon-camera {
      margin-top: 8px;
      color: rgb(var(--arcoblue-6));
      font-size: 14px;
    }
  }

  :deep(.arco-space-item:first-of-type) {
    margin-left: 10px;
  }
}
</style>
