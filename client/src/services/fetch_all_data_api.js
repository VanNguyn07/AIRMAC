const API_URL = import.meta.env.VITE_API_URL;
// Khai báo Header dùng chung
const HEADERS = {
  "Content-Type": "application/json",
};
export const fetchAllDataApi = {
    getAllData: async () => {
        try {
            const response = await fetch(`${API_URL}/fetchAllData`, {
                method: "GET",
                headers: HEADERS,
            });
            if(!response.ok) {
                throw new Error("Lỗi khi gọi API tải all data");
            }
            return response.json();
        }catch (err){
            console.log("API error", err)
            return [];
        }
    }
}