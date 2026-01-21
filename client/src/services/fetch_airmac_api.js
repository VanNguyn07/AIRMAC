const API_URL = import.meta.env.VITE_API_URL;
console.log("API URL đang dùng:", import.meta.env.VITE_API_URL);
// Khai báo Header dùng chung
const HEADERS = {
  "Content-Type": "application/json",
};
export const fetchAirmacApi = {
  getDeviceIdRoomId: async () => {
    try {
      const response = await fetch(`${API_URL}/airmac`, {
        method: "GET",
        headers: HEADERS,
      });
      if (!response.ok) {
        throw new Error("Lỗi khi gọi API tải airmac");
      }
      return response.json();
    } catch (err) {
      console.error("API Error:", err);
      return [];
    }
  },
};
