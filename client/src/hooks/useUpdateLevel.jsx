import React, {  } from "react";
import { updateLevelApi } from "../services/update_level_api";
import { useFetchThreshold } from "./useFetchThreshold";
export const useUpdateLevel = () => {
  const {
    handleGetValueThreshold,
    handleInputThresholdChange,
    resetInput,
    levelInput,
    warning,
    setWarning,
  } = useFetchThreshold();

  const onSaveClick = async ({ patientId, setFormData, setIsOpen, handleUpdateList}) => {

    if (!levelInput.suggestedLevel) {
      setWarning("Please enter your level!");
      return;
    }
    const result = await handleGetValueThreshold();
    const rowData = result && result.length > 0 ? result[0] : null;
    
    setFormData((prev) => ({
      ...prev,
      level: levelInput.suggestedLevel,
      threshold: rowData.threshold_value,
      status: rowData.status,
      color: rowData.color_code
    }));

    setIsOpen(false);
    resetInput();

    const payload = {
      level: levelInput.suggestedLevel,
      threshold: rowData.threshold_value,
      status: rowData.status,
      color: rowData.color_code,
    };

    console.log("Dữ liệu update level gửi đi:", payload);

    try {
      await updateLevelApi.setLevel(patientId, payload);
      console.log("Update level success ");
      if(handleUpdateList) {
        handleUpdateList({
          patient_id: patientId,
          risk_level: levelInput.suggestedLevel,
          final_status: rowData.status,
          color_code: rowData.color_code,
        })
      }
    } catch (err) {
      console.log("Update level failed!", err);
    }
  };
  return {
    onSaveClick,
    handleInputThresholdChange,
    levelInput,
    warning,
    setWarning,
  };
};
