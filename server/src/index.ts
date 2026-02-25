import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";

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
  console.log("🔌 connected:", socket.id);

  socket.on("create-room", (roomName) => {
    console.log("🔥 create-room 받음:", roomName);

    const roomId = Date.now().toString();

    const room = {
      id: roomId,
      name: roomName,
    };

    console.log("📢 room-created emit:", room);

    io.emit("room-created", room);
  });

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
  });

  socket.on("send-message", ({ roomId, message }) => {
    io.to(roomId).emit("receive-message", message);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
