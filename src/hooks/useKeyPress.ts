import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from "react";

// FUTURE: https://usehooks.com/usekeypress

interface KeyPropsProps {
  key: string;
  cb: (event?: KeyboardEvent) => void;
  options?: {
    event: string;
    target: HTMLElement;
    eventOptions?: EventListenerOptions;
  };
}

export const useKeyPress = ({ key, cb, options }: KeyPropsProps) => {
  const {
    event = "keydown",
    target = window ?? null,
    eventOptions,
  } = options ?? {};
  const onListen = useEffectEvent(cb);

  useEffect(() => {
    const handler = (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === key) {
        onListen(keyboardEvent);
      }
    };

    target.addEventListener(event, handler, eventOptions);

    return () => {
      target.removeEventListener(event, handler, eventOptions);
    };
  }, [key, target, event, eventOptions]);
};
