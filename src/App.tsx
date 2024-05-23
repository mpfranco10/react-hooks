import { ReactNode, useState } from "react";
import "./App.css";
import { useDefault } from "./hooks/useDefault";
import { useDocumentTitle } from "./hooks/useDocumentTitle";
import {
  BYTES_ICON,
  NEWSLETTER_ICON,
  UI_DEV_ICON,
  useFavicon,
} from "./hooks/useFavicon";
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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
          <button onClick={() => setState(undefined)}>Set to undefined</button>
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
        <p>{language}</p>
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
    </div>
  );
}

export default App;
