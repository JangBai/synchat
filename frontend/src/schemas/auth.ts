import { z } from "zod";

export const registerSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "이메일을 입력해주세요.")
      .email("올바른 이메일 형식이 아닙니다."),

    password: z.string().min(6, "비밀번호는 최소 6자 이상이어야 합니다."),

    confirmPassword: z.string().min(1, "비밀번호 확인을 입력해주세요."),

    nickname: z
      .string()
      .trim()
      .min(1, "닉네임을 입력해주세요.")
      .max(20, "닉네임은 20자 이하로 입력해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
