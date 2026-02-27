import express from "express";
import http from "http";
import cors from "cors";
import authRoutes from "./routes/auth.js";

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use("/auth", authRoutes);

  const server = http.createServer(app);

  return { app, server };
}
