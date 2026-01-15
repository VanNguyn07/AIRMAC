const API_URL = import.meta.env.VITE_API_URL;
// Khai báo Header dùng chung
const HEADERS = {
  "Content-Type": "application/json",
};

export const icdMappingApi = {
  searchByKeyWord: async (keyword) => {
    try {
      // Mặc định fetch là GET, nên không cần ghi method: 'GET'
      const response = await fetch(
        `${API_URL}/icd/search?keyword=${encodeURIComponent(keyword)}`,
        {
          method: "GET",
          headers: HEADERS,
        }
      );
      // Kiểm tra xem Server có trả về thành công không
      if (!response.ok) {
        throw new Error("Lỗi khi gọi API tìm kiếm");
      }
      // đọc json từ controller gửi đến và trả về cho hook
      return response.json();
    } catch (err) {
      console.error("API Error:", err);
      return []; // Trả về mảng rỗng để giao diện không bị trắng xóa
    }
  },
};
