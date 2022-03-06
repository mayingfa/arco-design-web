import axios from 'axios';

// 发送手机短信验证码
export interface PhoneCode {
  phone: string;
}

export function sendPhoneAuthCode(data: PhoneCode) {
  return axios.post<string>('/api/third/message/phone-code', data);
}

// 发送邮箱验证码
export interface EmailCode {
  email: string;
}

export function sendEmailAuthCode(data: EmailCode) {
  return axios.post<string>('/api/third/message/email-code', data);
}
