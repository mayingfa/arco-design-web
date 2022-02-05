<template>
  <a-col :span="24" class="panel">
    <a-row>
      <a-col class="panel-col" :span="6">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img alt="icon" :src="infoImage" />
          </a-avatar>
          <a-statistic
            title="线上总内容"
            :value="373.5"
            :precision="1"
            :value-from="0"
            animation
            show-group-separator
          >
            <template #suffix> W+ <span class="unit"> 个 </span> </template>
          </a-statistic>
        </a-space>
      </a-col>
      <a-col class="panel-col" :span="6">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img alt="icon" :src="contentImage" />
          </a-avatar>
          <a-statistic
            title="投放中内容"
            :value="368"
            :value-from="0"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit"> 个 </span>
            </template>
          </a-statistic>
        </a-space>
      </a-col>
      <a-col class="panel-col" :span="6">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img alt="icon" :src="messageImage" />
          </a-avatar>
          <a-statistic
            title="日新增评论"
            :value="8874"
            :value-from="0"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit"> 个 </span>
            </template>
          </a-statistic>
        </a-space>
      </a-col>
      <a-col class="panel-col" :span="6">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img alt="icon" :src="riseImage" />
          </a-avatar>
          <a-statistic
            title="较昨日新增"
            :value="2.8"
            :precision="1"
            :value-from="0"
            animation
          >
            <template #suffix> % <icon-caret-up class="up-icon" /> </template>
          </a-statistic>
        </a-space>
      </a-col>
    </a-row>
    <a-divider class="panel-border" />
  </a-col>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import infoImage from '@/assets/icons/info.svg?url';
import riseImage from '@/assets/icons/rise.svg?url';
import contentImage from '@/assets/icons/content.svg?url';
import messageImage from '@/assets/icons/message.svg?url';

export default defineComponent({
  setup() {
    return {
      infoImage,
      riseImage,
      contentImage,
      messageImage,
    };
  },
});
</script>

<style lang="less" scoped>
.arco-col.panel {
  margin-bottom: 0;
  padding: 16px 20px 0 20px;
}

.panel-col {
  padding-left: 43px;
  border-right: 1px solid rgb(var(--gray-2));

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    border-right: none;
  }
}

.col-avatar {
  margin-right: 12px;
  background-color: var(--color-fill-2);
}

.up-icon {
  color: rgb(var(--red-6));
}

.unit {
  margin-left: 8px;
  color: rgb(var(--gray-8));
  font-size: 12px;
}
</style>
