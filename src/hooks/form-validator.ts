export default function useFormValidator() {
  const emailRules = [
    { required: true, message: '请输入邮箱地址' },
    {
      validator: (value: any, callback: any) => {
        const pattern = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!pattern.test(value)) {
          callback('请填写正确的邮箱地址');
          return;
        }
        callback();
      },
    },
  ];
  const phoneRules = [
    { required: true, message: '请输入手机号码' },
    {
      validator: (value: any, callback: any) => {
        const pattern =
          /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!pattern.test(value)) {
          callback('请填写正确的手机号码');
          return;
        }
        callback();
      },
    },
  ];
  const passwordRules = [
    { required: true, message: '请输入密码' },
    {
      validator: (value: any, callback: any) => {
        const pattern = /^[a-zA-Z]\w{5,17}$/;
        if (!pattern.test(value)) {
          callback('以字母开头，长度在6~18之间，只能包含字母、数字和下划线');
          return;
        }
        callback();
      },
    },
  ];
  const identityCardRules = [
    { required: true, message: '请输入身份证号码' },
    {
      validator: (value: any, callback: any) => {
        const pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (!pattern.test(value)) {
          callback('请填写正确的身份证号码');
          return;
        }
        callback();
      },
    },
  ];
  return {
    emailRules,
    phoneRules,
    passwordRules,
    identityCardRules,
  };
}
