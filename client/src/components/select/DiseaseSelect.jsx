import React from "react";
import AsyncSelect from "react-select/async";
export const DiseaseSelect = ({ onChange, value, loadOptions, name }) => {
  const inputBaseStyle =
    "!rounded-lg !border !border-gray-500 !transition !min-h-[40px]";

  return (
    <AsyncSelect
      isMulti //Cho phép chọn nhiều
      cacheOptions // Lưu cache kết quả tìm kiếm
      defaultOptions // Tải danh sách mặc định khi click vào
      loadOptions={loadOptions} // Hàm gọi API từ Hook
      // Xử lý dữ liệu
      onChange={onChange}
      value={value}
      //  Định nghĩa hiển thị
      getOptionLabel={(option) => `${option.icd_code} - ${option.disease_name}`}
      getOptionValue={(option) => option.icd_code}
      // Placeholder
      placeholder="Enter ICD code or disease name (Ex: K56)..."
      loadingMessage={() => "Searching..."}
      noOptionsMessage={() => "No matching disease found."}
      name={name}
      classNames={{
        control: (state) =>
          `
  ${inputBaseStyle}
  ${state.isFocused ? "!ring-2 !ring-primary-hover !border-primary-hover" : ""}
  `,
        input: () => "!text-md",
        option: () => "!text-md",
      }}
    />
  );
};
