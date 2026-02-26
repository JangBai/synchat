"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { getSocket } from "@/lib/socket";

const SocketContext = createContext<Socket | null>(null);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    console.log("🔌 SocketProvider initializing socket");
    const socketInstance = getSocket();
    setSocket(socketInstance);
    console.log("✅ Socket instance created:", socketInstance.id);

    return () => {
      console.log("🔌 SocketProvider cleanup");
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const socket = useContext(SocketContext);
  return socket;
}
