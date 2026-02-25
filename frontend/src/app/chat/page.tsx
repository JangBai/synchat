"use client";

import { useState } from "react";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";

export default function RoomPage() {
  const [messages, setMessages] = useState<string[]>([
    "안녕하세요 👋",
    "Synchat 테스트 메시지입니다.",
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input]);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col">
      <MessageList messages={messages} />
      <MessageInput input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
}
