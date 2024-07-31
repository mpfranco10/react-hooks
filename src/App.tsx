import { ReactNode } from "react";
import "./App.css";
import {
  CopyDemo,
  CounterDemo,
  DebounceDemo,
  DefaultValueDemo,
  EventListenerDemo,
  FaviconDemo,
  HistoryStateDemo,
  IntervalDemo,
  LanguageDemo,
  ListDemo,
  MediaQueryDemo,
  ObjectStateDemo,
  PreviousDemo,
  QueueContainer,
  RandomIntervalDemo,
  RetryDemo,
  ScrollDemo,
  TimeoutDemo,
  TitleDemo,
  ToggleDemo,
  VisibilityDemo,
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

      <HookContainer title="Use document visibility change">
        <VisibilityDemo />
      </HookContainer>

      <HookContainer title="Use list">
        <ListDemo />
      </HookContainer>

      <HookContainer title="Use object state">
        <ObjectStateDemo />
      </HookContainer>

      <HookContainer title="Use debounce">
        <DebounceDemo />
      </HookContainer>

      <HookContainer title="Use continuous retry">
        <RetryDemo />
      </HookContainer>

      <HookContainer title="Use history state">
        <HistoryStateDemo />
      </HookContainer>

      <HookContainer title="Use random interval">
        <RandomIntervalDemo />
      </HookContainer>

      <HookContainer title="Event listener">
        <EventListenerDemo />
      </HookContainer>

      <HookContainer title="Media query">
        <MediaQueryDemo />
      </HookContainer>
    </div>
  </div>
);

export default App;
