import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from "react";

export const usePageLeave = (cb: () => void) => {
  const onLeave = useEffectEvent((event: MouseEvent) => {
    const to = event.relatedTarget;
    if (!to) {
      cb();
    }
  });

  useEffect(() => {
    document.addEventListener("mouseout", onLeave);

    return () => {
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);
};
