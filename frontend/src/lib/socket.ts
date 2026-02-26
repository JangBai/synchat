import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (typeof window === "undefined") return null;

  if (!socket) {
    const savedUser = localStorage.getItem("chat-user");

    if (!savedUser) return null;

    const user = JSON.parse(savedUser);

    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      transports: ["websocket"],
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
  }

  return socket;
};

export const resetSocket = () => {
  if (socket) {
    socket.removeAllListeners(); // 이벤트 정리
    socket.disconnect(); // 연결 종료
    socket = null; // 인스턴스 초기화
  }
};
