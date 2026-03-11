const API_URL = import.meta.env.VITE_API_URL;
// Khai báo Header dùng chung
const HEADERS = {
  "Content-Type": "application/json",
};
export const handleDoneSession = {
  setStatusDone: async (patientId, process_status) => {
    try {
      const response = await fetch(
        `${API_URL}/setStatusDone/${encodeURIComponent(patientId)}`,
        {
          method: "PUT",
          headers: HEADERS,
          body: JSON.stringify({ process_status }),
        },
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server Erroro: ", errorText);
        throw new Error("Lỗi khi gọi API set status done");
      }
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("API set status done error: ", err);
      return { success: false, message: err.message };
    }
  },
};
