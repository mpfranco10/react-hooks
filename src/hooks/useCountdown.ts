import {
  useState,
  useRef,
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from "react";

//FUTURE: https://usehooks.com/usecountdown
export default function useCountdown(
  endTime: number,
  options: { interval: number; onComplete: () => void; onTick: () => void }
) {
  const [count, setCount] = useState<number>(0);
  const intervalIdRef = useRef<number>(0);

  const handleClearInterval = () => {
    window.clearInterval(intervalIdRef.current);
  };

  const onTick = useEffectEvent(() => {
    if (count === 0) {
      handleClearInterval();
      options.onComplete();
    } else {
      setCount(count - 1);
      options.onTick();
    }
  });

  useEffect(() => {
    setCount(Math.round((endTime - Date.now()) / options.interval));
  }, [endTime, options.interval]);

  useEffect(() => {
    intervalIdRef.current = window.setInterval(onTick, options.interval);

    return () => handleClearInterval();
  }, [options.interval]);

  return count;
}
