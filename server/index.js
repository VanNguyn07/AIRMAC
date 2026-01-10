// khởi chạy hệ thống
require("dotenv").config();
// const http = require("http");
// Nhập app từ file app.js

const app = require("./app");
console.log("Kiểm tra biến app:", app);
const PORT = process.env.PORT || 3001;
console.log(PORT);
//Tạo Server vật lý
// const server = http.createServer(app);

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});