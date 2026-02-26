"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RoomList from "@/components/chat/RoomList";
import ChatHeader from "@/components/chat/ChatHeader";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const savedUser = localStorage.getItem("chat-user");

    if (!savedUser) {
      router.replace("/");
    }
  }, [router]);

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader />

      <div className="flex flex-1">
        {/* 왼쪽 */}
        <div className="w-64 border-r bg-white">
          <RoomList />
        </div>

        {/* 오른쪽 */}
        <div className="flex-1 bg-gray-50">{children}</div>
      </div>
    </div>
  );
}
