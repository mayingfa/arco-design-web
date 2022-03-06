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
import { RoleEnum } from '@/enums/RoleEnum';
import boyAvatar from '@/assets/svg/avatar-boy.svg?url';
import { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userName: '',
    password: '',
    nickName: '',
    age: 0,
    gender: undefined,
    email: '',
    phone: undefined,
    identityCard: undefined,
    avatar: undefined,
    note: undefined,
    createTime: undefined,
    updateTime: undefined,
    loginTime: undefined,
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

    // 设置用户头像
    setAvatar(avatar: string) {
      this.avatar = avatar;
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
      res.data.role = RoleEnum.All;
      this.setInfo(res.data);
    },

    // 账号密码登录
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.tokenValue);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // 手机号登录
    async phoneLogin(loginForm: PhoneLoginData) {
      try {
        const res = await phoneLogin(loginForm);
        setToken(res.data.tokenValue);
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
      this.clearCache();
    },

    //  清理缓存
    async clearCache() {
      this.resetInfo();
      clearToken();
    },
  },
});
