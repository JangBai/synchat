import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = Router();
dotenv.config();

router.post("/register", async (req, res) => {
  try {
    const { email, password, nickname, profile } = req.body;

    // 간단 검증 (나중에 Zod로 교체 가능)
    if (!email || !password || !nickname) {
      return res.status(400).json({ message: "필수 값이 누락되었습니다." });
    }

    // 이메일 중복 확인
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    }

    const user = await prisma.user.create({
      data: {
        email,
        password, // 🔥 지금은 평문 (다음 단계에서 bcrypt 적용)
        nickname,
        profile,
      },
    });

    return res.status(201).json({
      id: Number(user.id),
      email: user.email,
      nickname: user.nickname,
      profile: user.profile,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "이메일과 비밀번호 필요" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ message: "존재하지 않는 계정" });
    }

    // 🔥 지금은 평문 비교 (다음 단계에서 bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ message: "비밀번호 불일치" });
    }

    // 🔐 JWT 발급
    const token = jwt.sign(
      {
        id: user.id.toString(),
        email: user.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.json({
      token,
      user: {
        id: user.id.toString(),
        email: user.email,
        nickname: user.nickname,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "서버 오류" });
  }
});

export default router;
