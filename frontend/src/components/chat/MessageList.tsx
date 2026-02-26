import { ChatMessage } from "@/hooks/useChatRoom";

type Props = {
  messages: ChatMessage[];
};

export default function MessageList({ messages }: Props) {
  return (
    <main className="flex-1 overflow-y-auto px-6 py-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {messages.map((msg) => (
          <div className="flex items-end gap-2">
            <div
              key={msg.id}
              className="w-fit max-w-[70%] rounded-md bg-blue-500 px-4 py-2 text-sm whitespace-pre-wrap text-white"
            >
              <div>{msg.text}</div>
            </div>
            <div className="text-xs opacity-70">
              {new Date(msg.createdAt).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
