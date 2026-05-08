import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quest from "@/models/Quest";

// GET /api/quests — fetch all quests
export async function GET() {
  try {
    await connectToDatabase();
    const quests = await Quest.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ data: quests });
  } catch (error) {
    console.error("[GET /api/quests]", error);
    return NextResponse.json(
      { error: "Failed to fetch quests" },
      { status: 500 }
    );
  }
}

// POST /api/quests — create a new quest
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { title, description, status, priority, category } = body;

    if (!title || typeof title !== "string" || title.trim() === "") {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const quest = await Quest.create({
      title: title.trim(),
      description: description?.trim() ?? "",
      status: status ?? "todo",
      priority: priority ?? "medium",
      category: category?.trim() ?? "General",
    });

    return NextResponse.json({ data: quest }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/quests]", error);
    return NextResponse.json(
      { error: "Failed to create quest" },
      { status: 500 }
    );
  }
}
