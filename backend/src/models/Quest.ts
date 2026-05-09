import mongoose, { Document, Schema, Types } from "mongoose";

export interface IQuest extends Document {
  userId: Types.ObjectId;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const QuestSchema = new Schema<IQuest>(
  {
    userId:      { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    title:       { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, default: "", maxlength: 500 },
    status:      { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
    priority:    { type: String, enum: ["low", "medium", "high"], default: "medium" },
    category:    { type: String, default: "General", trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IQuest>("Quest", QuestSchema);
