"use client";

export default function ChatHome() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="from-primary/10 dark:from-primary/20 rounded-3xl bg-linear-to-br to-purple-500/10 p-12 shadow-inner dark:to-purple-500/20">
        <svg
          className="text-primary h-20 w-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          채팅방을 선택해주세요
        </p>
        <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
          왼쪽 목록에서 채팅방을 선택하거나 새로 만들어보세요
        </p>
      </div>
    </div>
  );
}
