export default function useFormValidator() {
  const phoneRules = [
    { required: true, message: '请输入手机号码' },
    {
      validator: (value: any, callback: any) => {
        const phoneReg =
          /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
        if (!phoneReg.test(value)) {
          callback('请输入正确格式的手机号码');
          return;
        }
        callback();
      },
    },
  ];
  return {
    phoneRules,
  };
}
