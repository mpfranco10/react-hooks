import { ReactNode } from "react";
import "./App.css";
import {
  CopyDemo,
  CounterDemo,
  DefaultValueDemo,
  FaviconDemo,
  IntervalDemo,
  LanguageDemo,
  PreviousDemo,
  QueueContainer,
  ScrollDemo,
  TimeoutDemo,
  TitleDemo,
  ToggleDemo,
  WindowSizeDemo,
} from "./AuxiliarComponents";

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

const App = () => (
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
        <TitleDemo />
      </HookContainer>

      <HookContainer title="Default value">
        <DefaultValueDemo />
      </HookContainer>

      <HookContainer title="Use toggle">
        <ToggleDemo />
      </HookContainer>

      <HookContainer title="Use previous">
        <PreviousDemo />
      </HookContainer>

      <HookContainer title="Browser preferred language">
        <LanguageDemo />
      </HookContainer>

      <HookContainer title="Browser Favicon">
        <FaviconDemo />
      </HookContainer>

      <HookContainer title="Copy to clipboard">
        <CopyDemo />
      </HookContainer>

      <HookContainer title="Use interval">
        <IntervalDemo />
      </HookContainer>

      <HookContainer title="Use counter">
        <CounterDemo />
      </HookContainer>

      <HookContainer title="Use lock scroll">
        <ScrollDemo />
      </HookContainer>

      <HookContainer title="Use queue">
        <QueueContainer />
      </HookContainer>

      <HookContainer title="Use timeout">
        <TimeoutDemo />
      </HookContainer>

      <HookContainer title="Use window size">
        <WindowSizeDemo />
      </HookContainer>
    </div>
  </div>
);

export default App;
