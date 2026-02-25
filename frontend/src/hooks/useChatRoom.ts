import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

const socket = getSocket();

export function useChatRoom(roomId: string) {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);
    setMessages([]); // 방 바뀌면 초기화
  }, [roomId]);

  useEffect(() => {
    const handleReceive = (message: string) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receive-message", handleReceive);

    return () => {
      socket.off("receive-message", handleReceive);
    };
  }, []);

  const sendMessage = (message: string) => {
    socket.emit("send-message", { roomId, message });
  };

  return {
    messages,
    sendMessage,
  };
}
