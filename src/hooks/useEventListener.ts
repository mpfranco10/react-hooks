import {
  RefObject,
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from "react";

export const useEventListener = <T extends HTMLElement>(
  target: T | RefObject<T>,
  eventName: string,
  handler: () => void,
  options?: never
) => {
  const onEvent = useEffectEvent(handler);

  useEffect(() => {
    // @ts-expect-error It could be either an element or a ref to the element
    const targetElement = target.current ?? target;

    if (!targetElement?.addEventListener) return;

    targetElement.addEventListener(eventName, onEvent, options);

    return () => {
      targetElement.removeEventListener(eventName, onEvent, options);
    };
  }, [target, eventName, options]);
};
