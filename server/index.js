// khởi chạy hệ thống
require("dotenv").config(); // Load biến môi trường
const database = require("./src/config/database");
const seed_data = require("./src/config/seed_data");
const app = require("./app");

console.log("Kiểm tra biến app:", app);
const PORT = process.env.PORT || 3001;
console.log(PORT);

const startServer = async () => {
  try {
    //Kết nối Database 
    await database.connect();
    console.log("✅ Database connected successfully");
    //chạy nạp dữ liệu (Seeding)
    await seed_data();
    //mở cổng lắng nghe
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // Tắt chương trình nếu lỗi
  }
};
startServer();