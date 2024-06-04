import { useCallback, useState } from "react";

export const useQueue = <T>(initialValue: T[] = []) => {
  const [queue, setQueue] = useState(initialValue);

  const add = useCallback((element: T) => {
    setQueue((lastQueue) => {
      return [...lastQueue, element];
    });
  }, []);

  const remove = useCallback(() => {
    let removedElement;

    setQueue(([first, ...q]) => {
      removedElement = first;
      return q;
    });

    return removedElement;
  }, []);

  const clear = useCallback(() => {
    setQueue([]);
  }, []);

  const size = queue.length;
  const first = size > 0 ? queue[0] : null;
  const last = size > 0 ? queue[size - 1] : null;

  return {
    add,
    remove,
    clear,
    first,
    last,
    size,
    queue,
  };
};
