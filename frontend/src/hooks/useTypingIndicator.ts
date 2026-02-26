import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";

export function useTypingIndicator(
  socket: Socket | null,
  roomId: string,
  inputValue: string
) {
  const isTypingRef = useRef(false);
  const hasContent = inputValue.trim().length > 0;

  useEffect(() => {
    if (!socket || !roomId) return;

    if (hasContent) {
      // 입력값이 있으면 타이핑 시작
      if (!isTypingRef.current) {
        isTypingRef.current = true;
        socket.emit("typing-start", { roomId });
      }
    } else {
      // 입력값이 비어있으면 타이핑 종료
      if (isTypingRef.current) {
        isTypingRef.current = false;
        socket.emit("typing-stop", { roomId });
      }
    }
  }, [socket, roomId, hasContent]);

  // 컴포넌트 언마운트 시 타이핑 종료
  useEffect(() => {
    return () => {
      if (socket && isTypingRef.current) {
        socket.emit("typing-stop", { roomId });
        isTypingRef.current = false;
      }
    };
  }, [socket, roomId]);
}
