import {
  useCallback,
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
  useRef,
} from "react";

export const useTimeout = (cb: () => void, ms: number) => {
  const timerRef = useRef(0);

  const clear = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  const callback = useEffectEvent(cb);

  useEffect(() => {
    timerRef.current = setTimeout(callback, ms);

    return clear;
  }, [ms, clear]);

  return clear;
};
