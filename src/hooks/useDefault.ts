import { useState } from "react";

export const useDefault = <T>(initialValue: T, defaultValue: T) => {
  const [state, setState] = useState<T>(initialValue);

  if (typeof state === "undefined" || state === null) {
    return [defaultValue, setState];
  }

  return [state, setState];
};
