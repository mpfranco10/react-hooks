import {
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
  useRef,
} from "react";

export default function useLogger(name: string, ...rest: unknown[]) {
  const initialRenderRef = useRef(true);

  const handleLog = useEffectEvent((eventName: string) => {
    console.log(`${name} ${eventName}:`, rest);
  });

  useEffect(() => {
    if (initialRenderRef.current === false) {
      handleLog("updated");
    }
  });

  useEffect(() => {
    handleLog("mounted");
    initialRenderRef.current = false;

    return () => {
      handleLog("unmounted");
      initialRenderRef.current = true;
    };
  }, []);
}
