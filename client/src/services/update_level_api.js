const API_URL = import.meta.env.VITE_API_URL;
// Khai báo Header dùng chung
const HEADERS = {
  "Content-Type": "application/json",
};

export const updateLevelApi = {
  setLevel: async (patientId, payload) => {
    try {
      const response = await fetch(
        `${API_URL}/updateLevel/${encodeURIComponent(patientId)}`,
        {
          method: "PUT",
          body: JSON.stringify(payload),
          headers: HEADERS,
        },
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        throw new Error("Lỗi khi gọi API set value level");
      }
    } catch (err) {
      console.error("API level error", err);
    }
  },
};
