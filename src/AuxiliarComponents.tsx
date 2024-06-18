import { startCase } from "lodash";
import { ReactNode, useEffect, useState } from "react";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import { useCounter } from "./hooks/useCounter";
import { useDebounce } from "./hooks/useDebounce";
import { useDefault } from "./hooks/useDefault";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import {
  BYTES_ICON,
  NEWSLETTER_ICON,
  UI_DEV_ICON,
  useFavicon,
} from "./hooks/useFavicon";
import { useInterval } from "./hooks/useInterval";
import { useList } from "./hooks/useList";
import { useLockBodyScroll } from "./hooks/useLockBodyScroll";
import { useObjectState } from "./hooks/useObjectState";
import usePreferredLanguage from "./hooks/usePreferredLanguage";
import { usePrevious } from "./hooks/usePrevious";
import { useQueue } from "./hooks/useQueue";
import useTimeout from "./hooks/useTimeout";
import { useToggle } from "./hooks/useToggle";
import { useVisibilityChange } from "./hooks/useVisibilityChange";
import { useWindowSize } from "./hooks/useWindowSize";
export const FlexDiv = ({
  rowDirection = true,
  children,
}: {
  rowDirection?: boolean;
  children: ReactNode;
}) => (
  <div
    style={{
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: rowDirection ? "row" : "column",
      flexWrap: "wrap",
    }}
  >
    {children}
  </div>
);

export const ScrollComponent = () => {
  useLockBodyScroll();
  return (
    <div>
      <h3>Hello! I'm a component</h3>
    </div>
  );
};

interface QueueDemoProps {
  first: number | null;
  last: number | null;
  size: number;
  queue: number[];
}

export const QueueDemo = ({ first, last, size, queue }: QueueDemoProps) => {
  return (
    <figure>
      <FlexDiv rowDirection={false}>
        <p>Front</p>
        <ul
          style={{
            listStyleType: "none",
            paddingLeft: 0,
            marginTop: 0,
            marginBottom: 0,
          }}
        >
          {queue.map((item) => {
            const isFirst = first === item;
            const isLast = last === item;
            if (isFirst) {
              return <li key={item}>First: {item}</li>;
            }
            if (isLast) {
              return <li key={item}>Last: {item}</li>;
            }
            return <li key={item}>Item: {item}</li>;
          })}
        </ul>
        <p>Back</p>
      </FlexDiv>
      <figcaption>{size} items in the queue</figcaption>
    </figure>
  );
};

export const QueueContainer = () => {
  const { add, remove, clear, first, last, size, queue } = useQueue([1, 2, 3]);

  return (
    <div>
      <FlexDiv>
        <button className="link" onClick={() => add((last ?? 0) + 1)}>
          Add
        </button>
        <button disabled={size === 0} className="link" onClick={() => remove()}>
          Remove
        </button>
        <button disabled={size === 0} className="link" onClick={() => clear()}>
          Clear
        </button>
      </FlexDiv>
      <QueueDemo queue={queue} size={size} first={first} last={last} />
    </div>
  );
};

export const TitleDemo = () => {
  const [title, setTitle] = useState("React hooks");
  useDocumentTitle(title);

  return (
    <>
      <p>Type in to change the document title</p>
      <input
        onChange={(e) => {
          const val = e.target.value;
          if (val) {
            setTitle(val);
          } else {
            setTitle("React hooks");
          }
        }}
        type="text"
        id="title"
        name="title"
        maxLength={15}
      />
    </>
  );
};

export const DefaultValueDemo = () => {
  const [state, setState] = useDefault<string>("initial", "default");

  return (
    <>
      <p>Sets a default value if the state is set to null or undefined</p>
      <p>{state}</p>
      <FlexDiv>
        <button onClick={() => setState(null)}>Set to null</button>
        <button onClick={() => setState(undefined)}>Set to undefined</button>
        <button onClick={() => setState("value")}>Set to value</button>
      </FlexDiv>
    </>
  );
};

export const ToggleDemo = () => {
  const [checked, toggleChecked] = useToggle(false);

  return (
    <>
      <p>Value is: {String(checked)}</p>
      <button onClick={toggleChecked}>Toggle value</button>
    </>
  );
};

