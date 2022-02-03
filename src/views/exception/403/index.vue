<template>
  <div class="container">
    <Breadcrumb :items="['异常页', '403']" />
    <div class="content">
      <a-result
        class="result"
        status="403"
        subtitle="对不起，您没有访问该资源的权限"
      />
      <a-button key="back" type="primary"> 返回 </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
