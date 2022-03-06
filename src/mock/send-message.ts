import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap,
} from '@/utils/setup-mock';

import { MockParams } from '@/types/mock';

setupMock({
  mock: false,
  setup() {
    // 送手机短信验证码
    Mock.mock(new RegExp('/api/send/phone-code'), (params: MockParams) => {
      const { phone } = JSON.parse(params.body);
      if (phone === '15233088662') {
        return successResponseWrap('发送成功');
      }
      return failResponseWrap(null, 500, '发送失败');
    });
  },
});
