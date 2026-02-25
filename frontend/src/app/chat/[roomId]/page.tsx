"use client";

import { useState } from "react";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import { getSocket } from "@/lib/socket";
import { useEffect } from "react";
import { useParams } from "next/navigation";

const socket = getSocket();

export default function RoomPage() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("join-room", roomId);
  }, [roomId]);

  const handleSend = () => {
    if (!input.trim()) return;

    socket.emit("send-message", {
      roomId,
      message: input,
    });

    setInput("");
  };

  useEffect(() => {
    const socket = getSocket();

    socket.on("receive-message", (message: string) => {
      console.log("📩 message:", message);
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  return (
    <div className="flex h-full flex-col">
      <MessageList messages={messages} />
      <MessageInput input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
}
