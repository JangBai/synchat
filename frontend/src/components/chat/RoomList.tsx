"use client";

import Link from "next/link";
import { getSocket } from "@/lib/socket";
import { useEffect, useState } from "react";

export default function RoomList() {
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const socket = getSocket();

    const handleRoomCreated = (room: { id: string; name: string }) => {
      setRooms((prev) => [...prev, room]);
    };

    socket.on("room-created", handleRoomCreated);

    return () => {
      socket.off("room-created", handleRoomCreated);
    };
  }, []);

  const handleCreateRoom = () => {
    const roomName = prompt("채팅방 이름을 입력해주세요.");
    if (!roomName) return;

    const socket = getSocket();
    socket.emit("create-room", roomName);
  };

  console.log("rooms:", rooms);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-3 py-3">
        <div className="font-semibold">채팅방</div>
        <button
          onClick={handleCreateRoom}
          className="cursor-pointer rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-500 transition duration-300 hover:bg-gray-100"
        >
          만들기
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {rooms.map((room) => (
          <Link
            key={room.id}
            href={`/chat/${room.id}`}
            className="block px-4 py-3 hover:bg-gray-100"
          >
            {room.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
