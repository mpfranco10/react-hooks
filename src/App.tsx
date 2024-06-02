import { ReactNode, useState } from "react";
import "./App.css";
import { ScrollComponent } from "./AuxiliarComponents";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
import { useCounter } from "./hooks/useCounter";
import { useDefault } from "./hooks/useDefault";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import {
  BYTES_ICON,
  NEWSLETTER_ICON,
  UI_DEV_ICON,
  useFavicon,
} from "./hooks/useFavicon";
import { useInterval } from "./hooks/useInterval";
import usePreferredLanguage from "./hooks/usePreferredLanguage";
import { usePrevious } from "./hooks/usePrevious";
import { useToggle } from "./hooks/useToggle";

const FlexDiv = ({
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
    }}
  >
    {children}
  </div>
);

const HookContainer = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div
    style={{
      padding: "1rem 1.5rem 2rem",
      border: "1px solid grey",
      borderRadius: "1rem",
    }}
  >
    <h2>{title}</h2>
    {children}
  </div>
);

const COLORS = [
  "red",
  "aquamarine",
  "pink",
  "greenyellow",
  "red",
  "mediumslateblue",
];

const MIN_COUNT = -5;
const MAX_COUNT = 5;

function App() {
  const [exampleCount, setExampleCount] = useState(0);
  const previousCount = usePrevious(exampleCount);

  const language = usePreferredLanguage();

  const [state, setState] = useDefault<string>("initial", "default");

  const [checked, toggleChecked] = useToggle(false);

  const [title, setTitle] = useState("React hooks");
  useDocumentTitle(title);

  const [favicon, setFavicon] = useState(UI_DEV_ICON);
  useFavicon(favicon);

  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const [colorIndex, setColorIndex] = useState(0);
  const clearInterval = useInterval(() => {
    let nextIndex = colorIndex + 1;
    if (nextIndex === COLORS.length) {
      nextIndex = 0;
    }
    setColorIndex(nextIndex);
  }, 1000);

  const [count, { increment, decrement, set, reset }] = useCounter(0, {
    min: MIN_COUNT,
    max: MAX_COUNT,
  });

  const [openScrollComponent, setOpenScrollComponent] = useState(false);

  return (
    <div>
      <h1>useHooks rebuild</h1>
      <p>
        Project to build from scratch hooks from ui.dev{" "}
        <a href="https://usehooks.com/" target="_blank">
          useHooks
        </a>
      </p>
      <div className="hooks-grid">
        <HookContainer title="Change document title">
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
        </HookContainer>

        <HookContainer title="Default value">
          <p>Sets a default value if the state is set to null or undefined</p>
          <p>{state}</p>
          <FlexDiv>
            <button onClick={() => setState(null)}>Set to null</button>
            <button onClick={() => setState(undefined)}>
              Set to undefined
            </button>
            <button onClick={() => setState("value")}>Set to value</button>
          </FlexDiv>
        </HookContainer>

        <HookContainer title="Use toggle">
          <p>Value is: {String(checked)}</p>
          <button onClick={toggleChecked}>Toggle value</button>
        </HookContainer>

        <HookContainer title="Use previous">
          <FlexDiv>
            <p>Previous: {previousCount}</p>
            <p>Current: {exampleCount}</p>
          </FlexDiv>

          <button onClick={() => setExampleCount((c) => c + 1)}>
            Increase count
          </button>
        </HookContainer>

        <HookContainer title="Browser preferred language">
          <p>{`Browser's current language is: ${language}`}</p>
        </HookContainer>

        <HookContainer title="Browser Favicon">
          <FlexDiv>
            <button onClick={() => setFavicon(UI_DEV_ICON)}>ui.dev icon</button>
            <button onClick={() => setFavicon(BYTES_ICON)}>bytes icon</button>
            <button onClick={() => setFavicon(NEWSLETTER_ICON)}>
              react newsletter icon
            </button>
          </FlexDiv>
        </HookContainer>

        <HookContainer title="Copy to clipboard">
          <button onClick={() => copyToClipboard("Copy this text")}>
            Copy this text
          </button>
          <p>{`Copied text is: ${copiedText}`}</p>
          <p>Paste your text:</p>
          <input type="text" id="copy" name="copy" />
        </HookContainer>

        <HookContainer title="Use interval">
          <button onClick={() => clearInterval()}>Stop</button>
          <FlexDiv>
            <div
              className="colored-card"
              style={{ backgroundColor: COLORS[colorIndex] }}
            />
          </FlexDiv>
        </HookContainer>

        <HookContainer title="Use counter">
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
        </HookContainer>

        <HookContainer title="Use lock scroll">
          <p>
            When the component that uses the hook is open, it will block
            scrolling in the document
          </p>
          <button onClick={() => setOpenScrollComponent((p) => !p)}>
            {`${openScrollComponent ? "Close" : "Open"} component`}{" "}
          </button>
          {openScrollComponent && <ScrollComponent />}
        </HookContainer>
      </div>
    </div>
  );
}

export default App;
