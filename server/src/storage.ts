import fs from "fs";
import path from "path";

const dataDir = path.resolve(process.cwd(), "data");
const filePath = path.join(dataDir, "chat.json");

export type User = {
  id: string;
  name: string;
  emoji: string;
  backgroundColor: string;
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

export function loadChatData() {
  // 폴더 없으면 생성
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // 파일 없으면 기본 구조로 생성
  if (!fs.existsSync(filePath)) {
    const initialData = { rooms: [], messages: {} };
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    return initialData;
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  if (!raw.trim()) {
    return { rooms: [], messages: {} };
  }

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.error("JSON parse error. Resetting file.");
    const resetData = { rooms: [], messages: {} };
    fs.writeFileSync(filePath, JSON.stringify(resetData, null, 2));
    return resetData;
  }
}

export function saveChatData(data: any) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
