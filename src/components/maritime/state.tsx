import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { getVessel, type TemporalMode } from "@/lib/maritime";

type MaritimeState = {
  selectedVesselId: string;
  setSelectedVesselId: (id: string) => void;
  mode: TemporalMode;
  setMode: (mode: TemporalMode) => void;
  hoursAgo: number;
  setHoursAgo: (hours: number) => void;
  futureHours: number;
  setFutureHours: (hours: number) => void;
};

const MaritimeContext = createContext<MaritimeState | null>(null);

export function MaritimeProvider({ children }: { children: ReactNode }) {
  const [selectedVesselId, setSelectedVesselId] = useState("v1");
  const [mode, setMode] = useState<TemporalMode>("LIVE");
  const [hoursAgo, setHoursAgo] = useState(0);
  const [futureHours, setFutureHours] = useState(6);
  const state = useMemo(
    () => ({ selectedVesselId, setSelectedVesselId, mode, setMode, hoursAgo, setHoursAgo, futureHours, setFutureHours }),
    [selectedVesselId, mode, hoursAgo, futureHours],
  );
  return <MaritimeContext.Provider value={state}>{children}</MaritimeContext.Provider>;
}

export function useMaritime() {
  const state = useContext(MaritimeContext);
  if (!state) throw new Error("Maritime workspace must be inside MaritimeProvider");
  return { ...state, vessel: getVessel(state.selectedVesselId) };
}