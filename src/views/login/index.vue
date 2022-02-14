<template>
  <div class="container">
    <div class="logo">
      <img :src="logoIcon" alt="logo" />
      <div class="logo-text">Arco Design Web</div>
    </div>
    <LoginBanner />
    <div class="content">
      <div class="content-inner">
        <LoginForm
          v-if="showPage === PageEnum.Login"
          @callRegister="callRegister"
          @callForgotPassword="callForgotPassword"
        />
        <RegisterForm
          v-else-if="showPage === PageEnum.Register"
          @callLogin="callLogin"
        />
        <ForgotPasswordForm
          v-else-if="showPage === PageEnum.ForgotPassword"
          @callLogin="callLogin"
        />
      </div>
      <div class="footer">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Footer from '@/components/footer/index.vue';
import logoIcon from '@/assets/icons/arco-logo.svg?url';
import LoginBanner from './components/banner.vue';
import LoginForm from './components/login-form.vue';
import RegisterForm from './components/register-form.vue';
import ForgotPasswordForm from './components/forgot-password-form.vue';

enum PageEnum {
  Login,
  Register,
  ForgotPassword,
}
export default defineComponent({
  components: {
    LoginBanner,
    LoginForm,
    RegisterForm,
    ForgotPasswordForm,
    Footer,
  },
  setup() {
    const showPage = ref(0);
    const callLogin = () => {
      showPage.value = PageEnum.Login;
    };
    const callRegister = () => {
      showPage.value = PageEnum.Register;
    };
    const callForgotPassword = () => {
      showPage.value = PageEnum.ForgotPassword;
    };

    return {
      showPage,
      logoIcon,
      PageEnum,
      callLogin,
      callRegister,
      callForgotPassword,
    };
  },
});
</script>

<style lang="less" scoped>
.container {
  display: flex;
  height: 100vh;

  .banner {
    width: 550px;
    background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
  }

  .content {
    position: relative;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding-bottom: 40px;
  }

  .footer {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
  }
}

.logo {
  position: fixed;
  top: 24px;
  left: 22px;
  z-index: 1;
  display: inline-flex;
  align-items: center;

  &-text {
    margin-right: 4px;
    margin-left: 4px;
    color: var(--color-fill-1);
    font-size: 20px;
  }
}
</style>
