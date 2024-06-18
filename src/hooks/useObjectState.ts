/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from "react";

const isPlainObject = (value: any) => {
  return value.constructor?.name === "Object";
};

type setArg = object | ((o: object) => object);

export const useObjectState = (
  initialValue: object
): [object, (arg: setArg) => void] => {
  const [state, setState] = useState<object>(initialValue);

  const handleUpdate = useCallback((arg: setArg) => {
    if (typeof arg === "function") {
      setState((s) => {
        const newState = arg(s);

        if (isPlainObject(newState)) {
          return {
            ...s,
            ...newState,
          };
        }
      });
    }

    if (isPlainObject(arg)) {
      setState((s) => ({
        ...s,
        ...arg,
      }));
    }
  }, []);

  return [state, handleUpdate];
};
