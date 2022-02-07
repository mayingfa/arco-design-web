import { ref } from 'vue';
import { useIntervalFn } from '@vueuse/core';

// 控制发送验证码的倒计时效果
export default function useCountDown() {
  const seconds = ref(0);
  const waiting = ref(false);
  const { pause, resume } = useIntervalFn(
    () => {
      if (seconds.value <= 1) {
        waiting.value = false;
        seconds.value = 0;
        pause();
      } else {
        seconds.value -= 1;
      }
    },
    1000,
    {
      // 首次是否自动启动定时任务
      immediate: false,
      // 是否延时执行定时任务
      immediateCallback: false,
    }
  );
  // 开始倒计时
  const countDown = (timer = 60) => {
    if (seconds.value === 0) {
      waiting.value = true;
      seconds.value = timer;
      resume();
    }
  };
  return {
    waiting,
    seconds,
    countDown,
  };
}
