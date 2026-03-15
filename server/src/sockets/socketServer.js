//import module http cho sockets
const http = require("http");
//import sockets.io
const { Server } = require("socket.io");
//import app express
const app = require("../../app");

const server = http.createServer(app); // tạo http server

const io = new Server(server, {
  // thiết lập socket server
  cors: {
    origin: ["http://localhost:5173", "https://airmac-prod.vercel.app"],
    methods: ["GET", "POST"],
  },
});

let testTick = 0; // Biến đếm nhịp test

const generateSesorData = () => {
  testTick++;
  let testValue;

  if (testTick <= 20) {
    testValue = 0.5;
  } else {
    testValue = 0.2;
  }

  console.log(`[Test Nhịp ${testTick}] Bơm giá trị: ${testValue}`);

  return {
    value: testValue,
    time: new Date().toISOString(),
  };
};

let thresholdValue = 999;
let thresholdPoints = [];
let isVenting = false; // Cờ đánh dấu hệ thống phần cứng đang xả khí (tạm dừng)
// Lưu lại thông tin báo động cuối cùng để gửi cho người vào sau
let lastAlertData = null;

//mở socket server (io) lắng nghe client kết nối
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  if (isVenting && lastAlertData) {
    console.log(`Báo cáo tình trạng xả khí cho user mới: ${socket.id}`);
    socket.emit("server:alert", lastAlertData);
  }

  //Lắng nghe Frontend gửi ngưỡng lên và cập nhật biến toàn cục
  socket.on("client:setThreshold", (frontendThreshold) => {
    thresholdValue = Number(frontendThreshold);
  });

  socket.on("client:resumeSystem", () => {
    isVenting = false;
    testTick = 0;
    thresholdPoints = [];
    lastAlertData = null; // Xóa lịch sử báo động
  });
  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

const checkAlert = (currentData) => {
  if (currentData.value > thresholdValue) {
    thresholdPoints.push(currentData); // currentData là một Object
    if (thresholdPoints.length >= 6) {
      const lastPoint = currentData;

      io.emit("server:alert", {
        timeHappened: lastPoint.time, // Thời gian cuối
        historyThresholdPoints: thresholdPoints, // 6 điểm vi phạm
      });

      isVenting = true; //Bật cờ xả khí
      thresholdPoints = [];
    }
  } else {
    thresholdPoints = [];
  }
};

// bắn data lên client mỗi 1 giây
setInterval(() => {
  if (!isVenting) {
    const data = generateSesorData();
    //send for all client
    io.emit("server:sendData", data);
    console.log("Send data is: ", data);
    checkAlert(data);
  }
}, 1000);

module.exports = server;
