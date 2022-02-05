<template>
  <div class="container">
    <Breadcrumb :items="['异常页', '500']" />
    <div class="content">
      <a-result
        class="result"
        status="500"
        subtitle="抱歉，服务器出了点问题～"
      />
      <a-button key="back" type="primary"> 返回 </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
