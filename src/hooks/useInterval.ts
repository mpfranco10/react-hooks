/// <reference types="react/experimental" />
import {
  useCallback,
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
  useRef,
} from "react";

export const useInterval = (callback: () => void, delay: number) => {
  const idRef = useRef<null | number>(null);
  const onInterval = useEffectEvent(callback);

  const handleClearInterval = useCallback(() => {
    window.clearInterval(idRef.current!);
  }, []);

  useEffect(() => {
    idRef.current = window.setInterval(onInterval, delay);
    return handleClearInterval;
  }, [delay, handleClearInterval, onInterval]);

  return handleClearInterval;
};
