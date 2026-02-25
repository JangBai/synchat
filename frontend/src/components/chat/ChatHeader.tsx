import Link from "next/link";

export default function ChatHeader() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-3">
      <span className="text-base font-semibold">Synchat</span>
      <Link href="/">
        <span className="rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-500 transition duration-300 hover:bg-gray-100">
          나가기
        </span>
      </Link>
    </header>
  );
}
