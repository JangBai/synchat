"use client";

import { useState, useEffect } from "react";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import { useParams } from "next/navigation";
import { useChatRoom } from "@/hooks/useChatRoom";
import { getSocket } from "@/lib/socket";

export default function RoomPage() {
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<ReturnType<typeof getSocket> | null>(
    null
  );

  useEffect(() => {
    // 클라이언트에서만 socket 생성
    const socketInstance = getSocket();
    setSocket(socketInstance);
  }, []);

  const { messages, sendMessage } = useChatRoom(socket, roomId as string);

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
