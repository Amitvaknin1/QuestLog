import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICharacter extends Document {
  name: string;
  level: number;
  className: string;
  server: string;
  mainStat: string;
  createdAt: Date;
}

const CharacterSchema = new Schema<ICharacter>(
  {
    name: {
      type: String,
      required: [true, "Character name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    level: {
      type: Number,
      required: [true, "Level is required"],
      min: [1, "Level must be at least 1"],
      max: [9999, "Level cannot exceed 9999"],
      default: 1,
    },
    className: {
      type: String,
      required: [true, "Class name is required"],
      trim: true,
    },
    server: {
      type: String,
      trim: true,
      default: "",
    },
    mainStat: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Character: Model<ICharacter> =
  mongoose.models.Character ||
  mongoose.model<ICharacter>("Character", CharacterSchema);

export default Character;
