import { debug } from './env';

export default ({ mock, setup }: { mock?: boolean; setup: () => void }) => {
  if (mock !== false && debug) setup();
};

export const successResponseWrap = (data: unknown) => {
  return {
    data,
    status: 'ok',
    message: '请求成功',
    code: 200,
  };
};

export const failResponseWrap = (
  data: unknown,
  code = 500,
  message: string
) => {
  return {
    data,
    status: 'fail',
    message,
    code,
  };
};
