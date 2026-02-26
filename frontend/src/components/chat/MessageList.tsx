"use client";

import { ChatMessage } from "@/hooks/useChatRoom";
import { useEffect, useState, useRef } from "react";

type Props = {
  messages: ChatMessage[];
};

export default function MessageList({ messages }: Props) {
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const user = localStorage.getItem("chat-user");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // 새 메시지가 올 때마다 스크롤을 아래로
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main
      ref={scrollRef}
      className="max-h-[calc(100vh-300px)] flex-1 overflow-y-auto px-6 py-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-1">
        {messages.map((msg) => {
          const isMe = currentUser?.id === msg.sender.id;

          return (
            <div
              key={msg.id}
              className={`mb-3 flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className="flex max-w-[70%] flex-col">
                {!isMe && (
                  <div className="mb-1 text-xs font-semibold">
                    {msg.sender.name}
                  </div>
                )}

                <div
                  className={`break-word rounded-lg px-4 py-2 text-sm whitespace-pre-wrap ${
                    isMe
                      ? "self-end bg-blue-500 text-white"
                      : "self-start bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.text}
                </div>

                <div
                  className={`mt-1 text-xs opacity-60 ${
                    isMe ? "text-right" : "text-left"
                  }`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
