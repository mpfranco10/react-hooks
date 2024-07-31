import { MutableRefObject, useLayoutEffect, useRef, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
  elementX?: number;
  elementY?: number;
  elementPositionX?: number;
  elementPositionY?: number;
}

export const useMouse = <T extends HTMLElement>(): [
  MousePosition,
  MutableRefObject<T | null>
] => {
  const [state, setState] = useState({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    elementPositionX: 0,
    elementPositionY: 0,
  });

  const ref = useRef<T | null>(null);

  useLayoutEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const newState: MousePosition = {
        x: event.pageX,
        y: event.pageY,
      };

      if (ref.current && ref.current.nodeType === Node.ELEMENT_NODE) {
        const { left, top } = ref.current.getBoundingClientRect();
        const elementPositionX = left + window.scrollX;
        const elementPositionY = top + window.scrollY;
        const elementX = event.pageX - elementPositionX;
        const elementY = event.pageY - elementPositionY;

        newState.elementX = elementX;
        newState.elementY = elementY;
        newState.elementPositionX = elementPositionX;
        newState.elementPositionY = elementPositionY;
      }

      setState((s) => {
        return {
          ...s,
          ...newState,
        };
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return [state, ref];
};
