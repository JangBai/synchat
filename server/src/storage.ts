import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "data/chat.json");

export type User = {
  id: string;
  name: string;
};

export type Room = {
  id: string;
  name: string;
  createdBy: User;
  createdAt: number;
};

export type Message = {
  id: string;
  text: string;
  sender: User;
  createdAt: number;
};

export type ChatData = {
  rooms: Room[];
  messages: Record<string, Message[]>;
};

export function loadChatData(): ChatData {
  if (!fs.existsSync(filePath)) {
    return { rooms: [], messages: {} };
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  if (!raw.trim()) {
    return { rooms: [], messages: {} };
  }

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("JSON parse error. Resetting file.");
    return { rooms: [], messages: {} };
  }
}

export function saveChatData(data: ChatData) {
  console.log("💾 Saving to file...");
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
