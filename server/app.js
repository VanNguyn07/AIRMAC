// Khai báo, cài đặt phần mềm trung gian (Middleware) không thực hiện lệnh mở cổng (listen)
// nó quyết định request của FE đi đâu, làm gì
const express = require("express");
const cors = require("cors");
const app = express();

// --- IMPORT ROUTES ---
const icdSearchRoutes = require("./src/routes/icdSearchRoutes");
const airmacRoutes = require("./src/routes/airmacRoutes");
const managerFormRoutes = require("./src/routes/managerFormRoutes");
const fetchDataRoutes = require("./src/routes/fetchDataRoutes");
const fetchThresholdRoutes = require("./src/routes/fetchThresholdRoutes");
const updateLevelRoutes = require("./src/routes/updateLevelRoutes");

//Middleware
app.use(cors());
app.use(express.json()); // <--- Dòng này giúp Node.js "mở hộp" để lấy đồ ra

// --- ĐĂNG KÝ ROUTES ---
app.use("/api/icd", icdSearchRoutes);
app.use("/api/airmac", airmacRoutes);
app.use("/api/addForm", managerFormRoutes);
app.use("/api/updatePatient", managerFormRoutes);
app.use("/api/fetchAllData", fetchDataRoutes);
app.use("/api/level", fetchThresholdRoutes);
app.use("/api/updateLevel", updateLevelRoutes);

// Route test
app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// Xuất app ra để file khác dùng
module.exports = app;
