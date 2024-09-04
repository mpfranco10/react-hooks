import { useState, useLayoutEffect } from "react";

export const UNKNOWN_ORIENTATION = "UNKNOWN";

interface Orientation {
  angle: number;
  type: OrientationType | typeof UNKNOWN_ORIENTATION;
}

export const useOrientation = () => {
  const [orientation, setOrientation] = useState<Orientation>({
    angle: 0,
    type: UNKNOWN_ORIENTATION,
  });

  useLayoutEffect(() => {
    const handleWindowScreenOrientationChange = () => {
      const { angle, type } = window.screen.orientation;
      setOrientation({
        angle,
        type,
      });
    };

    const handleWindowFallbackChange = () => {
      setOrientation({
        type: UNKNOWN_ORIENTATION,
        angle: window.orientation,
      });
    };

    if (window.screen?.orientation) {
      handleWindowScreenOrientationChange();
      window.screen.orientation.addEventListener(
        "change",
        handleWindowScreenOrientationChange
      );
    } else {
      handleWindowFallbackChange();
      window.addEventListener("orientationchange", handleWindowFallbackChange);
    }

    return () => {
      if (window.screen?.orientation) {
        window.screen.orientation.removeEventListener(
          "change",
          handleWindowScreenOrientationChange
        );
      } else {
        window.removeEventListener(
          "orientationchange",
          handleWindowFallbackChange
        );
      }
    };
  }, []);

  return orientation;
};
