import { Response } from "express";
import Quest from "../models/Quest";
import { AuthRequest } from "../middleware/auth";

export async function getQuests(req: AuthRequest, res: Response): Promise<void> {
  try {
    const quests = await Quest.find({ userId: req.userId }).sort({ createdAt: -1 }).lean();
    res.json({ data: quests });
  } catch (err) {
    console.error("[GET /quests]", err);
    res.status(500).json({ error: "Failed to fetch quests" });
  }
}

export async function createQuest(req: AuthRequest, res: Response): Promise<void> {
  try {
    const { title, description, status, priority, category } = req.body as Record<string, string>;

    if (!title?.trim()) {
      res.status(400).json({ error: "Title is required" });
      return;
    }

    const quest = await Quest.create({
      userId: req.userId,
      title: title.trim(),
      description: description?.trim() ?? "",
      status: status ?? "todo",
      priority: priority ?? "medium",
      category: category?.trim() ?? "General",
    });

    res.status(201).json({ data: quest });
  } catch (err) {
    console.error("[POST /quests]", err);
    res.status(500).json({ error: "Failed to create quest" });
  }
}

export async function updateQuest(req: AuthRequest, res: Response): Promise<void> {
  try {
    const quest = await Quest.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!quest) {
      res.status(404).json({ error: "Quest not found" });
      return;
    }

    res.json({ data: quest });
  } catch (err) {
    console.error("[PATCH /quests/:id]", err);
    res.status(500).json({ error: "Failed to update quest" });
  }
}

export async function deleteQuest(req: AuthRequest, res: Response): Promise<void> {
  try {
    const quest = await Quest.findOneAndDelete({ _id: req.params.id, userId: req.userId });

    if (!quest) {
      res.status(404).json({ error: "Quest not found" });
      return;
    }

    res.json({ message: "Quest deleted" });
  } catch (err) {
    console.error("[DELETE /quests/:id]", err);
    res.status(500).json({ error: "Failed to delete quest" });
  }
}
