"use client";

import Link from "next/link";
import { useRooms } from "@/hooks/useRooms";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Modal from "@/components/modal/Modal";
import { useSocket } from "@/contexts/SocketContext";

export default function RoomList() {
  const { rooms, createRoom, isLoaded } = useRooms();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomUserCounts, setRoomUserCounts] = useState<Record<string, number>>(
    {}
  );
  const pathname = usePathname();
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      console.log("⚠️ RoomList: socket is null");
      return;
    }

    console.log("🎧 RoomList using socket:", socket.id);

    const handleRoomUsersUpdated = (data: {
      roomId: string;
      count: number;
    }) => {
      console.log("📊 RoomList received room-users-updated:", data);
      setRoomUserCounts((prev) => ({
        ...prev,
        [data.roomId]: data.count,
      }));
    };

    const handleRoomCounts = (counts: Record<string, number>) => {
      console.log("📊 RoomList received initial room-counts:", counts);
      setRoomUserCounts(counts);
    };

    socket.on("room-users-updated", handleRoomUsersUpdated);
    socket.on("room-counts", handleRoomCounts);

    if (socket.connected) {
      socket.emit("get-room-counts");
    } else {
      socket.once("connect", () => {
        socket.emit("get-room-counts");
      });
    }

    return () => {
      socket.off("room-users-updated", handleRoomUsersUpdated);
      socket.off("room-counts", handleRoomCounts);
    };
  }, [socket]);

  const handleCreateRoom = () => {
    if (!roomName.trim()) return;

    createRoom(roomName);
    console.log("생성된 방 이름:", roomName);
    setIsModalOpen(false);
    setRoomName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCreateRoom();
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between border-b px-5 py-5 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-lg">
            <svg
              className="text-primary h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <div className="text-lg font-bold text-gray-900 dark:text-white">
            채팅방
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary-dark cursor-pointer rounded-xl p-2.5 text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
          aria-label="채팅방 만들기"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        {rooms.length === 0 ? (
          <div className="flex h-full items-center justify-center px-4 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full bg-gray-100 p-4 dark:bg-gray-700">
                <svg
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                아직 채팅방이 없습니다.
                <br />새 방을 만들어보세요!
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {rooms.map((room) => {
              const isActive = pathname === `/chat/${room.id}`;
              const userCount = roomUserCounts[room.id] || 0;
              return (
                <Link
                  key={room.id}
                  href={`/chat/${room.id}`}
                  className={`group relative overflow-hidden rounded-xl border-2 px-4 py-3.5 transition ${
                    isActive
                      ? "border-primary bg-primary/5 dark:bg-primary/10 shadow-md"
                      : "border-transparent bg-gray-50 hover:border-gray-200 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:border-gray-600 dark:hover:bg-gray-700"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div
                        className={`font-semibold ${
                          isActive
                            ? "text-primary dark:text-primary-light"
                            : "text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {room.name}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs">
                        {userCount > 0 && (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                            <span className="font-medium">
                              {userCount}명 참여 중
                            </span>
                          </div>
                        )}
                        <span className="text-gray-500 dark:text-gray-400">
                          {new Date(room.createdAt).toLocaleDateString(
                            "ko-KR",
                            {
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    </div>
                    <svg
                      className={`h-5 w-5 transition ${
                        isActive
                          ? "text-primary opacity-100"
                          : "text-gray-400 opacity-0 group-hover:opacity-100"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  {isActive && (
                    <div className="bg-primary/20 absolute inset-x-0 bottom-0 h-0.5" />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleCreateRoom}
      >
        <div className="flex flex-col gap-4">
          <span className="text-xl font-bold text-gray-900 dark:text-white">
            새 채팅방 만들기
          </span>
          <input
            type="text"
            placeholder="채팅방 이름을 입력해주세요"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            className="focus:border-primary focus:ring-primary/20 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition outline-none focus:ring-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
      </Modal>
    </div>
  );
}
