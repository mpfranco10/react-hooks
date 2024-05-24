import { ReactNode, useState } from "react";
import "./App.css";
import { useCopyToClipboard } from "./hooks/useCopyToClipboard";
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

const FlexDiv = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </div>
);

const HookContainer = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      padding: "1rem 1.5rem 2rem",
      border: "1px solid grey",
      borderRadius: "1rem",
    }}
  >
    {children}
  </div>
);

const colors = [
  "red",
  "aquamarine",
  "pink",
  "greenyellow",
  "red",
  "mediumslateblue",
];

function App() {
  const [count, setCount] = useState(0);
  const previousCount = usePrevious(count);

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
    if (nextIndex === colors.length) {
      nextIndex = 0;
    }
    setColorIndex(nextIndex);
  }, 1000);

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
        <HookContainer>
          <h2>Change document title</h2>
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

        <HookContainer>
          <h2>Default value</h2>
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

        <HookContainer>
          <h2>Use toggle</h2>
          <p>Value is: {String(checked)}</p>
          <button onClick={toggleChecked}>Toggle value</button>
        </HookContainer>

        <HookContainer>
          <h2>Use previous</h2>
          <FlexDiv>
            <p>Previous: {previousCount}</p>
            <p>Current: {count}</p>
          </FlexDiv>

          <button onClick={() => setCount((c) => c + 1)}>Increase count</button>
        </HookContainer>

        <HookContainer>
          <h2>Browser preferred language</h2>
          <p>{`Browser's current language is: ${language}`}</p>
        </HookContainer>

        <HookContainer>
          <h2>Browser Favicon</h2>
          <FlexDiv>
            <button onClick={() => setFavicon(UI_DEV_ICON)}>ui.dev icon</button>
            <button onClick={() => setFavicon(BYTES_ICON)}>bytes icon</button>
            <button onClick={() => setFavicon(NEWSLETTER_ICON)}>
              react newsletter icon
            </button>
          </FlexDiv>
        </HookContainer>

        <HookContainer>
          <p>Copy to clipboard</p>
          <button onClick={() => copyToClipboard("Copy this text")}>
            Copy this text
          </button>
          <p>{`Copied text is: ${copiedText}`}</p>
          <p>Paste your text:</p>
          <input type="text" id="copy" name="copy" />
        </HookContainer>

        <HookContainer>
          <h2>Use interval</h2>
          <button onClick={() => clearInterval()}>Stop</button>
          <FlexDiv>
            <div
              className="colored-card"
              style={{ backgroundColor: colors[colorIndex] }}
            />
          </FlexDiv>
        </HookContainer>
      </div>
    </div>
  );
}

export default App;
