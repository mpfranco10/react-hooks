/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useState } from "react";

interface ListActions {
  set: (l: any[]) => void;
  push: (element: any) => void;
  removeAt: (index: number) => void;
  insertAt: (index: number, element: any) => void;
  updateAt: (index: number, element: any) => void;
  clear: () => void;
}

export const useList = (defaultList: any[] = []): [any[], ListActions] => {
  const [list, setList] = useState(defaultList);

  const set = useCallback((l: any[]) => {
    setList(l);
  }, []);

  const push = useCallback((element: any) => {
    setList((l) => [...l, element]);
  }, []);

  const removeAt = useCallback((index: number) => {
    setList((l) => {
      const newList = [...l];
      newList.splice(index, 1);
      return newList;
    });
  }, []);

  const insertAt = useCallback((index: number, element: any) => {
    setList((l) => {
      const newList = [...l];
      newList.splice(index, 0, element);
      return newList;
    });
  }, []);

  const updateAt = useCallback((index: number, element: any) => {
    setList((l) => {
      const newList = [...l];
      newList.splice(index, 1, element);
      return newList;
    });
  }, []);

  const clear = useCallback(() => {
    setList([]);
  }, []);

  return [list, { set, push, removeAt, insertAt, updateAt, clear }];
};
