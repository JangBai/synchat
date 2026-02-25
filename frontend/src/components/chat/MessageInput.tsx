type Props = {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
};

export default function MessageInput({ input, setInput, onSend }: Props) {
  return (
    <footer className="border-t bg-white px-6 py-4">
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={1}
          placeholder="메시지를 입력하세요..."
          className="flex-1 resize-none rounded-lg border px-4 py-2 text-sm outline-none focus:border-blue-500"
        />
        <button
          onClick={onSend}
          className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          전송
        </button>
      </div>
    </footer>
  );
}
