import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectToDatabase } from "./lib/mongodb";
import authRoutes from "./routes/auth.routes";
import questRoutes from "./routes/quest.routes";

const app = express();
const PORT = process.env.PORT ?? 5000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN ?? "http://localhost:3000",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/quests", questRoutes);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

async function start() {
  await connectToDatabase();
  app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
}

start();
