"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "@/components/formInput/FormInput";
import { loginSchema } from "@/schemas/auth";
import { login } from "@/api/auth/route";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const firstError = result.error.issues[0].message;
      setError(firstError);
      return;
    }

    try {
      const res = await login(result.data);

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "로그인 실패");
      }

      const data = await res.json();

      localStorage.setItem("chat-token", data.token);
      router.push("/chat");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-full max-w-md rounded-3xl border border-gray-700/50 bg-gray-800/90 p-8 shadow-2xl backdrop-blur-xl">
        {/* 로고 영역 */}
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
          <p className="text-sm text-gray-400">실시간 채팅에 로그인하세요</p>
        </div>

        {/* 이메일 */}
        <div className="mb-4 flex flex-col gap-2">
          <FormInput
            label="이메일"
            name="login_email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="이메일을 입력해주세요"
            autoComplete="off"
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-4 flex flex-col gap-2">
          <FormInput
            label="비밀번호"
            name="login_password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="비밀번호를 입력해주세요"
            autoComplete="new-password"
          />
        </div>

        {/* 에러 */}
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* 버튼 */}
        <button
          onClick={handleLogin}
          className="bg-primary hover:bg-primary-dark w-full cursor-pointer rounded-xl px-4 py-3.5 text-lg font-bold text-white shadow-xl transition hover:scale-[1.02]"
        >
          로그인하기
        </button>

        {/* 회원가입 이동 */}
        <div className="mt-6 text-center text-sm text-gray-400">
          계정이 없으신가요?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-primary cursor-pointer font-semibold hover:underline"
          >
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
}
