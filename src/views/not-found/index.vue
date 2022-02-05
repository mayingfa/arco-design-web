<template>
  <div class="content">
    <a-result class="result" status="404" subtitle="抱歉，页面不见了～">
    </a-result>
    <div class="operation-row">
      <a-button key="back" type="primary" @click="back"> 返回 </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const back = () => {
      router.push({ name: 'workplace' });
    };
    return {
      back,
    };
  },
});
</script>

<style scoped lang="less">
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -121px;
  margin-left: -95px;
  text-align: center;
}
</style>
