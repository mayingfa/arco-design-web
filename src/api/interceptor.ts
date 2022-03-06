import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { RenderContent } from '@arco-design/web-vue/es/_utils/types';
import { getToken } from '@/utils/auth';

let showMsg = true;

export interface HttpResponse<T = unknown> {
  status: number;
  message: string;
  code: number;
  data: T;
}

// 配置请求路径和超时时间
axios.defaults.baseURL = process.env.BASE_API;
axios.defaults.timeout = 5000;

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers && getToken()) {
      config.headers.token = getToken() || '';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;
    if (res.code !== 200) {
      if (
        [601, 602].includes(res.code) &&
        response.config.url !== '/api/user/info' &&
        showMsg
      ) {
        showMsg = false;
        Modal.warning({
          title: '确认注销',
          content: res.data as RenderContent,
          okText: '确定',
          maskClosable: false,
          async onOk() {
            const userStore = useUserStore();
            await userStore.clearCache();
            showMsg = true;
            window.location.reload();
          },
        });
      } else if (showMsg) {
        Message.error({
          content: (res.data as RenderContent) || 'Error',
          duration: 5 * 1000,
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: '请求失败',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  }
);
