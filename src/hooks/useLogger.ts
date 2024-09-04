import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
  useRef,
} from "react";

export const useLogger = (name: string, ...rest: unknown[]) => {
  const initialRenderRef = useRef(true);

  const handleLog = useEffectEvent((eventName: string) => {
    console.log(`${name} ${eventName}:`, rest);
  });

  useEffect(() => {
    if (initialRenderRef.current === false) {
      handleLog("component rerendered");
    }
  });

  useEffect(() => {
    handleLog("component mounted");
    initialRenderRef.current = false;

    return () => {
      handleLog("component unmounted");
      initialRenderRef.current = true;
    };
  }, []);
};
