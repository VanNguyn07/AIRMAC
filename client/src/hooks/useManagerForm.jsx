import React, { useState } from "react";
import { managerFormApi } from "../services/manager_form_api";
import { useCalculateAge } from "./useCalculateAge";
import { useFetchAirmac } from "./useFetchAirmac";
import { useSearchDiseases } from "./useSearchDiseases";
export const useManagerForm = (onSuccess) => {
  //Gọi hook tính tuổi
  const { dob, ageDisplay, ageMonth, handleDobChange, setDob } =
    useCalculateAge();
  // Gọi hook lấy device
  const {
    selectedDeviceId,
    handleSelectedChange,
    allDevices,
    readyDevices,
    setSelectedDeviceId,
  } = useFetchAirmac();

  const {
    handleSearchDiseases,
    handleSelectionChange,
    selectedDisease,
    setSelectedDisease,
  } = useSearchDiseases();

  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    hr: "",
    spo2: "",
    bp_sys: "",
    rr: "",
    tem: "",
    status: "",
    level: 0,
    color: "",
    threshold: 0,
  });

  const handleFillFormData = (dataItem) => {
    if (!dataItem) return;
    setFormData({
      fullName: dataItem.full_name || "",
      age: dataItem.age || "",
      gender: dataItem.gender || "",
      hr: dataItem.hr || "",
      spo2: dataItem.spo2 || "",
      bp_sys: dataItem.bp_sys || "",
      rr: dataItem.rr || "",
      tem: dataItem.tem || "",
      status: dataItem.final_status || "",
      level: dataItem.risk_level || 0,
      color: dataItem.color || "",
      threshold: dataItem.threshold_value || 0,
    });

    if (dataItem.dob && setDob) {
      let formattedDob = "";

      // Kiểm tra xem dữ liệu trả về là chuỗi hay là đối tượng Date
      if (typeof dataItem.dob === "string") {
        // Nếu là chuỗi "2006-07-31T00:00:00..." -> Cắt lấy phần trước chữ T
        formattedDob = dataItem.dob.split("T")[0];
      } else {
        // Trường hợp hiếm: Nó đã là chuỗi chuẩn "2006-07-31" thì giữ nguyên
        formattedDob = dataItem.dob;
      }
      console.log("DOB sau khi format:", formattedDob); // Nên log ra để kiểm tra
      setDob(formattedDob);
    }

    if (dataItem.device_id && setSelectedDeviceId) {
      setSelectedDeviceId(dataItem.device_id);
    } else if (dataItem.room_id && allDevices) {
      // Nếu chỉ có room_id, tìm ID tương ứng
      const foundDevice = allDevices.find(
        (d) => d.room_id === dataItem.room_id
      );
      if (foundDevice) setSelectedDeviceId(foundDevice.id);
    }

    if (dataItem.selected_icd_codes && setSelectedDisease) {
      setSelectedDisease(dataItem.selected_icd_codes);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const icdCodeArray = selectedDisease.map((item) => ({
      icd_code: item.icd_code,
      disease_name: item.disease_name,
    }));
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
      if (result.success) {
        const serverData = result.data;
        console.log("data add form is: ", serverData);
        if (onSuccess) onSuccess(); // gọi callback
        setFormData({
          fullName: "",
          gender: "",
          hr: "",
          spo2: "",
          bp_sys: "",
          rr: "",
          tem: "",
        });
        setDob("");
        setSelectedDeviceId("");
        setSelectedDisease([]);
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
    selectedDisease,
    handleSelectedChange,
    readyDevices,
    handleDobChange,
    handleSubmitForm,
    handleInputChange,
    handleSelectionChange,
    handleSearchDiseases,
    handleFillFormData,
  };
};
