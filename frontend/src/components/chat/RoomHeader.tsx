"use client";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket | null;
  roomId: string;
  roomName: string;
};

export default function RoomHeader({ socket, roomId, roomName }: Props) {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    if (!socket) {
      console.log("⚠️ RoomHeader: socket is null");
      return;
    }

    console.log("🎧 RoomHeader using socket:", socket.id, "for room:", roomId);

    const handleRoomUsersUpdated = (data: { roomId: string; count: number }) => {
      console.log("📊 RoomHeader received room-users-updated:", data);
      if (data.roomId === roomId) {
        setUserCount(data.count);
      }
    };

    socket.on("room-users-updated", handleRoomUsersUpdated);

    return () => {
      socket.off("room-users-updated", handleRoomUsersUpdated);
    };
  }, [socket, roomId]);

  return (
    <div className="border-b border-gray-200/50 bg-white/80 px-6 py-5 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 dark:bg-primary/20">
            <svg
              className="h-5 w-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {roomName}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
              <div className="h-2 w-2 rounded-full bg-green-500" />
              <span>{userCount}명 참여 중</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
