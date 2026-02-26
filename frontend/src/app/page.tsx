"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  // 이미 유저가 있으면 바로 채팅으로
  useEffect(() => {
    const savedUser = localStorage.getItem("chat-user");
    if (savedUser) {
      router.replace("/chat");
    }
  }, [router]);

  const handleStart = () => {
    if (!name.trim()) return;

    const user = {
      id: uuidv4(),
      name: name.trim(),
    };

    localStorage.setItem("chat-user", JSON.stringify(user));
    router.push("/chat");
  };

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col gap-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          className="rounded-md border px-4 py-2 text-lg"
        />

        <button
          onClick={handleStart}
          className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-2xl font-bold text-white"
        >
          시작하기
        </button>
      </div>
    </main>
  );
}
