import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

const socket = getSocket();

export type ChatMessage = {
  id: string;
  text: string;
  createdAt: number;
  sender?: string; // 나중에 추가할 거
};

export function useChatRoom(roomId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!roomId) return;

    socket.emit("join-room", roomId);
    setMessages([]);
  }, [roomId]);

  useEffect(() => {
    const handlePrevious = (msgs: ChatMessage[]) => {
      setMessages(msgs);
    };

    const handleReceive = (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("previous-messages", handlePrevious);
    socket.on("receive-message", handleReceive);

    return () => {
      socket.off("previous-messages", handlePrevious);
      socket.off("receive-message", handleReceive);
    };
  }, []);

  const sendMessage = (message: string, sender: string) => {
    socket.emit("send-message", {
      roomId,
      message,
      sender: "me",
    });
  };

  return {
    messages,
    sendMessage,
  };
}
