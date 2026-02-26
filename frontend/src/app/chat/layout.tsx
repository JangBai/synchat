"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoomList from "@/components/chat/RoomList";
import ChatHeader from "@/components/chat/ChatHeader";
import { SocketProvider } from "@/contexts/SocketContext";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("chat-user");

    if (!savedUser) {
      router.replace("/");
    }
  }, [router]);

  return (
    <SocketProvider>
      <div className="flex h-screen flex-col bg-gray-50 dark:bg-gray-900">
        <ChatHeader />

        <div className="relative flex flex-1 overflow-hidden">
          {/* 모바일 오버레이 */}
          {isSidebarOpen && (
            <div
              className="absolute inset-0 z-10 bg-black/50 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          {/* 왼쪽 사이드바 */}
          <aside
            className={`absolute inset-y-0 left-0 z-20 w-80 border-r bg-white shadow-xl transition-transform duration-300 md:relative md:translate-x-0 md:shadow-none dark:border-gray-700 dark:bg-gray-800 ${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <RoomList />
          </aside>

          {/* 오른쪽 메인 */}
          <main className="flex flex-1 flex-col bg-gray-50 dark:bg-gray-900">
            {/* 모바일 햄버거 버튼 */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="absolute top-20 left-4 z-30 rounded-xl bg-white p-2.5 shadow-xl transition hover:scale-105 hover:bg-gray-100 md:hidden dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <svg
                className="h-6 w-6 text-gray-700 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {children}
          </main>
        </div>
      </div>
    </SocketProvider>
  );
}
