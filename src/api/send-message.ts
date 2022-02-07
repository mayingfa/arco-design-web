import axios from 'axios';

// 发送手机短信验证码
export interface PhoneCode {
  phone: string;
}

export function sendPhoneAuthCode(data: PhoneCode) {
  return axios.post<string>('/api/send/phone-code', data);
}
