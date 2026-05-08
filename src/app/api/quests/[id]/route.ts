import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Quest from "@/models/Quest";

type Params = { params: Promise<{ id: string }> };

// PATCH /api/quests/[id] — update a quest
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const body = await request.json();

    // Only allow updating these specific fields
    const { title, description, status, priority, category } = body;
    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (status !== undefined) updateData.status = status;
    if (priority !== undefined) updateData.priority = priority;
    if (category !== undefined) updateData.category = category.trim();

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: "No valid fields provided for update" },
        { status: 400 }
      );
    }

    const quest = await Quest.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!quest) {
      return NextResponse.json({ error: "Quest not found" }, { status: 404 });
    }

    return NextResponse.json({ data: quest });
  } catch (error) {
    console.error("[PATCH /api/quests/[id]]", error);
    return NextResponse.json(
      { error: "Failed to update quest" },
      { status: 500 }
    );
  }
}

// DELETE /api/quests/[id] — delete a quest
export async function DELETE(_request: NextRequest, { params }: Params) {
  try {
    await connectToDatabase();

    const { id } = await params;
    const quest = await Quest.findByIdAndDelete(id).lean();

    if (!quest) {
      return NextResponse.json({ error: "Quest not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Quest deleted successfully" });
  } catch (error) {
    console.error("[DELETE /api/quests/[id]]", error);
    return NextResponse.json(
      { error: "Failed to delete quest" },
      { status: 500 }
    );
  }
}
