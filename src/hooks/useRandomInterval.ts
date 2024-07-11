import {
  useCallback,
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
  useRef,
} from "react";

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface IntervalDelay {
  minDelay: number;
  maxDelay: number;
}

export default function useRandomInterval(
  cb: () => void,
  { minDelay, maxDelay }: IntervalDelay
) {
  const timeoutId = useRef<null | number>(null);
  const onInterval = useEffectEvent(cb);

  const handleClearTimeout = useCallback(() => {
    if (timeoutId.current) {
      window.clearTimeout(timeoutId.current);
    }
  }, []);

  useEffect(() => {
    const tick = () => {
      const interval = getRandomNumber(minDelay, maxDelay);
      timeoutId.current = window.setTimeout(() => {
        onInterval();
        tick();
      }, interval);
    };

    tick();

    return handleClearTimeout;
  }, [minDelay, maxDelay, handleClearTimeout]);

  return handleClearTimeout;
}
