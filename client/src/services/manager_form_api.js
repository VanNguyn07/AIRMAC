const API_URL = import.meta.env.VITE_API_URL;
// Khai báo Header dùng chung
const HEADERS = {
  "Content-Type": "application/json",
};

export const managerFormApi = {
  addForm: async (formData) => {
    try {
      // gửi request đến BE
      const response = await fetch(`${API_URL}/addForm`, {
        method: "POST",
        headers: HEADERS,
        // biến formData thành chuổi JSON
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Lỗi khi gọi API add form");
      }
      // trả về hook
      return response.json();
    } catch (err) {
      console.error("API Error:", err);
    }
  },

  updateForm: async (patientId, payload) => {
    try {
      const response = await fetch(
        `${API_URL}/updatePatient/${encodeURIComponent(patientId)}`,
        {
          method: "PUT",
          headers: HEADERS,
          body: JSON.stringify(payload),
        },
      );
      if (!response.ok) {
        const errorText = response.text();
        console.error("Server error", errorText);
        throw new Error("Error when call API update form");
      }
    } catch (err) {
      console.error("Error API Update", err);
    }
  },
};
