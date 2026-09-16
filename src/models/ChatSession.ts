import mongoose, { Schema, models, model } from "mongoose";

const ChatSessionSchema = new Schema(
  {
    sessionId: { type: String, required: true, index: true },
    path: [String],
    messages: [
      {
        role: { type: String, enum: ["bot", "user"] },
        text: String,
        at: { type: Date, default: Date.now },
      },
    ],
    intent: String,
    leadId: { type: Schema.Types.ObjectId, ref: "Lead" },
  },
  { timestamps: true },
);

export const ChatSession =
  models.ChatSession || model("ChatSession", ChatSessionSchema);
