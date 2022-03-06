import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  userName: string;
  password: string;
}

export interface PhoneLoginData {
  phone: string;
  authCode: string;
}

export interface LoginRes {
  tokenValue: string;
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/admin/login/username', data);
}

export function phoneLogin(data: PhoneLoginData) {
  return axios.post<LoginRes>('/api/admin/login/phone', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/admin/logout');
}

export function getUserInfo() {
  return axios.get<UserState>('/api/admin/info');
}

export interface RegisterData {
  nickName: string;
  password: string;
  email: string;
  authCode: string;
  agreeProtocol: boolean;
}

export function register(data: RegisterData) {
  return axios.post<string>('/api/admin/register', data);
}

export interface ResetPasswordData {
  email: string;
  authCode: string;
  newPassword: string;
}

export function resetPassword(data: ResetPasswordData) {
  return axios.post<string>('/api/admin/password/reset', data);
}

export const uploadUserAvatarUrl = `${process.env.BASE_API}/api/admin/upload/avatar`;
