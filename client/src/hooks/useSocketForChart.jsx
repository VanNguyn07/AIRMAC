import React, { useEffect, useState } from "react";
import io from "socket.io-client";

// connection to backend
const socket = io.connect("https://airmac.onrender.com");

export const useSocketForChart = () => {
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    socket.on("server:sendData", (newData) => {
      const formatData = {
        ...newData,
        timestamp: new Date(newData.timestamp)
          .getSeconds()
          .toString()
          .padStart(2, "0"),
      };
      setDataList((currentData) => {
        const updateData = [...currentData, formatData];
        if (updateData.length > 50) {
          updateData.shift(); //// Xóa cái cũ nhất
        }
        return updateData;
      });
    });
    return () => {
      socket.off("disconnect");
    };
  }, []);
  return { dataList };
};
