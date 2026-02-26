"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { resetSocket } from "@/lib/socket";
import { useSocket } from "@/contexts/SocketContext";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function ChatHeader() {
  const router = useRouter();
  const socket = useSocket();
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    if (!socket) return;

    const handleUserCountUpdated = (data: { totalUsers: number }) => {
      setTotalUsers(data.totalUsers);
    };

    socket.on("user-count-updated", handleUserCountUpdated);

    return () => {
      socket.off("user-count-updated", handleUserCountUpdated);
    };
  }, [socket]);

  const handleBack = () => {
    resetSocket();
    router.push("/");
  };

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
      <span className="text-xl font-bold text-gray-900 dark:text-white">
        Synchat
      </span>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 dark:bg-gray-700">
          <svg
            className="h-4 w-4 text-green-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <circle cx="10" cy="10" r="10" />
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {totalUsers} 온라인
          </span>
        </div>
        <ThemeToggle />
        <button
          onClick={handleBack}
          className="cursor-pointer rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-600 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          뒤로가기
        </button>
      </div>
    </header>
  );
}
