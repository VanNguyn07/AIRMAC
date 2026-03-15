import React, { createContext, useState, useCallback, useEffect } from "react";
import { updateProcessStatusApi } from "../services/update_proccess_status_api";

export const MonitoringSessionContext = createContext();

export const MonitoringSessionProvider = ({ children }) => {
  const [monitoringSession, setMonitoringSession] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Khởi tạo session khi ấn SETUP
  const startMonitoringSession = useCallback(
    async (patientId, formData, deviceId) => {
      try {
        setIsLoading(true);
        console.log("Starting monitoring session for patient:", patientId, "device:", deviceId);
        
        // Call API để lưu vào database
        const result = await updateProcessStatusApi.setProcessStatus(
          patientId,
          "IN_PROGRESS",
          deviceId // Thêm device_id
        );

        console.log("API response:", result);

        if (result.success) {
          const session = {
            patientId,
            formData,
            deviceId,
            currentThreshold: formData.threshold,
            startedAt: new Date().toISOString(),
          };
          setMonitoringSession(session);
          
          // ✅ Backup vào localStorage
          localStorage.setItem(
            "activeMonitorSession",
            JSON.stringify(session)
          );
          
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error starting monitoring session:", error);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Kết thúc session khi ấn DONE
  const endMonitoringSession = useCallback(async (patientId, deviceId) => {
    try {
      setIsLoading(true);
      console.log("Ending monitoring session for patient:", patientId);
      
      await updateProcessStatusApi.setProcessStatus(
        patientId,
        "DONE",
        deviceId,
      );
      
      setMonitoringSession(null);
      localStorage.removeItem("activeMonitorSession");
      return true;
    } catch (error) {
      console.error("Error ending monitoring session:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load session từ localStorage (khi F5 page)
  const loadSessionFromStorage = useCallback(() => {
    try {
      const saved = localStorage.getItem("activeMonitorSession");
      if (saved) {
        const session = JSON.parse(saved);
        console.log("Loaded session from localStorage:", session);
        setMonitoringSession(session);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error loading session from storage:", error);
      return false;
    }
  }, []);

  // Tự động load khi app khởi động
  useEffect(() => {
    loadSessionFromStorage();
  }, [loadSessionFromStorage]);

  const value = {
    monitoringSession,
    isLoading,
    startMonitoringSession,
    endMonitoringSession,
    loadSessionFromStorage,
    setMonitoringSession, // Cho phép manual set nếu cần
  };

  return (
    <MonitoringSessionContext.Provider value={value}>
      {children}
    </MonitoringSessionContext.Provider>
  );
};
