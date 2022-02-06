<template>
  <div class="register-form-wrapper">
    <div class="register-form-title">
      <img :src="logoIcon" alt="logo" />
      <span>Arco Design Pro</span>
    </div>
    <a-form
      ref="registerFormRef"
      :model="userInfo"
      size="large"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[{ required: true, message: '请输入用户名' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          placeholder="请输入用户名"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[{ required: true, message: '请输入密码' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
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
        field="phone"
        :rules="phoneRules"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.phone"
          placeholder="请输入手机号码"
          style="margin-right: 8px"
          @keyup.enter="handleSubmit"
        >
          <template #prefix>
            <icon-phone />
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
          我已阅读并同意<a-link>Arco Design服务协议</a-link>
        </a-checkbox>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long :loading="loading">
          注册
        </a-button>
        <a-button type="outline" long @click="callLogin"> 返回 </a-button>
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import { LoginData, PhoneLoginData } from '@/api/user';
import logoIcon from '@/assets/icons/arco-logo.svg?url';
import useCountDown from '@/hooks/countdown';
import useFormValidator from '@/hooks/form-validator';

export default defineComponent({
  emits: ['callLogin'],
  setup(props, context) {
    const router = useRouter();
    const registerFormRef = ref(null);
    const { loading, setLoading } = useLoading();
    const userStore = useUserStore();
    const userInfo = reactive({
      username: '',
      password: '',
      phone: '',
      authCode: '',
      agreeProtocol: false,
    });
    const callLogin = () => {
      context.emit('callLogin');
    };
    const { phoneRules } = useFormValidator();
    // 发送短信验证码
    const { waiting, seconds, sendCode } = useCountDown();
    const sendPhoneCode = () => {
      const dom = registerFormRef.value as any;
      dom.validateField('phone', (phoneError: ValidatedError) => {
        if (!phoneError) {
          sendCode();
        }
      });
    };
    // 注册账号
    const handleSubmit = async ({
      errors,
      values,
    }: {
      errors: Record<string, ValidatedError> | undefined;
      values: LoginData | PhoneLoginData;
    }) => {
      if (!errors) {
        setLoading(true);
        try {
          await userStore.login(values as LoginData);
          const { redirect, ...othersQuery } = router.currentRoute.value.query;
          await router.push({
            name: (redirect as string) || 'workplace',
            query: {
              ...othersQuery,
            },
          });
          Message.success('欢迎使用');
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
      phoneRules,
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
    font-size: 33px;
    line-height: 32px;

    img {
      width: 48px;
      height: 50px;
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

:deep(.arco-tabs-nav) {
  &::before {
    background-color: unset;
  }

  .arco-tabs-nav-tab {
    justify-content: center;
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
