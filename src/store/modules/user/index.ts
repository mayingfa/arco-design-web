import { defineStore } from 'pinia';
import {
  getUserInfo,
  LoginData,
  login as userLogin,
  logout as userLogout,
  PhoneLoginData,
  phoneLogin,
  RegisterData,
  register as userRegister,
  resetPassword,
  ResetPasswordData,
} from '@/api/user';
import { setToken, clearToken } from '@/utils/auth';
import { RoleEnum } from '@/enums/roleEnum';
import boyAvatar from '@/assets/svg/avatar-boy.svg?url';
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    name: undefined,
    avatar: undefined,
    job: undefined,
    organization: undefined,
    location: undefined,
    email: undefined,
    introduction: undefined,
    personalWebsite: undefined,
    jobName: undefined,
    organizationName: undefined,
    locationName: undefined,
    phone: undefined,
    registrationDate: undefined,
    accountId: undefined,
    certification: undefined,
    role: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state };
    },
  },

  actions: {
    switchRoles() {
      return new Promise((resolve) => {
        this.role =
          this.role === RoleEnum.USER ? RoleEnum.ADMIN : RoleEnum.USER;
        resolve(this.role);
      });
    },

    // 设置用户信息
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // 重置用户的信息
    resetInfo() {
      this.$reset();
    },

    // 获取用户的信息
    async info() {
      const res = await getUserInfo();
      if (!res.data.avatar) {
        res.data.avatar = boyAvatar;
      }
      this.setInfo(res.data);
    },

    // 账号密码登录
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // 手机号登录
    async phoneLogin(loginForm: PhoneLoginData) {
      try {
        const res = await phoneLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // 注册账号
    async register(registerForm: RegisterData) {
      await userRegister(registerForm);
    },

    // 重置密码
    async resetPassword(ResetPasswordForm: ResetPasswordData) {
      await resetPassword(ResetPasswordForm);
    },

    // 退出系统
    async logout() {
      await userLogout();
      this.resetInfo();
      clearToken();
    },
  },
});
