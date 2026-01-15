import { useCallback, useState } from "react";
import { icdMappingApi } from "../services/icd_mapping_api";
export const useSearchDiseases = () => {
  const [selectedDisease, setSelectedDisease] = useState([]);

  // Hàm này sẽ được đưa trực tiếp vào prop 'loadOptions' của React Select
  // Dùng useCallback để hàm này không bị tạo mới mỗi lần render
  const handleSearchDiseases = useCallback(async (keyword) => {
    if (!keyword || keyword.length < 2) {
      return [];
    }
    try {
      // Gọi service get API
      const result = await icdMappingApi.searchByKeyWord(keyword);
      console.log("Tìm thấy:", result.length, "kết quả");
      return result; // Trả về mảng dữ liệu
    } catch (err) {
      console.log("Search failed!", err);
      return [];
    }
  }, []);
  // Hàm xử lý khi bác sĩ chọn/bỏ chọn bệnh trên giao diện
  const handleSelectionChange = (newSelection) => {
    setSelectedDisease(newSelection || []);
  };

  return {
    selectedDisease,
    handleSelectionChange,
    handleSearchDiseases,
  };
};
