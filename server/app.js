// Khai báo, cài đặt phần mềm trung gian (Middleware) không thực hiện lệnh mở cổng (listen)
const express = require("express");
const cors = require("cors");
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// Route test
app.get("/", (req, res) => {
    res.json({message: "Hello from backend!"});
});

// Xuất app ra để file khác dùng
module.exports = app;