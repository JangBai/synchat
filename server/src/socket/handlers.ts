import { v4 as uuidv4 } from "uuid";
import { connectedUsers, roomUsers, socketToRooms } from "./state.js";
import { loadChatData, saveChatData } from "../storage.js";
import { Server, Socket } from "socket.io";

let { rooms, messages } = loadChatData();

export function registerSocketHandlers(io: Server, socket: Socket) {
  const { user } = socket.handshake.auth;
  console.log("🔌 connected:", socket.id, user);

  // 접속자 추가
  connectedUsers.set(socket.id, user);
  socketToRooms.set(socket.id, new Set());

  // 전체 접속자 수 브로드캐스트
  io.emit("user-count-updated", {
    totalUsers: connectedUsers.size,
  });

  // -------------------------방 목록 요청--------------------------------
  socket.on("get-rooms", () => {
    console.log("📋 sending room-list to:", socket.id);
    socket.emit("room-list", rooms);
  });

  // -------------------------방 참여자 수 요청--------------------------------
  socket.on("get-room-counts", () => {
    console.log("📊 sending room-counts to:", socket.id);
    const counts: Record<string, number> = {};
    roomUsers.forEach((userSet, roomId) => {
      counts[roomId] = userSet.size;
    });
    socket.emit("room-counts", counts);
  });

  // -------------------------방 생성--------------------------------
  socket.on("create-room", (roomName) => {
    const roomId = uuidv4();

    const room = {
      id: roomId,
      name: roomName,
      createdBy: user,
      createdAt: Date.now(),
    };

    rooms.push(room);
    messages[roomId] = [];

    saveChatData({ rooms, messages });

    // 새로운 방 생성 알림 + 전체 목록 재전송
    io.emit("room-created", room);
    io.emit("room-list", rooms);
  });

  // -------------------------방 입장--------------------------------
  socket.on("join-room", (roomId) => {
    console.log("🚪 user joining room:", socket.id, roomId);
    socket.join(roomId);

    // 방 참여자 추적
    if (!roomUsers.has(roomId)) {
      roomUsers.set(roomId, new Set());
    }
    roomUsers.get(roomId).add(socket.id);
    socketToRooms.get(socket.id)?.add(roomId);

    const currentCount = roomUsers.get(roomId).size;

    // 방 참여자 수 업데이트
    const updateData = {
      roomId,
      count: currentCount,
    };

    io.emit("room-users-updated", updateData);

    // 기존 메시지 전송
    socket.emit("previous-messages", messages[roomId] || []);
  });

  // -------------------------메세지 전송--------------------------------
  socket.on("send-message", ({ roomId, message }) => {
    const newMessage = {
      id: uuidv4(),
      text: message,
      sender: user,
      createdAt: Date.now(),
    };

    if (!messages[roomId]) {
      messages[roomId] = [];
    }

    messages[roomId].push(newMessage);

    saveChatData({ rooms, messages });

    io.to(roomId).emit("receive-message", newMessage);
  });

  // -------------------------타이핑 표시--------------------------------
  socket.on("typing-start", ({ roomId }) => {
    socket.to(roomId).emit("user-typing", {
      userId: user.id,
      userName: user.name,
      emoji: user.emoji,
      backgroundColor: user.backgroundColor,
      isTyping: true,
    });
  });

  socket.on("typing-stop", ({ roomId }) => {
    socket.to(roomId).emit("user-typing", {
      userId: user.id,
      userName: user.name,
      emoji: user.emoji,
      backgroundColor: user.backgroundColor,
      isTyping: false,
    });
  });

  // -------------------------방 퇴장--------------------------------
  socket.on("leave-room", (roomId) => {
    socket.leave(roomId);

    // 방 참여자 추적에서 제거
    const roomUserSet = roomUsers.get(roomId);
    if (roomUserSet) {
      roomUserSet.delete(socket.id);

      const updateData = {
        roomId,
        count: roomUserSet.size,
      };

      io.emit("room-users-updated", updateData);

      // 방에 아무도 없으면 Map에서 제거
      if (roomUserSet.size === 0) {
        roomUsers.delete(roomId);
      }
    }

    // socketToRooms에서도 제거
    socketToRooms.get(socket.id)?.delete(roomId);
  });

  // -------------------------연결 해제--------------------------------
  socket.on("disconnect", () => {
    console.log("🔌 disconnected:", socket.id, user);

    // 접속자 제거
    connectedUsers.delete(socket.id);

    // 모든 방에서 제거
    const userRooms = socketToRooms.get(socket.id);
    if (userRooms) {
      userRooms.forEach((roomId: string) => {
        const roomUserSet = roomUsers.get(roomId);
        if (roomUserSet) {
          roomUserSet.delete(socket.id);

          // 방 참여자 수 업데이트 (다른 모든 클라이언트에게만, 본인은 이미 disconnect됨)
          io.emit("room-users-updated", {
            roomId,
            count: roomUserSet.size,
          });

          // 방에 아무도 없으면 Map에서 제거
          if (roomUserSet.size === 0) {
            roomUsers.delete(roomId);
          }
        }
      });
    }

    socketToRooms.delete(socket.id);

    // 전체 접속자 수 브로드캐스트
    io.emit("user-count-updated", {
      totalUsers: connectedUsers.size,
    });
  });
}
