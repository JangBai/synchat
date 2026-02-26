import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { User, Message } from "@/types";

export type ChatMessage = Message;

export function useChatRoom(socket: Socket | null, roomId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!roomId || !socket) return;

    const handlePrevious = (msgs: ChatMessage[]) => {
      console.log("📨 received previous-messages:", msgs.length);
      setMessages(msgs);
    };

    const handleReceive = (message: ChatMessage) => {
      console.log("📨 received new message:", message);
      setMessages((prev) => [...prev, message]);
    };

    // 리스너 먼저 등록
    socket.on("previous-messages", handlePrevious);
    socket.on("receive-message", handleReceive);

    // socket이 연결되어 있으면 즉시 방 입장, 아니면 연결 후 입장
    if (socket.connected) {
      console.log("🔌 socket already connected, joining room:", roomId);
      socket.emit("join-room", roomId);
    } else {
      console.log("⏳ waiting for socket connection...");
      const handleConnect = () => {
        console.log("🔌 socket connected, joining room:", roomId);
        socket.emit("join-room", roomId);
      };

      socket.on("connect", handleConnect);

      return () => {
        socket.off("previous-messages", handlePrevious);
        socket.off("receive-message", handleReceive);
        socket.off("connect", handleConnect);
      };
    }

    return () => {
      console.log("🚪 CLIENT leaving room:", roomId);
      console.log("🔌 socket state:", socket?.id, socket?.connected);

      if (socket) {
        console.log("📤 CLIENT emitting leave-room to server");
        socket.emit("leave-room", roomId);
      } else {
        console.warn("⚠️ socket is null");
      }

      socket?.off("previous-messages", handlePrevious);
      socket?.off("receive-message", handleReceive);
    };
  }, [roomId, socket]);

  const sendMessage = (message: string) => {
    socket?.emit("send-message", {
      roomId,
      message,
    });
  };

  return {
    messages,
    sendMessage,
  };
}
