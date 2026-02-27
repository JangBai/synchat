import { Server } from "socket.io";
import { registerSocketHandlers } from "./handlers.js";

export function createSocketServer(server: any) {
  const io = new Server(server, {
    cors: { origin: "http://localhost:3000" },
  });

  io.on("connection", (socket) => {
    registerSocketHandlers(io, socket);
  });
}
