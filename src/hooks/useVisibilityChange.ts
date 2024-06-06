import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  document.addEventListener("visibilitychange", callback);

  return () => {
    document.removeEventListener("visibilitychange", callback);
  };
};

const getSnapshot = () => {
  return document.visibilityState;
};

const getServerSnapshot = () => {
  throw Error("useVisibilityChange is a client-only hook");
};

export const useVisibilityChange = () => {
  const visibilityState = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return visibilityState === "visible";
};
