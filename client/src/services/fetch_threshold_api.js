const API_URL = import.meta.env.VITE_API_URL;
// Khai báo Header dùng chung
const HEADERS = {
  "Content-Type": "application/json",
};

export const fetchThresholdApi = {
    getValueThreshold: async (threshold) => {
        try {
            const response = await fetch(`${API_URL}/level/threshold?threshold=${encodeURIComponent(threshold)}`,{
                method: "GET",
                headers: HEADERS
            })
            if(!response.ok){
                  throw new Error("Lỗi khi gọi API get value threshold");
            }
            return response.json();
        }catch (err) {
            console.error("API threshold error", err);
            return [];
        }
    }
}