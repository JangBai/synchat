"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Avatar from "@/components/common/Avatar";
import { EMOJIS, COLORS } from "@/constant/settings";
import FormInput from "@/components/formInput/FormInput";
import { registerSchema, RegisterSchema } from "@/schemas/auth";
import { register } from "@/api/auth/route";

type FormErrors = Partial<Record<keyof RegisterSchema, string>>;

export default function Register() {
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState(EMOJIS[0]);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);

  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});
  const validate = () => {
    const result = registerSchema.safeParse({
      email,
      password,
      confirmPassword,
      nickname,
    });

    if (!result.success) {
      const fieldErrors: FormErrors = {};

      result.error.issues.forEach((err) => {
        const fieldName = err.path[0] as keyof RegisterSchema;
        fieldErrors[fieldName] = err.message;
      });

      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleStart = async () => {
    const isValid = validate();
    if (!isValid) return;

    const res = await register({
      email,
      password,
      confirmPassword,
      nickname,
      profile: selectedEmoji,
    });

    const data = await res.json();

    localStorage.setItem("chat-token", data.token);
    router.push("/");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleStart();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 py-12">
      <div className="w-full max-w-md rounded-3xl border border-gray-700/50 bg-gray-800/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl">
              <svg
                className="h-10 w-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold text-white">Synchat</h1>
          <p className="text-sm text-gray-400">실시간 채팅에 참여하세요</p>
        </div>

        <div className="mb-6 flex flex-col items-center gap-4">
          <Avatar
            emoji={selectedEmoji}
            backgroundColor={selectedColor}
            size="xl"
          />
          <span className="text-sm font-medium text-white/90">
            프로필 미리보기
          </span>
        </div>

        <div className="mb-6 flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-300">
            이모지 선택
          </label>
          <div className="grid grid-cols-6 gap-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedEmoji(emoji)}
                className={`flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition hover:scale-110 ${
                  selectedEmoji === emoji
                    ? "bg-primary ring-primary-light shadow-lg ring-2"
                    : "bg-gray-700/50 hover:bg-gray-700"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8 flex flex-col gap-2">
          <label className="text-sm font-semibold text-gray-300">
            배경색 선택
          </label>
          <div className="grid grid-cols-8 gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`h-10 w-10 rounded-xl transition hover:scale-110 ${
                  selectedColor === color
                    ? "ring-2 ring-white ring-offset-2 ring-offset-gray-800"
                    : ""
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <FormInput
            label="닉네임"
            name="nickname"
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="닉네임을 입력해주세요"
            error={errors.nickname}
            autoComplete="off"
          />
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <FormInput
            label="비밀번호"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="비밀번호를 입력해주세요"
            error={errors.password}
            autoComplete="new-password"
          />
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <FormInput
            label="비밀번호 확인"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="비밀번호를 다시 입력해주세요"
            error={errors.confirmPassword}
          />
        </div>

        <div className="mb-3 flex flex-col gap-2">
          <FormInput
            label="이메일"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="이메일을 입력해주세요"
            error={errors.email}
          />
        </div>

        <button
          onClick={handleStart}
          className="bg-primary hover:bg-primary-dark w-full cursor-pointer rounded-xl px-4 py-3.5 text-lg font-bold text-white shadow-xl transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        >
          아이디 생성하기
        </button>
      </div>
    </div>
  );
}
