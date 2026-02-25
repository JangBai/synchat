import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("connected:", socket.id);

  socket.on("message", (data) => {
    console.log("received:", data);

    // 전체 브로드캐스트
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server running on port 4000");
});