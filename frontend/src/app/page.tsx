"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Avatar from "@/components/common/Avatar";

const EMOJIS = [
  "😀",
  "😎",
  "🥰",
  "🤗",
  "🤔",
  "😴",
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🦄",
  "🐔",
  "🐧",
  "🦆",
  "🦉",
  "🦇",
  "🐺",
  "🐗",
  "🐴",
];

const COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#ec4899",
  "#f43f5e",
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#10b981",
  "#14b8a6",
  "#06b6d4",
  "#0ea5e9",
  "#3b82f6",
  "#34147c",
];

export default function Home() {
  const [name, setName] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const router = useRouter();

  // 기존 유저 불러오기
  useEffect(() => {
    const savedUser = localStorage.getItem("chat-user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setName(user.name);
      setSelectedEmoji(user.emoji || EMOJIS[0]);
      setSelectedColor(user.backgroundColor || COLORS[0]);
    }
  }, []);

  const handleStart = () => {
    if (!name.trim()) return;

    const savedUser = localStorage.getItem("chat-user");
    let userId = uuidv4();

    if (savedUser) {
      const existingUser = JSON.parse(savedUser);
      userId = existingUser.id;
    }

    const user = {
      id: userId,
      name: name.trim(),
      emoji: selectedEmoji,
      backgroundColor: selectedColor,
    };

    localStorage.setItem("chat-user", JSON.stringify(user));
    router.push("/chat");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleStart();
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-3xl border border-gray-700/50 bg-gray-800/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl">
              <svg
                className="h-10 w-10 text-white"
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
          </div>
          <h1 className="mb-2 text-4xl font-bold text-white">Synchat</h1>
          <p className="text-sm text-gray-400">실시간 채팅에 참여하세요</p>
        </div>

        <div className="mb-6 flex flex-col items-center gap-4">
          <Avatar
            emoji={selectedEmoji}
            backgroundColor={selectedColor}
            size="xl"
          />
          <span className="text-sm font-medium text-white/90">
            프로필 미리보기
          </span>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <label className="text-sm font-medium text-white/90">닉네임</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="닉네임을 입력해주세요"
            className="rounded-xl border border-white/20 bg-white/20 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition outline-none focus:border-white/40 focus:bg-white/30"
          />
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-300">
            이모지 선택
          </label>
          <div className="grid grid-cols-6 gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition hover:scale-110 ${
                  selectedEmoji === emoji
                    ? "bg-primary ring-primary-light shadow-lg ring-2"
                    : "bg-gray-700/50 hover:bg-gray-700"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-300">
            배경색 선택
          </label>
          <div className="grid grid-cols-8 gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`h-10 w-10 rounded-xl transition hover:scale-110 ${
                  selectedColor === color
                    ? "ring-2 ring-white ring-offset-2 ring-offset-gray-800"
                    : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={!name.trim()}
          className="bg-primary hover:bg-primary-dark w-full cursor-pointer rounded-xl px-4 py-3.5 text-lg font-bold text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          시작하기
        </button>
      </div>
    </main>
  );
}
