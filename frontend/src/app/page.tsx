import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div>
        <Link
          href="/chat"
          className="rounded-md bg-blue-500 px-4 py-2 text-2xl font-bold text-white"
        >
          <span>시작하기</span>
        </Link>
      </div>
    </main>
  );
}
