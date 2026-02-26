import { useResizablePanel } from "@/hooks/useResizablePanel";

type Props = {
  input: string;
  setInput: (value: string) => void;
  onSend: () => void;
};

export default function MessageInput({ input, setInput, onSend }: Props) {
  const { height, dragHandleProps } = useResizablePanel({
    initialHeight: 200,
    minHeight: 200,
    maxHeight: 500,
  });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <footer className="border-t bg-white px-6 py-4">
      {/* 드래그 핸들 임시 제거 */}
      {/* <div
        {...dragHandleProps}
        className="mx-auto mb-2 h-1 w-16 cursor-row-resize rounded bg-gray-300"
      /> */}

      <div
        // style={{ height }}
        className="mx-auto flex h-[200px] max-w-3xl flex-col items-end gap-3 rounded-xl border px-4 py-3"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={3}
          placeholder="메시지를 입력하세요"
          onKeyDown={handleKeyDown}
          className="h-full w-full flex-1 resize-none overflow-hidden text-sm outline-none focus:border-blue-500"
        />
        <button
          onClick={onSend}
          className="cursor-pointer rounded-sm bg-blue-500 px-3 py-1 text-sm font-medium text-white transition hover:bg-blue-600"
        >
          전송
        </button>
      </div>
    </footer>
  );
}
