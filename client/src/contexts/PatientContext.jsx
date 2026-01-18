// src/contexts/PatientContext.jsx
import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { fetchAllDataApi } from "../services/fetch_all_data_api";

// 1. Tạo Context
const PatientContext = createContext();

// 2. Tạo Provider (Cái kho chứa)
export const PatientProvider = ({ children }) => {
  const [dataList, setDataList] = useState([]);

  // Hàm fetch dữ liệu (giống hệt code cũ của bạn)
  const fetchAllData = useCallback(async () => {
    try {
      const result = await fetchAllDataApi.getAllData();
      const finalData = Array.isArray(result) ? result : result.data || [];
      setDataList(finalData);
    } catch (error) {
      console.log("Lỗi fetch data:", error);
    }
  }, []);

  // Tự động gọi khi app khởi động
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);


  const handleUpdateListGlobal = (updatedInfo) => {
    setDataList((prev) =>
      prev.map((item) => {
        // Lưu ý: dùng đúng patient_id
        if (item.patient_id === updatedInfo.patient_id) {
          return {
            ...item,
            risk_level: updatedInfo.risk_level,
            final_status: updatedInfo.final_status,
            color_code: updatedInfo.color_code, // Cập nhật màu
            threshold_value: updatedInfo.threshold_value
          };
        }
        return item;
      })
    );
  };

  const handleAddListGlobal = (newPatient) => {
    setDataList((prev) => [newPatient, ...prev])
  }

  // Những gì bạn muốn chia sẻ cho toàn bộ App thì bỏ vào value
  const value = {
    dataList,
    setDataList,
    refetch: fetchAllData,
    handleUpdateListGlobal,
    handleAddListGlobal
  };

  return (
    <PatientContext.Provider value={value}>
      {children}
    </PatientContext.Provider>
  );
};

// 3. Hook để các trang con lấy dữ liệu dễ dàng
export const usePatientContext = () => {
  return useContext(PatientContext);
};