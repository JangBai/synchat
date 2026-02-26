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
