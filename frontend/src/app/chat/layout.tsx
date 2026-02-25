// chat/layout.tsx
import RoomList from "@/components/chat/RoomList";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* 왼쪽 */}
      <div className="w-64 border-r bg-white">
        <RoomList />
      </div>

      {/* 오른쪽 */}
      <div className="flex-1 bg-gray-50">{children}</div>
    </div>
  );
}
