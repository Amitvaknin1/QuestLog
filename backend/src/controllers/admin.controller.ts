import { Response } from "express";
import User from "../models/User";
import Quest from "../models/Quest";
import { AuthRequest } from "../middleware/auth";

export async function getAllUsers(_req: AuthRequest, res: Response): Promise<void> {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 }).lean();
    res.json({ data: users });
  } catch (err) {
    console.error("[GET /admin/users]", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

export async function getAllQuests(_req: AuthRequest, res: Response): Promise<void> {
  try {
    const quests = await Quest.find()
      .populate("userId", "username email")
      .sort({ createdAt: -1 })
      .lean();
    res.json({ data: quests });
  } catch (err) {
    console.error("[GET /admin/quests]", err);
    res.status(500).json({ error: "Failed to fetch quests" });
  }
}

export async function updateUserRole(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { role } = req.body as { role?: string };

    if (role !== "user" && role !== "admin") {
      res.status(400).json({ error: "Role must be 'user' or 'admin'" });
      return;
    }

    if (id === req.userId) {
      res.status(400).json({ error: "Cannot change your own role" });
      return;
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json({ data: user });
  } catch (err) {
    console.error("[PATCH /admin/users/:id/role]", err);
    res.status(500).json({ error: "Failed to update role" });
  }
}

export async function deleteUser(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { id } = req.params;

    if (id === req.userId) {
      res.status(400).json({ error: "Cannot delete your own account" });
      return;
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    await Quest.deleteMany({ userId: id });
    res.json({ message: "User and their quests deleted" });
  } catch (err) {
    console.error("[DELETE /admin/users/:id]", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
}
