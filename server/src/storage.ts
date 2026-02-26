import fs from "fs";
import path from "path";

const filePath = path.resolve(process.cwd(), "data/chat.json");

export type ChatData = {
  rooms: { id: string; name: string }[];
  messages: Record<string, { id: string; text: string; createdAt: number }[]>;
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
