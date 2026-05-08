import mongoose, { Schema, Document, Model } from "mongoose";

export interface IQuest extends Document {
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
    title: {
      type: String,
      required: [true, "Quest title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
      default: "",
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    category: {
      type: String,
      trim: true,
      default: "General",
    },
  },
  {
    timestamps: true, // automatically manages createdAt and updatedAt
  }
);

// Prevent model re-compilation during Next.js hot reloads
const Quest: Model<IQuest> =
  mongoose.models.Quest || mongoose.model<IQuest>("Quest", QuestSchema);

export default Quest;
