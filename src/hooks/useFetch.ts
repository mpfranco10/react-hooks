/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useRef,
  useReducer,
  useEffect,
  experimental_useEffectEvent as useEffectEvent,
} from "react";

//FUTURE: https://usehooks.com/usefetch
const initialState = {
  error: undefined,
  data: undefined,
};

const reducer = (state: unknown, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "loading":
      return { ...initialState };
    case "fetched":
      return { ...initialState, data: action.payload };
    case "error":
      return { ...initialState, error: action.payload };
    default:
      return state;
  }
};

export const useFetch = (url: string, options?: RequestInit) => {
  const cacheRef = useRef<{ url: string }>({ url: "" });

  const [state, dispatch] = useReducer(reducer, initialState);

  const onFetch = useEffectEvent((url: string) => {
    return fetch(url, options);
  });

  useEffect(() => {
    let ignore = false;

    const fetchData = async () => {
      const cachedResponse = cacheRef.current.url;

      if (cachedResponse) {
        dispatch({ type: "fetched", payload: cachedResponse });
        return;
      }

      dispatch({ type: "loading" });

      try {
        const res = await onFetch(url);

        if (!res.ok) {
          throw new Error(res.statusText);
        }

        const json = await res.json();
        cacheRef.current.url = json;

        if (ignore === false) {
          dispatch({ type: "fetched", payload: json });
        }
      } catch (e) {
        if (ignore === false) {
          dispatch({ type: "error", payload: e });
        }
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [url]);

  return state;
};
