import React, { useEffect, useState } from "react";
import { fetchAirmacApi } from "../services/fetch_airmac_api";

export const useFetchAirmac = () => {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [selectedDeviceDetail, setSelectedDeviceDetail] = useState([]);

  const readyDevices = selectedDeviceDetail.filter(
    (device) => device.device_status === "READY"
  );
  const handleSelectedChange = (e) => {
    const idSelected = e.target.value;
    setSelectedDeviceId(idSelected);
  };
  useEffect(() => {
    const handleFetchAirmac = async () => {
      const result = await fetchAirmacApi.getDeviceIdRoomId();
      console.log("Dữ liệu thô từ API:", result);
      setSelectedDeviceDetail(result);
    };
    handleFetchAirmac();
  }, []);
  return {
    readyDevices,
    selectedDeviceId,
    allDevices: selectedDeviceDetail,
    handleSelectedChange,
  };
};
