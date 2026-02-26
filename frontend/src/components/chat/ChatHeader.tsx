import { useRouter } from "next/navigation";
import { resetSocket } from "@/lib/socket";

export default function ChatHeader() {
  const router = useRouter();

  const handleLogout = () => {
    resetSocket();
    localStorage.removeItem("chat-user");
    router.replace("/");
  };

  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-2">
      <span className="text-base font-semibold">Synchat</span>
      <button
        onClick={handleLogout}
        className="cursor-pointer rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-500 transition duration-300 hover:bg-gray-100"
      >
        나가기
      </button>
    </header>
  );
}
