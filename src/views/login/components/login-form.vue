<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">
      <img :src="logoIcon" alt="logo" />
      <span>Arco Design Starter</span>
    </div>
    <a-tabs
      size="large"
      animation
      default-active-key="account"
      @change="tabsChange"
    >
      <a-tab-pane key="account" title="账号密码登录">
        <a-form
          :model="userInfo"
          size="large"
          layout="vertical"
          @submit="handleSubmit"
        >
          <a-form-item
            field="username"
            :rules="[{ required: true, message: '用户名不能为空' }]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input
              v-model="userInfo.username"
              placeholder="用户名：admin"
              @keyup.enter="handleSubmit"
            >
              <template #prefix>
                <icon-user />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item
            field="password"
            :rules="[{ required: true, message: '密码不能为空' }]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input-password
              v-model="userInfo.password"
              autocomplete="new-password"
              placeholder="密码：admin"
              allow-clear
              @keyup.enter="handleSubmit"
            >
              <template #prefix>
                <icon-lock />
              </template>
            </a-input-password>
          </a-form-item>
          <a-space :size="16" direction="vertical">
            <div class="login-form-password-actions">
              <a-checkbox v-model="rememberPassword"> 自动登录 </a-checkbox>
              <a-link @click="callForgotPassword"> 忘记密码 </a-link>
            </div>
            <a-button type="primary" html-type="submit" long :loading="loading">
              登录
            </a-button>
            <a-button type="outline" long @click="callRegister">
              注册账号
            </a-button>
          </a-space>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="phone" title="手机号登录">
        <a-form
          ref="phoneLoginRef"
          :model="phoneLogin"
          size="large"
          layout="vertical"
          @submit="handleSubmit"
        >
          <a-form-item
            field="phone"
            :rules="phoneRules"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input
              v-model="phoneLogin.phone"
              placeholder="手机号"
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
            :rules="[{ required: true, message: '验证码不能为空' }]"
            :validate-trigger="['change', 'blur']"
            hide-label
          >
            <a-input
              v-model="phoneLogin.authCode"
              placeholder="短信验证码"
              allow-clear
              @keyup.enter="handleSubmit"
            >
              <template #prefix>
                <icon-safe />
              </template>
            </a-input>
          </a-form-item>
          <a-space :size="16" direction="vertical">
            <div class="login-form-password-actions">
              <a-checkbox v-model="rememberPassword"> 自动登录 </a-checkbox>
              <a-link @click="callForgotPassword"> 忘记密码 </a-link>
            </div>
            <a-button type="primary" html-type="submit" long :loading="loading">
              登录
            </a-button>
            <a-button type="outline" long @click="callRegister">
              注册账号
            </a-button>
          </a-space>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import { LoginData, PhoneLoginData } from '@/api/user';
import logoIcon from '@/assets/icons/arco-logo.svg?url';
import useCountDown from '@/hooks/countdown';
import useFormValidator from '@/hooks/form-validator';
import { sendPhoneAuthCode } from '@/api/send-message';

const USER_NAME = 'username';
const PASS_WORD = 'remember';
export default defineComponent({
  emits: ['callRegister', 'callForgotPassword'],
  setup(props, context) {
    // 标签页
    const loginMode = ref('account');
    const tabsChange = (value: string) => {
      loginMode.value = value;
    };

    // 表单页面
    const phoneLoginRef = ref(null);
    const { phoneRules } = useFormValidator();
    const rememberPassword = ref(true);
    const userInfo = reactive({
      username: 'admin',
      password: 'admin',
    });
    const phoneLogin = reactive({
      phone: '15123456789',
      authCode: '123456',
    });

    // 发送短信验证码
    const { waiting, seconds, countDown } = useCountDown();
    const sendPhoneCode = () => {
      const target = phoneLoginRef.value as any;
      target.validateField('phone', async (phoneError: ValidatedError) => {
        if (!phoneError) {
          countDown();
          await sendPhoneAuthCode({ phone: phoneLogin.phone });
          Message.success('发送成功');
        }
      });
    };

    // 记住密码
    const savePassword = () => {
      if (rememberPassword.value) {
        localStorage.setItem(USER_NAME, userInfo.username);
        localStorage.setItem(PASS_WORD, window.btoa(userInfo.password));
      } else {
        localStorage.removeItem(USER_NAME);
        localStorage.removeItem(PASS_WORD);
      }
    };

    // 账号登录
    const router = useRouter();
    const userStore = useUserStore();
    const { loading, setLoading } = useLoading();
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
          if (loginMode.value === 'account') {
            await userStore.login(values as LoginData);
          } else {
            await userStore.phoneLogin(values as PhoneLoginData);
          }
          savePassword();
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

    // 显示注册页面
    const callRegister = () => {
      context.emit('callRegister');
    };

    // 显示忘记密码页面
    const callForgotPassword = () => {
      context.emit('callForgotPassword');
    };

    onMounted(() => {
      const username = localStorage.getItem(USER_NAME);
      const password = localStorage.getItem(PASS_WORD);
      if (username && password) {
        userInfo.username = username;
        userInfo.password = window.atob(password);
        rememberPassword.value = true;
      }
    });

    return {
      logoIcon,
      waiting,
      seconds,
      loading,
      loginMode,
      userInfo,
      phoneLogin,
      phoneRules,
      phoneLoginRef,
      rememberPassword,
      sendPhoneCode,
      tabsChange,
      callRegister,
      callForgotPassword,
      handleSubmit,
    };
  },
});
</script>

<style lang="less" scoped>
.login-form {
  &-wrapper {
    width: 550px;
    text-align: center;
  }

  &-title {
    margin-bottom: 20px;
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

  &-password-actions {
    display: flex;
    justify-content: space-between;
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
</style>
