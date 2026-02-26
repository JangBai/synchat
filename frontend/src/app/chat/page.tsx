"use client";

import { useEffect } from "react";
import { getSocket, resetSocket } from "@/lib/socket";

export default function ChatHome() {
  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    // 필요하면 여기서 join-room emit

    return () => {
      // 페이지 벗어나면 정리
      resetSocket();
    };
  }, []);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-lg text-gray-500">채팅방을 선택해주세요.</div>
    </div>
  );
}
