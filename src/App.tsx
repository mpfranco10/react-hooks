import { ReactNode } from "react";
import "./App.css";
import {
  BatteryDemo,
  ClickAwayDemo,
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
  MouseDemo,
  ObjectStateDemo,
  PageLeaveDemo,
  PreviousDemo,
  QueueContainer,
  RandomIntervalDemo,
  RetryDemo,
  ScreenOrientationDemo,
  ScrollDemo,
  TimeoutDemo,
  TitleDemo,
  ToggleDemo,
  UseLoggerDemo,
  VisibilityDemo,
  WhenIntervalDemo,
  WindowScrollDemo,
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

const App = () => {
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

        <HookContainer title="Conditional interval">
          <WhenIntervalDemo />
        </HookContainer>

        <HookContainer title="Mouse position">
          <MouseDemo />
        </HookContainer>

        <HookContainer title="Click away">
          <ClickAwayDemo />
        </HookContainer>

        <HookContainer title="Window scroll">
          <WindowScrollDemo />
        </HookContainer>

        <HookContainer title="Use logger">
          <UseLoggerDemo />
        </HookContainer>

        <HookContainer title="Screen orientation">
          <ScreenOrientationDemo />
        </HookContainer>

        <HookContainer title="Use battery">
          <BatteryDemo />
        </HookContainer>

        <HookContainer title="Use page leave">
          <PageLeaveDemo />
        </HookContainer>
      </div>
    </div>
  );
};

export default App;
