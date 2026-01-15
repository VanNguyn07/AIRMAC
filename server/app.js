// Khai báo, cài đặt phần mềm trung gian (Middleware) không thực hiện lệnh mở cổng (listen)
// nó quyết định request của FE đi đâu, làm gì 
const express = require("express");
const cors = require("cors");
const app = express();

// --- IMPORT ROUTES ---
const icdSearchRoutes = require("./src/routes/icdSearchRoutes");
const airmacRoutes = require("./src/routes/airmacRoutes");
const managerFormRoutes = require("./src/routes/managerFormRoutes")

//Middleware
app.use(cors());
app.use(express.json());// <--- Dòng này giúp Node.js "mở hộp" để lấy đồ ra

// --- ĐĂNG KÝ ROUTES ---   
app.use('/api/icd', icdSearchRoutes);
app.use('/api/airmac', airmacRoutes)
app.use('/api/addForm', managerFormRoutes)

// Route test
app.get("/", (req, res) => {
    res.json({message: "Hello from backend!"});
});

// Xuất app ra để file khác dùng
module.exports = app;