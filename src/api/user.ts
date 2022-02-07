import axios from 'axios';
import { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface PhoneLoginData {
  phone: string;
  authCode: string;
}

export interface LoginRes {
  token: string;
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/api/user/login', data);
}

export function phoneLogin(data: PhoneLoginData) {
  return axios.post<LoginRes>('/api/user/phone-login', data);
}

export function logout() {
  return axios.post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return axios.post<UserState>('/api/user/info');
}

export interface RegisterData {
  username: string;
  password: string;
  phone: string;
  authCode: string;
  agreeProtocol: boolean;
}

export function register(data: RegisterData) {
  return axios.post<string>('/api/user/register', data);
}

export interface ResetPasswordData {
  phone: string;
  authCode: string;
  newPassword: string;
}

export function resetPassword(data: ResetPasswordData) {
  return axios.post<string>('/api/user/reset-password', data);
}
