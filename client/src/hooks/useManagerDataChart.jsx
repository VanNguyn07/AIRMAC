import React, { useEffect, useState } from "react";
export const useManagerDataChart = () => {
  const MAX_DATA_POINTS = 50;
  const [data, setData] = useState([]);

  // Hàm giả lập dữ liệu LPM (Liters Per Minute)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("vi-VN", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const randomValue = (0.3 + Math.sin(Date.now() / 1000) * 0.1).toFixed(2);

      setData((prev) => {
        const newPoint = { time: timeString, value: randomValue };
        const newData = [...prev, newPoint];
        if (newData.length > MAX_DATA_POINTS) {
          return newData.slice(newData.length - MAX_DATA_POINTS);
        }
        return newData;
      });
    }, 500); // 1 giây cập nhật 1 lần

    return () => clearInterval(interval);
  }, []);
  return { data };
};
