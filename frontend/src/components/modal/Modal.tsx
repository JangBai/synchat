"use client";

import { ReactNode, useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export default function Modal({
  isOpen,
  onClose,
  onConfirm,
  children,
  confirmText = "확인",
  cancelText = "닫기",
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* 모달 박스 */}
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 내용 영역 */}
        <div className="mb-6">{children}</div>

        {/* 버튼 영역 */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-lg border px-4 py-2 text-sm transition duration-300 hover:bg-gray-100"
          >
            {cancelText}
          </button>

          {onConfirm && (
            <button
              onClick={onConfirm}
              className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition duration-300 hover:bg-blue-700"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>

      {/* 배경 클릭 시 닫기 */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
