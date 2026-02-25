"use client";

import Link from "next/link";
import { getSocket } from "@/lib/socket";
import { useEffect, useState } from "react";

const socket = getSocket();

export default function RoomList() {
  const [rooms, setRooms] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    socket.on("room-list", (serverRooms) => {
      setRooms(serverRooms);
    });

    socket.on("room-created", (room) => {
      setRooms((prev) => [...prev, room]);
    });

    return () => {
      socket.off("room-list");
      socket.off("room-created");
    };
  }, []);

  const handleCreateRoom = () => {
    const roomName = prompt("채팅방 이름을 입력해주세요.");
    if (!roomName) return;

    socket.emit("create-room", roomName);
  };

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
