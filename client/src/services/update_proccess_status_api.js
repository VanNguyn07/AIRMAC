const API_URL = import.meta.env.VITE_API_URL;
// Khai báo Header dùng chung
const HEADERS = {
  "Content-Type": "application/json",
};

export const updateProcessStatusApi = {
  setProcessStatus: async (patientId, process_status) => {
    try {
      const response = await fetch(
        `${API_URL}/updateProcessStatus/${encodeURIComponent(patientId)}`,
        {
          method: "PUT",
          headers: HEADERS,
          body: JSON.stringify({process_status}),
        },
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Error:", errorText);
        throw new Error("Lỗi khi gọi API set process status");
      }
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("API update process status error", err);
      return { success: false, message: err.message };
    }
  },
};
