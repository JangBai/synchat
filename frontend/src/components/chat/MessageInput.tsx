type Props = {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
};

export default function MessageInput({ input, setInput, onSend }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <footer className="border-t bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="mx-auto flex max-w-3xl items-end gap-3">
        <div className="focus-within:border-primary focus-within:ring-primary/20 flex flex-1 items-center rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 transition focus-within:ring-2 dark:border-gray-600 dark:bg-gray-700">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="메시지를 입력하세요..."
            onKeyDown={handleKeyDown}
            className="max-h-40 w-full resize-none bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-500 dark:text-gray-100 dark:placeholder:text-gray-400"
          />
        </div>
        <button
          onClick={onSend}
          disabled={!input.trim()}
          className="bg-primary hover:bg-primary-dark flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white shadow-lg transition disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="전송"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}
