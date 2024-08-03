import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
  useRef,
} from "react";

export const useClickAway = (cb: (e?: MouseEvent | TouchEvent) => void) => {
  const ref = useRef<HTMLElement>(null);

  const onEventHandler = useEffectEvent((e: MouseEvent | TouchEvent) => {
    const element = ref.current;
    if (element && !element.contains(e.target as Node)) {
      cb(e);
    }
  });

  useEffect(() => {
    document.addEventListener("mousedown", onEventHandler);
    document.addEventListener("touchstart", onEventHandler);

    return () => {
      document.removeEventListener("mousedown", onEventHandler);
      document.removeEventListener("touchstart", onEventHandler);
    };
  }, []);

  return ref;
};
