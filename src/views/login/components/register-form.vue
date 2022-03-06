<template>
  <div class="register-form-wrapper">
    <div class="register-form-title">
      <img :src="logoIcon" alt="logo" />
      <span>Arco Design Web</span>
    </div>
    <a-form
      ref="registerFormRef"
      :model="userInfo"
      size="large"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="nickName"
        :rules="[{ required: true, message: '请输入用户名' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.nickName"
          placeholder="请输入用户名"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
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
        <a-button type="outline" :disabled="waiting" @click="sendPhoneCode">
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
        field="password"
        :rules="passwordRules"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          autocomplete="new-password"
          placeholder="请输入密码"
          allow-clear
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item
        field="agreeProtocol"
        :rules="[
          {
            type: 'boolean',
            true: true,
            message: '请阅读并同意我们的服务条款',
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
        class="register-form-protocol"
      >
        <a-checkbox v-model="userInfo.agreeProtocol">
          我已阅读并同意
          <a-link>Arco Design服务协议</a-link>
        </a-checkbox>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          注册
        </a-button>
        <a-button type="outline" long @click="callLogin"> 返回</a-button>
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
import { RegisterData } from '@/api/user';
import logoIcon from '@/assets/icons/arco-logo.svg?url';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { sendEmailAuthCode } from '@/api/send-message';

export default defineComponent({
  emits: ['callLogin'],
  setup(props, context) {
    // 表单信息
    const registerFormRef = ref(null);
    const { emailRules, passwordRules } = useFormValidator();
    const userInfo = reactive({
      nickName: '',
      password: '',
      email: '',
      authCode: '',
      agreeProtocol: false,
    });

    // 发送短信验证码
    const { waiting, seconds, countDown } = useCountDown();
    const sendPhoneCode = () => {
      const target = registerFormRef.value as any;
      target.validateField('email', async (phoneError: ValidatedError) => {
        if (!phoneError) {
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

    // 注册账号
    const userStore = useUserStore();
    const { loading, setLoading } = useLoading();
    const handleSubmit = async ({
      errors,
      values,
    }: {
      errors: Record<string, ValidatedError> | undefined;
      values: RegisterData;
    }) => {
      if (!errors) {
        setLoading(true);
        try {
          await userStore.register(values);
          callLogin();
          Message.success('注册成功');
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
      registerFormRef,
      callLogin,
      handleSubmit,
      sendPhoneCode,
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
      user-select: none;
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

:deep(.arco-form-size-large .arco-form-item-content),
:deep(.arco-form-size-large .arco-form-item-wrapper-col) {
  min-height: 30px;
}
</style>
