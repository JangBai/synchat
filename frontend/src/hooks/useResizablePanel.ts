import { useEffect, useRef, useState } from "react";

type Options = {
  initialHeight?: number;
  minHeight?: number;
  maxHeight?: number;
};

export function useResizablePanel({
  initialHeight = 120,
  minHeight = 80,
  maxHeight = 400,
}: Options = {}) {
  const [height, setHeight] = useState(initialHeight);
  const isDragging = useRef(false);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;

    setHeight((prev) => {
      const next = prev - e.movementY;
      return Math.max(minHeight, Math.min(next, maxHeight));
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return {
    height,
    dragHandleProps: {
      onMouseDown: handleMouseDown,
    },
  };
}
