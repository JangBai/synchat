"use client";

import Link from "next/link";

const rooms = [
  { id: "1", name: "General" },
  { id: "2", name: "Frontend" },
  { id: "3", name: "Random" },
];

export default function RoomList() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b px-4 py-4 font-semibold">채팅방</div>

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
