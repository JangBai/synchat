import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

const socket = getSocket();

type Room = {
  id: string;
  name: string;
};

export function useRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const handleRoomList = (serverRooms: Room[]) => {
      setRooms(serverRooms);
    };

    const handleRoomCreated = (room: Room) => {
      setRooms((prev) => [...prev, room]);
    };

    socket.on("room-list", handleRoomList);
    socket.on("room-created", handleRoomCreated);

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
  };
}
