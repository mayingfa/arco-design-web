import { getToken } from '@/utils/auth';
import { Message } from '@arco-design/web-vue';

// 上传文件所需参数
export default function useUploadFile() {
  // 请求头携带token
  const headers = {
    token: getToken(),
  };
  const avatarValidated = (file: File) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' ||
      file.type === 'image/png' ||
      file.type === 'image/gif';
    if (!isJpgOrPng) {
      Message.error('只能上传jpg、png或gif类型的图片');
    }
    const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      Message.error('图片必须小于10MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  return {
    headers,
    avatarValidated,
  };
}
