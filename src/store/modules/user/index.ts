import { defineStore } from 'pinia';
import {
  login as userLogin,
  logout as userLogout,
  getUserInfo,
  LoginData,
  phoneLogin,
  PhoneLoginData,
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
    role: '',
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
    // Set user's information
    setInfo(partial: Partial<UserState>) {
      this.$patch(partial);
    },

    // Reset user's information
    resetInfo() {
      this.$reset();
    },

    // Get user's information
    async info() {
      const res = await getUserInfo();
      if (!res.data.avatar) {
        res.data.avatar = boyAvatar;
      }
      this.setInfo(res.data);
    },

    // Login
    async login(loginForm: LoginData) {
      try {
        const res = await userLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // PhoneLogin
    async phoneLogin(loginForm: PhoneLoginData) {
      try {
        const res = await phoneLogin(loginForm);
        setToken(res.data.token);
      } catch (err) {
        clearToken();
        throw err;
      }
    },

    // Logout
    async logout() {
      await userLogout();
      this.resetInfo();
      clearToken();
    },
  },
});
