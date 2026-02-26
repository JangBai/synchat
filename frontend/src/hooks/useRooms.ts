import { useEffect, useState } from "react";
import { Room } from "@/types";
import { useSocket } from "@/contexts/SocketContext";

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      console.log("⚠️ useRooms: socket is null");
      return;
    }

    console.log("🎧 useRooms using socket:", socket.id);

    const handleRoomList = (serverRooms: Room[]) => {
      console.log("📋 received room-list:", serverRooms);
      setRooms(serverRooms);
      setIsLoaded(true);
    };

    const handleRoomCreated = (newRoom: Room) => {
      console.log("✅ room-created:", newRoom);
      setRooms((prev) => [...prev, newRoom]);
    };

    // 리스너 등록
    socket.on("room-list", handleRoomList);
    socket.on("room-created", handleRoomCreated);

    // 소켓이 이미 연결되어 있으면 즉시 요청, 아니면 연결 후 요청
    if (socket.connected) {
      console.log("🔌 already connected, requesting rooms");
      socket.emit("get-rooms");
    } else {
      const handleConnect = () => {
        console.log("🔌 connected, requesting rooms");
        socket.emit("get-rooms");
      };
      socket.on("connect", handleConnect);

      return () => {
        socket.off("room-list", handleRoomList);
        socket.off("room-created", handleRoomCreated);
        socket.off("connect", handleConnect);
      };
    }

    return () => {
      socket.off("room-list", handleRoomList);
      socket.off("room-created", handleRoomCreated);
    };
  }, [socket]);

  const createRoom = (roomName: string) => {
    if (socket) {
      socket.emit("create-room", roomName);
    }
  };

  return {
    rooms,
    createRoom,
    isLoaded,
  };
}
