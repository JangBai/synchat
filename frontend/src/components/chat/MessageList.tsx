"use client";

import { ChatMessage } from "@/hooks/useChatRoom";
import { useEffect, useState, useRef } from "react";
import { Socket } from "socket.io-client";
import Avatar from "@/components/common/Avatar";
import { User } from "@/types";

type Props = {
  messages: ChatMessage[];
  socket: Socket | null;
};

export default function MessageList({ messages, socket }: Props) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
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

  // 메시지 그룹핑 (같은 사용자가 연속으로 보낸 메시지)
  const groupedMessages: Array<{
    sender: User;
    messages: ChatMessage[];
    isMe: boolean;
  }> = [];

  messages.forEach((msg) => {
    const isMe = currentUser?.id === msg.sender.id;
    const lastGroup = groupedMessages[groupedMessages.length - 1];

    if (lastGroup && lastGroup.sender.id === msg.sender.id) {
      lastGroup.messages.push(msg);
    } else {
      groupedMessages.push({
        sender: msg.sender,
        messages: [msg],
        isMe,
      });
    }
  });

  return (
    <main
      ref={scrollRef}
      className="flex-1 overflow-y-auto bg-linear-to-b from-gray-50 to-gray-100 px-4 py-6 sm:px-6 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {groupedMessages.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className={`animate-in fade-in slide-in-from-bottom-2 flex gap-3 ${group.isMe ? "flex-row-reverse" : "flex-row"}`}
          >
            {!group.isMe && (
              <div className="shrink-0">
                <Avatar
                  emoji={group.sender.emoji}
                  backgroundColor={group.sender.backgroundColor}
                  size="md"
                />
              </div>
            )}

            <div
              className={`flex flex-col gap-2 ${group.isMe ? "items-end" : "items-start"}`}
            >
              {!group.isMe && (
                <div className="px-3 text-xs font-bold text-gray-600 dark:text-gray-400">
                  {group.sender.name}
                </div>
              )}

              {group.messages.map((msg, idx) => (
                <div
                  key={msg.id}
                  className={`group relative max-w-md rounded-2xl px-4 py-3 text-base shadow-md transition hover:shadow-lg ${
                    group.isMe
                      ? "from-primary to-primary-dark bg-linear-to-br text-white"
                      : "bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100"
                  }`}
                  style={{
                    animationDelay: `${idx * 50}ms`,
                  }}
                >
                  <p className="leading-relaxed wrap-break-word whitespace-pre-wrap">
                    {msg.text}
                  </p>
                </div>
              ))}

              <div
                className={`px-3 text-xs font-medium text-gray-400 dark:text-gray-500 ${
                  group.isMe ? "text-right" : "text-left"
                }`}
              >
                {new Date(
                  group.messages[group.messages.length - 1].createdAt
                ).toLocaleTimeString("ko-KR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
