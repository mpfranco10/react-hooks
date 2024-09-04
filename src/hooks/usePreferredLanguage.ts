import { useSyncExternalStore } from "react";

const subscribe = (callback: () => void) => {
  window.addEventListener("languagechange", callback);
  return () => window.removeEventListener("languagechange", callback);
};

const getSnapshot = () => {
  return navigator.language;
};

const getServerSnapshot = () => {
  throw Error("usePreferredLanguage is a client-only hook");
};

export const usePreferredLanguage = () => {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
