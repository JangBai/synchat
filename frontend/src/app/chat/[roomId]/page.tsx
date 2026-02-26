"use client";

import { useState } from "react";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import { useParams } from "next/navigation";
import { useChatRoom } from "@/hooks/useChatRoom";

export default function RoomPage() {
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChatRoom(roomId as string);

  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col">
      <MessageList messages={messages} />
      <MessageInput input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
}
