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
    /** opened | in_progress | completed — set by chat lifecycle, not page navigation */
    status: {
      type: String,
      enum: ["opened", "in_progress", "completed"],
      default: "opened",
      index: true,
    },
    leadId: { type: Schema.Types.ObjectId, ref: "Lead" },
  },
  { timestamps: true },
);

if (models.ChatSession) {
  delete (models as Record<string, unknown>).ChatSession;
}

export const ChatSession = model("ChatSession", ChatSessionSchema);
