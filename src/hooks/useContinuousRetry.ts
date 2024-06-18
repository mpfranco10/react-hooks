import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
  useState,
} from "react";

interface RetryOptions {
  maxRetries?: number;
}

export const useContinuousRetry = (
  callback: () => boolean,
  interval = 100,
  options: RetryOptions = {}
) => {
  const { maxRetries = Infinity } = options;
  const [hasResolved, setHasResolved] = useState(false);
  const onInterval = useEffectEvent(callback);

  useEffect(() => {
    let retries = 0;

    const id = setInterval(() => {
      if (onInterval()) {
        setHasResolved(true);
        clearInterval(id);
      } else if (retries >= maxRetries) {
        window.clearInterval(id);
      } else {
        console.log("retrying function");
        retries += 1;
      }
    }, interval);

    return () => clearInterval(id);
  }, [interval, maxRetries]);

  return hasResolved;
};