export const PreviousDemo = () => {
  const [exampleCount, setExampleCount] = useState(0);
  const previousCount = usePrevious(exampleCount);

  return (
    <>
      <FlexDiv>
        <p>Previous: {previousCount}</p>
        <p>Current: {exampleCount}</p>
      </FlexDiv>

      <button onClick={() => setExampleCount((c) => c + 1)}>
        Increase count
      </button>
    </>
  );
};

export const LanguageDemo = () => {
  const language = usePreferredLanguage();

  return <p>{`Browser's current language is: ${language}`}</p>;
};

export const FaviconDemo = () => {
  const [favicon, setFavicon] = useState(UI_DEV_ICON);
  useFavicon(favicon);

  return (
    <FlexDiv>
      <button onClick={() => setFavicon(UI_DEV_ICON)}>ui.dev icon</button>
      <button onClick={() => setFavicon(BYTES_ICON)}>bytes icon</button>
      <button onClick={() => setFavicon(NEWSLETTER_ICON)}>
        react newsletter icon
      </button>
    </FlexDiv>
  );
};

export const CopyDemo = () => {
  const [copiedText, copyToClipboard] = useCopyToClipboard();

  return (
    <>
      <button onClick={() => copyToClipboard("Copy this text")}>
        Copy this text
      </button>
      <p>{`Copied text is: ${copiedText}`}</p>
      <p>Paste your text:</p>
      <input type="text" id="copy" name="copy" />
    </>
  );
};

const COLORS = [
  "red",
  "aquamarine",
  "pink",
  "greenyellow",
  "red",
  "mediumslateblue",
];

export const IntervalDemo = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const clearInterval = useInterval(() => {
    let nextIndex = colorIndex + 1;
    if (nextIndex === COLORS.length) {
      nextIndex = 0;
    }
    setColorIndex(nextIndex);
  }, 1000);

  return (
    <>
      <button onClick={() => clearInterval()}>Stop</button>
      <FlexDiv>
        <div
          className="colored-card"
          style={{ backgroundColor: COLORS[colorIndex] }}
        />
      </FlexDiv>
    </>
  );
};

const MIN_COUNT = -5;
const MAX_COUNT = 5;

export const CounterDemo = () => {
  const [count, { increment, decrement, set, reset }] = useCounter(0, {
    min: MIN_COUNT,
    max: MAX_COUNT,
  });

  return (
    <>
      <p>{`Min: ${MIN_COUNT}, Max: ${MAX_COUNT}`}</p>
      <p>{`Count is ${count}`}</p>
      <FlexDiv>
        <button onClick={increment} disabled={count === MAX_COUNT}>
          Increment
        </button>
        <button onClick={decrement} disabled={count === MIN_COUNT}>
          Decrement
        </button>
        <button onClick={() => set(2)}>Set to 2</button>
        <button onClick={reset}>Reset</button>
      </FlexDiv>
    </>
  );
};

export const ScrollDemo = () => {
  const [openScrollComponent, setOpenScrollComponent] = useState(false);

  return (
    <>
      <p>
        When the component that uses the hook is open, it will block scrolling
        in the document
      </p>
      <button onClick={() => setOpenScrollComponent((p) => !p)}>
        {`${openScrollComponent ? "Close" : "Open"} component`}{" "}
      </button>
      {openScrollComponent && <ScrollComponent />}
    </>
  );
};

interface BombProps {
  hasExploded: boolean;
  hasDefused: boolean;
  handleClick: () => void;
}

const emojiSize = { fontSize: "5rem" };

const Bomb = ({ hasExploded, hasDefused, handleClick }: BombProps) => {
  if (hasExploded) {
    return (
      <figure>
        <span role="img" aria-label="Explosion Emoji" style={emojiSize}>
          💥
        </span>
        <figcaption>You lose</figcaption>
      </figure>
    );
  }

  if (hasDefused) {
    return (
      <figure>
        <span role="img" aria-label="Explosion Emoji" style={emojiSize}>
          🎉
        </span>
        <figcaption>You Win</figcaption>
      </figure>
    );
  }

  return (
    <button className="bomb" onClick={handleClick}>
      <span role="img" aria-label="Dynamite Emoji" style={emojiSize}>
        🧨
      </span>
    </button>
  );
};

