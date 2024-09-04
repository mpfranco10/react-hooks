import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
  useCallback,
  useRef,
} from "react";

interface IntervalWhenOptions {
  ms: number;
  when: boolean;
  startImmediately: boolean;
}

export const useIntervalWhen = (
  cb: () => void,
  { ms, when, startImmediately }: IntervalWhenOptions
) => {
  const id = useRef(0);
  const immediatelyCalled = useRef(startImmediately ? false : null);

  const onTick = useEffectEvent(cb);

  const handleClearInterval = useCallback(() => {
    window.clearInterval(id.current);
    immediatelyCalled.current = false;
  }, []);

  useEffect(() => {
    if (when) {
      id.current = window.setInterval(onTick, ms);

      if (startImmediately && !immediatelyCalled.current) {
        onTick();
        immediatelyCalled.current = true;
      }

      return handleClearInterval;
    }
  }, [ms, when, startImmediately, handleClearInterval]);

  return handleClearInterval;
};
