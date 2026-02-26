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
  cancelText = "취소",
}: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="w-full max-w-md scale-100 animate-in fade-in zoom-in-95 rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6">{children}</div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="cursor-pointer rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {cancelText}
          </button>

          {onConfirm && (
            <button
              onClick={onConfirm}
              className="cursor-pointer rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white shadow-lg transition hover:bg-primary-dark"
            >
              {confirmText}
            </button>
          )}
        </div>
      </div>

      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  );
}
