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
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const generateSesorData = () => {
  const randomValue = ((Math.random() * 7) / 10).toFixed();
  console.log("Random value is: ", randomValue);
  return {
    value: randomValue,
    timestamp: new Date().toISOString(),
  };
};

//mở socket server (io) lắng nghe client kết nối
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// bắn data lên client mỗi 1 giây
setInterval(() => {
    const data = generateSesorData();
    //send for all client
    io.emit("server:sendData", data);
    
    console.log("Sent data: ", data);
}, 1000);

module.exports = server;
