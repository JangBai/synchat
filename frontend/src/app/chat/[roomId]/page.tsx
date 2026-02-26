"use client";

import { useState } from "react";
import MessageList from "@/components/chat/MessageList";
import MessageInput from "@/components/chat/MessageInput";
import TypingIndicator from "@/components/chat/TypingIndicator";
import RoomHeader from "@/components/chat/RoomHeader";
import { useParams } from "next/navigation";
import { useChatRoom } from "@/hooks/useChatRoom";
import { useTypingIndicator } from "@/hooks/useTypingIndicator";
import { useRooms } from "@/hooks/useRooms";
import { useSocket } from "@/contexts/SocketContext";

export default function RoomPage() {
  const { roomId } = useParams();
  const [input, setInput] = useState("");
  const socket = useSocket();

  const { rooms } = useRooms();
  const currentRoom = rooms.find((room) => room.id === roomId);

  const { messages, sendMessage } = useChatRoom(socket, roomId as string);

  // 타이핑 인디케이터
  useTypingIndicator(socket, roomId as string, input);

  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex h-full flex-col">
      <RoomHeader
        socket={socket}
        roomId={roomId as string}
        roomName={currentRoom?.name || "채팅방"}
      />
      <MessageList messages={messages} socket={socket} />
      <TypingIndicator socket={socket} />
      <MessageInput input={input} setInput={setInput} onSend={handleSend} />
    </div>
  );
}
