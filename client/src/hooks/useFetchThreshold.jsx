import React, { useState } from "react";
import { fetchThresholdApi } from "../services/fetch_threshold_api";
export const useFetchThreshold = () => {
  const [levelInput, setLevelInput] = useState({
    suggestedLevel: "",
  });
  const [warning, setWarning] = useState("");

  const handleGetValueThreshold = async () => {
    const valueToSend = levelInput.suggestedLevel;
    if (!valueToSend) {
      setWarning("Vui lòng nhập số Level!"); // Set nội dung lỗi
      return; // Dừng hàm, không lưu, không gọi API
    }
    setWarning("");
    try {
      const result = await fetchThresholdApi.getValueThreshold(valueToSend);
      console.log("Tìm thấy:", result, "kết quả");
      return result; // status, color, threshold
    } catch (err) {
      console.log("Search failed!", err);
      return [];
    }
  };

  const handleInputThresholdChange = (e) => {
    const { name, value } = e.target;
    setLevelInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const resetInput = () => setLevelInput({ suggestedLevel: "" });
  return {
    handleGetValueThreshold,
    handleInputThresholdChange,
    resetInput,
    levelInput,
    warning,
    setWarning
  };
};
