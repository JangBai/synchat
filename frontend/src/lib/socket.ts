import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  // 이미 생성된 socket이 있으면 반환
  if (socket) {
    return socket;
  }

  // 클라이언트 환경인지 확인
  if (typeof window === "undefined") {
    throw new Error("Socket can only be initialized in the browser");
  }

  const savedUser = localStorage.getItem("chat-user");

  if (!savedUser) {
    throw new Error("User not found");
  }

  const user = JSON.parse(savedUser);

  socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
    transports: ["websocket"],
    reconnection: true,
    auth: {
      user,
    },
  });

  socket.on("connect", () => {
    console.log("🟢 socket connected:", socket?.id);
  });

  socket.on("disconnect", () => {
    console.log("🔴 socket disconnected");
  });

  socket.on("connect_error", (error) => {
    console.error("🔴 socket connection error:", error);
  });

  return socket;
};

export const resetSocket = () => {
  if (socket) {
    socket.removeAllListeners();
    socket.disconnect();
    socket = null;
  }
};
