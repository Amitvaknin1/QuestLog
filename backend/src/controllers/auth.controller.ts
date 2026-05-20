import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: "none" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

function signToken(userId: string, role: string): string {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { username, email, password } = req.body as { username?: string; email?: string; password?: string };

    if (!username || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    const existing = await User.findOne({ $or: [{ email }, { username }] });
    if (existing) {
      res.status(409).json({ error: "Email or username already in use" });
      return;
    }

    const user = await User.create({ username, email, password });
    const token = signToken(String(user._id), user.role);

    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(201).json({ data: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error("[POST /auth/register]", err);
    res.status(500).json({ error: "Registration failed" });
  }
}

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body as { email?: string; password?: string };

    if (!email || !password) {
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }

    const token = signToken(String(user._id), user.role);
    res.cookie("token", token, COOKIE_OPTIONS);
    res.json({ data: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error("[POST /auth/login]", err);
    res.status(500).json({ error: "Login failed" });
  }
}

export async function logout(_req: Request, res: Response): Promise<void> {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
}

export async function me(req: AuthRequest, res: Response): Promise<void> {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json({ data: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error("[GET /auth/me]", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}
