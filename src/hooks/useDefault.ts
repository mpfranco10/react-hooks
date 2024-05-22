import { Dispatch, SetStateAction, useState } from "react";

type OptionalT<T> = T | undefined | null;

export const useDefault = <T>(
  initialValue: T,
  defaultValue: T
): [T, Dispatch<SetStateAction<OptionalT<T>>>] => {
  const [state, setState] = useState<OptionalT<T>>(initialValue);

  if (typeof state === "undefined" || state === null) {
    return [defaultValue, setState];
  }

  return [state, setState];
};
