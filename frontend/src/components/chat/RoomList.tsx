"use client";

import Link from "next/link";
import { useRooms } from "@/hooks/useRooms";
import { useState } from "react";
import Modal from "@/components/modal/Modal";

export default function RoomList() {
  const { rooms, createRoom, isLoaded } = useRooms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = () => {
    if (!roomName.trim()) return;

    if (!isLoaded) {
      return <div>Loading...</div>;
    }

    createRoom(roomName);
    console.log("생성된 방 이름:", roomName);
    setIsModalOpen(false);
    setRoomName("");
  };

  console.log("rooms:", rooms);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-3 py-3">
        <div className="font-semibold">채팅방</div>
        <button
          onClick={() => setIsModalOpen(true)}
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreateRoom}
      >
        <div className="flex flex-col gap-3">
          <span className="text-lg font-semibold">채팅방 생성</span>
          <input
            type="text"
            placeholder="채팅방 이름을 입력해주세요"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="rounded-lg border px-3 py-2"
          />
        </div>
      </Modal>
    </div>
  );
}
