
/**
 * @description: 节流函数
 * @param {array} callback -回调
 * @param {array} delay -时间
 * @return {*}
 */
function throttle<T extends (...args: any[]) => void>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return function (...args: Parameters<T>): void {
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastExecTime;

    const execute = () => {
      lastExecTime = currentTime;
      callback.apply(null, args);
    };

    if (!timeoutId) {
      execute();
      timeoutId = setTimeout(() => {
        timeoutId = null;
      }, delay);
    } else if (elapsedTime >= delay) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(execute, delay);
    }
  };
}


export { throttle };
