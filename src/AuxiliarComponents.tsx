import { useLockBodyScroll } from "./hooks/useLockBodyScroll";

export const ScrollComponent = () => {
  useLockBodyScroll();
  return (
    <div>
      <h3>Hello! I'm a component</h3>
    </div>
  );
};
