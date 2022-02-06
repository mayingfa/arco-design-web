import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';
import { isLogin } from '@/utils/auth';
import { RoleEnum } from '@/enums/roleEnum';
import boyAvatar from '@/assets/svg/avatar-boy.svg?url';

setupMock({
  mock: true,
  setup() {
    // Mock.XHR.prototype.withCredentials = true;

    // 用户信息
    Mock.mock(new RegExp('/api/user/info'), () => {
      if (isLogin()) {
        const role = window.localStorage.getItem('userRole') || 'admin';
        return successResponseWrap({
          name: '王立群',
          avatar: boyAvatar,
          email: 'wangliqun@email.com',
          job: 'frontend',
          jobName: '前端艺术家',
          organization: 'Frontend',
          organizationName: '前端',
          location: 'beijing',
          locationName: '北京',
          introduction: '人潇洒，性温存',
          personalWebsite: 'https://www.arco.design',
          phone: '150****0000',
          registrationDate: '2013-05-10 12:10:00',
          accountId: '15012312300',
          certification: 1,
          role,
        });
      }
      return failResponseWrap(null, 50008, '未登录');
    });

    // 账号密码登录
    Mock.mock(new RegExp('/api/user/login'), (params: MockParams) => {
      const { username, password } = JSON.parse(params.body);
      if (!username) {
        return failResponseWrap(null, 50000, '用户名不能为空');
      }
      if (!password) {
        return failResponseWrap(null, 50000, '密码不能为空');
      }
      if (username === 'admin' && password === 'admin') {
        window.localStorage.setItem('userRole', RoleEnum.ADMIN);
        return successResponseWrap({
          token: '12345',
        });
      }
      if (username === 'user' && password === 'user') {
        window.localStorage.setItem('userRole', RoleEnum.USER);
        return successResponseWrap({
          token: '54321',
        });
      }
      return failResponseWrap(null, 50000, '账号或者密码错误');
    });

    // 手机号登录
    Mock.mock(new RegExp('/api/user/phone-login'), (params: MockParams) => {
      const { phone, authCode } = JSON.parse(params.body);
      if (!phone) {
        return failResponseWrap(null, 50000, '手机号不能为空');
      }
      if (!authCode) {
        return failResponseWrap(null, 50000, '验证码不能为空');
      }
      if (phone === '15288990112' && authCode === '123456') {
        window.localStorage.setItem('userRole', RoleEnum.ADMIN);
        return successResponseWrap({
          token: '12345',
        });
      }
      return failResponseWrap(null, 50000, '手机号或者验证码错误');
    });

    // 登出
    Mock.mock(new RegExp('/api/user/logout'), () => {
      return successResponseWrap(null);
    });
  },
});
