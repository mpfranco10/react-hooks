import { useCallback, useState } from "react";

export interface MinMax {
  min?: number;
  max?: number;
}

export interface CounterActions {
  increment: () => void;
  decrement: () => void;
  set: (nextCount: number) => void;
  reset: () => void;
}

export const useCounter = (
  startingValue: number = 0,
  options: MinMax = {}
): [number, CounterActions] => {
  const { min, max } = options;

  if (min && startingValue < min) {
    throw new Error(
      `Your starting value of ${startingValue} is less than your min of ${min}.`
    );
  }

  if (max && startingValue > max) {
    throw new Error(
      `Your starting value of ${startingValue} is greater than your max of ${max}.`
    );
  }

  const [count, setCount] = useState(startingValue);

  const increment = useCallback(() => {
    if (max === undefined || count < max) {
      setCount((c) => c + 1);
    }
  }, [count, max]);

  const decrement = useCallback(() => {
    if (min === undefined || count > min) {
      setCount((c) => c - 1);
    }
  }, [count, min]);

  const set = useCallback(
    (nextCount: number) => {
      setCount((c) => {
        if (max && nextCount > max) {
          return c;
        }

        if (min && nextCount < min) {
          return c;
        }

        return nextCount;
      });
    },
    [max, min]
  );

  const reset = useCallback(() => {
    setCount(startingValue);
  }, [startingValue]);

  return [
    count,
    {
      increment,
      decrement,
      set,
      reset,
    },
  ];
};
