<template>
  <div class="register-form-wrapper">
    <div class="register-form-title">
      <img :src="logoIcon" alt="logo" />
      <span>Arco Design Web</span>
    </div>
    <a-form
      ref="forgotFormRef"
      :model="userInfo"
      size="large"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="email"
        :rules="emailRules"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.email"
          placeholder="请输入邮箱地址"
          style="margin-right: 8px"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-email />
          </template>
        </a-input>
        <a-button type="outline" :disabled="waiting" @click="sendEmailCode">
          {{ waiting ? `${seconds}秒后发送` : '发送验证码' }}
        </a-button>
      </a-form-item>
      <a-form-item
        field="authCode"
        :rules="[{ required: true, message: '请输入验证码' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.authCode"
          placeholder="请输入验证码"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-safe />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="newPassword"
        :rules="passwordRules"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.newPassword"
          autocomplete="new-password"
          placeholder="请输入新的密码"
          allow-clear
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          重置密码
        </a-button>
        <a-button type="outline" long @click="callLogin"> 返回 </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import useCountDown from '@/hooks/countdown';
import { Message } from '@arco-design/web-vue';
import useFormValidator from '@/hooks/form-validator';
import { ResetPasswordData } from '@/api/user';
import logoIcon from '@/assets/icons/arco-logo.svg?url';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { sendEmailAuthCode } from '@/api/send-message';

export default defineComponent({
  emits: ['callLogin'],
  setup(props, context) {
    // 表单信息
    const forgotFormRef = ref(null);
    const { emailRules, passwordRules } = useFormValidator();
    const userInfo = reactive({
      email: '',
      authCode: '',
      newPassword: '',
    });

    // 发送短信验证码
    const { waiting, seconds, countDown } = useCountDown();
    const sendEmailCode = () => {
      const target = forgotFormRef.value as any;
      target.validateField('phone', async (emailError: ValidatedError) => {
        if (!emailError) {
          countDown();
          await sendEmailAuthCode({ email: userInfo.email });
          Message.success('发送成功');
        }
      });
    };

    // 显示登录页
    const callLogin = () => {
      context.emit('callLogin');
    };

    // 重置密码
    const userStore = useUserStore();
    const { loading, setLoading } = useLoading();
    const handleSubmit = async ({
      errors,
      values,
    }: {
      errors: Record<string, ValidatedError> | undefined;
      values: ResetPasswordData;
    }) => {
      if (!errors) {
        setLoading(true);
        try {
          await userStore.resetPassword(values);
          callLogin();
          Message.success('密码重置成功');
        } finally {
          setLoading(false);
        }
      }
    };

    return {
      logoIcon,
      loading,
      userInfo,
      seconds,
      waiting,
      emailRules,
      passwordRules,
      forgotFormRef,
      callLogin,
      handleSubmit,
      sendEmailCode,
    };
  },
});
</script>

<style lang="less" scoped>
.register-form {
  &-wrapper {
    width: 550px;
    text-align: center;
  }

  &-title {
    margin-bottom: 35px;
    color: var(--color-text-1);
    font-weight: 600;
    font-size: 32px;
    line-height: 32px;

    img {
      width: 60px;
      height: 45px;
      vertical-align: text-top;
    }

    span {
      user-select: none;
    }
  }

  &-protocol {
    display: flex;
    justify-content: space-between;
    user-select: none;
  }
}

:deep(.arco-form) {
  width: 420px;
  margin: 0 auto;
}
</style>
