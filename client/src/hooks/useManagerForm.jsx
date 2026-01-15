import React, { useState } from "react";
import { managerFormApi } from "../services/manager_form_api";
import { useCalculateAge } from "./useCalculateAge";
import { useFetchAirmac } from "./useFetchAirmac";
import { useSearchDiseases } from "./useSearchDiseases";
export const useManagerForm = () => {
  //Gọi hook tính tuổi
  const { dob, ageDisplay, ageMonth, handleDobChange } = useCalculateAge();
  // Gọi hook lấy device
  const { selectedDeviceId, handleSelectedChange, allDevices, readyDevices } =
    useFetchAirmac();

    const {handleSearchDiseases, handleSelectionChange, selectedDisease} = useSearchDiseases();

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    hr: "",
    spo2: "",
    bp_sys: "",
    rr: "",
    tem: "",
  });

  const [patientQueue, setPatientQueue] = useState([]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const icdCodeArray =  selectedDisease.map((item) => item.icd_code);
    const payload = {
      fullName: formData.fullName,
      dob: dob,
      age: ageMonth,
      gender: formData.gender,
      hr: parseInt(formData.hr),
      spo2: parseInt(formData.spo2),
      bp_sys: parseInt(formData.bp_sys),
      rr: parseInt(formData.rr),
      tem: parseFloat(formData.tem),
      icdMapping: icdCodeArray,
      selectedDevice: selectedDeviceId,
    };

    console.log("Dữ liệu gửi đi:", payload);

    try {
      const result = await managerFormApi.addForm(payload);
      console.log("Server trả về:", result);
      if(result.success){
        const serverData = result.data;
        setPatientQueue((prev) => [serverData, ...prev]);
      }
    } catch (err) {
      console.log("Error submit: ", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return {
    formData,
    dob,
    ageDisplay,
    allDevices,
    selectedDeviceId,
    patientQueue,
    handleSelectedChange,
    readyDevices,
    handleDobChange,
    handleSubmitForm,
    handleInputChange,
    handleSelectionChange,
    handleSearchDiseases,
  };
};
