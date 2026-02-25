type Props = {
  messages: string[];
};

export default function MessageList({ messages }: Props) {
  return (
    <main className="flex-1 overflow-y-auto px-6 py-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="w-fit max-w-[70%] rounded-xl bg-blue-500 px-4 py-2 text-sm text-white"
          >
            {msg}
          </div>
        ))}
      </div>
    </main>
  );
}
