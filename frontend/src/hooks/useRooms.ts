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
      setRooms(serverRooms);
      setIsLoaded(true);
    };

    socket.on("room-list", handleRoomList);

    return () => {
      socket.off("room-list", handleRoomList);
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