export const TimeoutDemo = () => {
  const [hasDefused, setHasDefused] = useState(false);
  const [hasExploded, setHasExploded] = useState(false);
  const [delay, setDelay] = useState(1000);

  const clear = useTimeout(() => {
    setHasExploded(!hasExploded);
  }, delay);

  const handleClick = () => {
    clear();
    setHasDefused(true);
  };

  return (
    <>
      <p>You have 1s to defuse (click) the bomb or it will explode </p>
      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => {
            setHasDefused(false);
            setHasExploded(false);
            setDelay((d) => (d === 1000 ? d + 1 : d - 1));
          }}
        >
          Reset
        </button>
      </div>

      <Bomb
        hasDefused={hasDefused}
        hasExploded={hasExploded}
        handleClick={handleClick}
      />
    </>
  );
};

export const WindowSizeDemo = () => {
  const size = useWindowSize();
  return (
    <>
      <p>{`Width: ${size.width}`}</p>
      <p>{`Height: ${size.height}`}</p>
    </>
  );
};

export const VisibilityDemo = () => {
  const documentVisible = useVisibilityChange();
  const [tabAwayCount, setTabAwayCount] = useState(0);

  useEffect(() => {
    if (documentVisible === false) {
      setTabAwayCount((c) => c + 1);
    }
  }, [documentVisible]);

  return (
    <>
      <p>Tab away to see this counter increase!</p>
      <h3>{`Tab away count: ${tabAwayCount}`}</h3>
    </>
  );
};

export const ListDemo = () => {
  const [list, { set, push, removeAt, insertAt, clear }] = useList([
    "First",
    "Second",
    "Third",
  ]);

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <FlexDiv>
        <button
          disabled={list.length < 1}
          className="link"
          onClick={() => insertAt(1, "Inserted at first")}
        >
          Insert After First
        </button>
        <button
          disabled={list.length < 2}
          className="link"
          onClick={() => removeAt(1)}
        >
          Remove Second Item
        </button>
        <button className="link" onClick={() => set([1, 2, 3])}>
          Set 1, 2, 3
        </button>
        <button className="link" onClick={() => clear()}>
          Clear
        </button>
      </FlexDiv>
      <FlexDiv>
        <input
          name="add"
          id="add"
          title="Add"
          style={{ marginTop: "1rem" }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          style={{ marginTop: "1rem" }}
          disabled={!inputValue}
          onClick={() => {
            push(inputValue);
            setInputValue("");
          }}
        >
          Add
        </button>
      </FlexDiv>

      <p>{list.join(", ")}</p>
    </>
  );
};

interface IObjectKeys {
  [key: string]: string | number;
}

interface Penguin extends IObjectKeys {
  name: string;
  fishEaten: number;
  napHours: number;
  squidEaten: number;
}

const initialObject: Penguin = {
  name: "Peter",
  fishEaten: 244,
  napHours: 123,
  squidEaten: 6,
};

export const ObjectStateDemo = () => {
  const [objectState, setObjectState] = useObjectState(initialObject);

  return (
    <>
      <FlexDiv>
        <button
          onClick={() =>
            setObjectState((prevState: Penguin) => ({
              fishEaten: prevState.fishEaten + 1,
            }))
          }
        >
          Eat a fish 🐟
        </button>
        <button
          onClick={() =>
            setObjectState((prevState: Penguin) => ({
              napHours: prevState.napHours + 1,
            }))
          }
        >
          Take a nap 🛏️
        </button>
        <button
          onClick={() =>
            setObjectState((prevState: Penguin) => ({
              squidEaten: prevState.squidEaten + 1,
            }))
          }
        >
          Eat a squid 🦑
        </button>
        <button onClick={() => setObjectState(initialObject)}>Reset</button>
      </FlexDiv>
      <table>
        <thead>
          <tr>
            {Object.keys(objectState).map((key) => {
              return <th key={key}>{startCase(key)}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.keys(objectState).map((key) => {
              // @ts-expect-error key is safe to use here
              const val = objectState[key];
              return <td key={val}>{val}</td>;
            })}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export const DebounceDemo = () => {
  const [inputVal, setInputVal] = useState("");
  const debouncedValue = useDebounce(inputVal, 300);

  return (
    <>
      <input
        type="text"
        title="Type something"
        value={inputVal}
        onChange={(event) => setInputVal(event.target.value)}
      />
      <p>Debounced value is: {debouncedValue}</p>
    </>
  );
};
