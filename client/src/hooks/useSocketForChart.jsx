import React, { useEffect, useState, useRef } from "react";
import io from "socket.io-client";

let socket = null;
let socketInstance = 0; // Số lần hook được gọi

const getSocket = () => {
  if (!socket) {
    socket = io.connect("http://localhost:3001");
  }
  return socket;
};

export const useSocketForChart = () => {
  const [dataList, setDataList] = useState([]);
  const [alertInfo, setAlertInfo] = useState(null);
  const [currentThreshold, setCurrentThreshold] = useState(0);

  const socketInstanceRef = useRef(null);
  useEffect(() => {
    const currentSocket = getSocket();
    socketInstanceRef.current = ++socketInstance;

    const sessionData = localStorage.getItem("activeMonitorSession");
    let initThreshold = 999;

    if (sessionData) {
      const parsedData = JSON.parse(sessionData);
      initThreshold = Number(parsedData?.formData?.threshold ?? 0);
    }
    setCurrentThreshold(initThreshold);
    //  báo cho Server biết ngưỡng này khi vừa mở app
    currentSocket.emit("client:setThreshold", initThreshold);

    const handleSendData = (newData) => {
      const formatData = {
        ...newData,
        value: Number(newData.value), // ✅ Chuyển đổi thành number
        time: new Date(newData.time).getSeconds().toString().padStart(2, "0"),
      };
      setDataList((currentData) => {
        const updateData = [...currentData, formatData];
        if (updateData.length > 50) {
          updateData.shift(); // Xóa cái cũ nhất
        }
        return updateData;
      });
    };

    const handleAlert = (alertData) => {
      const sixDataPoints = alertData.historyThresholdPoints;
      const timeHappened = new Date(alertData.timeHappened).toLocaleTimeString();
      setAlertInfo({
        sixDataPoints: sixDataPoints,
        timeHappened: timeHappened,
      });
    };

    currentSocket.on("server:sendData", handleSendData);
    currentSocket.on("server:alert", handleAlert);

    return () => {
      currentSocket.off("server:sendData", handleSendData);
      currentSocket.off("server:alert", handleAlert);
    };
  }, []);

  const handleDismiss = () => {
    setAlertInfo(null); // Tắt popup
    const currentSocket = getSocket();
    currentSocket.emit("client:resumeSystem"); // Báo server chạy tiếp
  };

  const handleAcknowledge = () => {
    setAlertInfo(null);
    setCurrentThreshold(0);
  }
  return { dataList, alertInfo, setAlertInfo, handleDismiss, handleAcknowledge, currentThreshold };
};
