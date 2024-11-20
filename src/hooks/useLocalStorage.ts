/* eslint-disable @typescript-eslint/no-explicit-any */
// FUTURE: https://usehooks.com/uselocalstorage

import { useSyncExternalStore, useCallback, useEffect } from "react";

const dispatchStorageEvent = (key: string, newValue: any) => {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
};

const setItem = (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  dispatchStorageEvent(key, stringifiedValue);
};

const removeItem = (key: string) => {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
};

const getItem = (key: string) => {
  return window.localStorage.getItem(key);
};

const subscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getServerSnapshot = () => {
  throw Error("useLocalStorage is a client-only hook");
};

export default function useLocalStorage(key: string, initialValue: any) {
  const getSnapshot = () => getItem(key);

  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setState = useCallback(
    (v: (t: string) => void) => {
      try {
        const nextState = typeof v === "function" ? v(JSON.parse(store!)) : v;

        if (nextState === undefined || nextState === null) {
          removeItem(key);
        } else {
          setItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, store]
  );

  useEffect(() => {
    if (getItem(key) === null && typeof initialValue !== "undefined") {
      setItem(key, initialValue);
    }
  }, [key, initialValue]);

  return [store ? JSON.parse(store) : initialValue, setState];
}
