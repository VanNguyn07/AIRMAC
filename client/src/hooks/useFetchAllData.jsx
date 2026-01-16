import { useState, useEffect, useCallback } from "react"; // Nhớ import useCallback
import { fetchAllDataApi } from "../services/fetch_all_data_api";

export const useFetchAllData = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false); // Thêm loading cho chuyên nghiệp

  // 1. Dùng useCallback để "đóng gói" hàm này, giúp nó không bị tạo mới mỗi lần render
  const handleFetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchAllDataApi.getAllData();
      console.log("Fetch all data: ", result);
      
      // Kiểm tra kỹ dữ liệu trả về là mảng hay object { data: [] }
      const finalData = Array.isArray(result) ? result : (result.data || []);
      
      setDataList(finalData);
    } catch (error) {
      console.log("Lỗi fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, []); // [] nghĩa là hàm này không phụ thuộc biến nào bên ngoài, chỉ tạo 1 lần

  // 2. useEffect gọi hàm đã được đóng gói
  useEffect(() => {
    handleFetchAllData();
  }, [handleFetchAllData]); // Thêm handleFetchAllData vào dependency

  return { 
    dataList, 
    loading, 
    refetch: handleFetchAllData 
  };
};