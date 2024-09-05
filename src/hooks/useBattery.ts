/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

interface BatteryState {
  supported: boolean;
  loading: boolean;
  level: number | null;
  charging: boolean | null;
  chargingTime: number | null;
  dischargingTime: number | null;
}

export const useBattery = () => {
  const [state, setState] = useState<BatteryState>({
    supported: true,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    if (!(navigator as any).getBattery) {
      setState((s) => ({
        ...s,
        supported: false,
        loading: false,
      }));
      return;
    }

    let battery: any = null;

    const handleChange = () => {
      setState({
        supported: true,
        loading: false,
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      });
    };

    (navigator as any).getBattery().then((b: any) => {
      battery = b;
      handleChange();
      b.addEventListener("levelchange", handleChange);
      b.addEventListener("chargingchange", handleChange);
      b.addEventListener("chargingtimechange", handleChange);
      b.addEventListener("dischargingtimechange", handleChange);
    });

    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", handleChange);
        battery.removeEventListener("chargingchange", handleChange);
        battery.removeEventListener("chargingtimechange", handleChange);
        battery.removeEventListener("dischargingtimechange", handleChange);
      }
    };
  }, []);

  return state;
};
