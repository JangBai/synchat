import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ["websocket"],
      autoConnect: true,
    });

    socket.on("connect", () => {
      console.log("🟢 socket connected:", socket?.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 socket disconnected");
    });
  }

  return socket;
};
