<template>
  <div class="container">
    <Breadcrumb :items="['异常页', '404']" />
    <div class="content">
      <a-result class="result" status="404" subtitle="抱歉，页面不见了～">
      </a-result>
      <div class="operation-row">
        <a-button key="again" style="margin-right: 16px"> 重试 </a-button>
        <a-button key="back" type="primary"> 返回 </a-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
