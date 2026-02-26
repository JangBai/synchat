import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

const socket = getSocket();

type Room = {
  id: string;
  name: string;
};

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const socket = getSocket();

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
  }, []);

  const createRoom = (roomName: string) => {
    socket.emit("create-room", roomName);
  };

  return {
    rooms,
    createRoom,
    isLoaded,
  };
}
