<template>
  <div class="container">
    <Breadcrumb :items="['结果页', '失败页']" />
    <div class="wrapper">
      <a-result
        class="result"
        status="error"
        title="提交失败"
        subtitle="表单提交失败，请重试。"
      >
        <template #extra>
          <a-space class="operation-wrap" :size="16">
            <a-button key="again" type="secondary"> 回到首页 </a-button>
            <a-button key="back" type="primary"> 返回修改 </a-button>
          </a-space>
        </template>
      </a-result>

      <div class="details-wrapper">
        <a-typography-title :heading="6" style="margin-top: 0">
          错误详情
        </a-typography-title>
        <a-typography-paragraph style="margin-bottom: 0">
          <ol>
            <li>
              当前域名未备案，备案流程请查看：
              <a-link>
                <IconLink />
                备案流程
              </a-link>
            </li>
            <li> 你的用户组不具有进行此操作的权限； </li>
          </ol>
        </a-typography-paragraph>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style scoped lang="less">
.wrapper {
  padding: 24px 150px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}

.result {
  margin: 150px 0 36px 0;
}

.operation-wrap {
  margin-bottom: 40px;
  text-align: center;
}

.details-wrapper {
  width: 100%;
  margin-bottom: 150px;
  padding: 20px;
  background-color: rgb(var(--gray-1));
}
</style>
