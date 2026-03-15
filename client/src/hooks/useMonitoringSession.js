import { useContext } from "react";
import { MonitoringSessionContext } from "../contexts/MonitoringSessionContext";

export const useMonitoringSession = () => {
  const context = useContext(MonitoringSessionContext);
  if (!context) {
    throw new Error(
      "useMonitoringSession must be used within MonitoringSessionProvider"
    );
  }
  return context;
};
