"use client";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import Avatar from "@/components/common/Avatar";

type TypingUser = {
  userId: string;
  userName: string;
  emoji?: string;
  backgroundColor?: string;
};

type Props = {
  socket: Socket | null;
};

export default function TypingIndicator({ socket }: Props) {
  const [typingUsers, setTypingUsers] = useState<Map<string, TypingUser>>(
    new Map()
  );

  useEffect(() => {
    if (!socket) {
      console.log("⚠️ TypingIndicator: socket is null");
      return;
    }

    console.log("🎧 TypingIndicator using socket:", socket.id);

    const handleUserTyping = (data: TypingUser & { isTyping: boolean }) => {
      setTypingUsers((prev) => {
        const next = new Map(prev);
        if (data.isTyping) {
          next.set(data.userId, data);
        } else {
          next.delete(data.userId);
        }
        return next;
      });
    };

    socket.on("user-typing", handleUserTyping);

    return () => {
      socket.off("user-typing", handleUserTyping);
    };
  }, [socket]);

  const typingArray = Array.from(typingUsers.values());

  if (typingArray.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-6 py-2">
      <div className="flex items-center gap-2">
        {typingArray.slice(0, 3).map((user) => (
          <div key={user.userId} className="flex items-center gap-2">
            {user.emoji && user.backgroundColor && (
              <Avatar
                emoji={user.emoji}
                backgroundColor={user.backgroundColor}
                size="sm"
              />
            )}
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {user.userName}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          입력 중
        </span>
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
          <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}
