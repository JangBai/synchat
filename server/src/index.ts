import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { loadChatData, saveChatData } from "./storage";

let { rooms, messages } = loadChatData();

dotenv.config();

const PORT = process.env.PORT || 4000;
console.log("PORT:", PORT);
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // -------------------------연결--------------------------------
  console.log("🔌 connected:", socket.id);

  // -------------------------방 목록 전송--------------------------------
  socket.emit("room-list", rooms);

  // -------------------------방 생성--------------------------------
  socket.on("create-room", (roomName) => {
    const roomId = uuidv4();

    const room = { id: roomId, name: roomName };

    rooms.push(room);
    messages[roomId] = [];

    saveChatData({ rooms, messages });

    // 새로운 방 생성 알림 + 전체 목록 재전송
    io.emit("room-created", room);
    io.emit("room-list", rooms);
  });

  // -------------------------방 입장--------------------------------
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    // 기존 메시지 전송
    socket.emit("previous-messages", messages[roomId] || []);
  });

  // -------------------------메세지 전송--------------------------------
  socket.on("send-message", ({ roomId, message, sender }) => {
    const newMessage = {
      id: uuidv4(),
      text: message,
      sender,
      createdAt: Date.now(),
    };

    if (!messages[roomId]) {
      messages[roomId] = [];
    }

    messages[roomId].push(newMessage);

    saveChatData({ rooms, messages });

    io.to(roomId).emit("receive-message", newMessage);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
