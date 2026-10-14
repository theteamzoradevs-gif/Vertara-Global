import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICaptchaChallenge extends Document {
  challengeId: string;
  hashedAnswer: string;
  salt: string;
  attempts: number;
  createdAt: Date;
  expiresAt: Date;
}

const CaptchaChallengeSchema = new Schema<ICaptchaChallenge>(
  {
    challengeId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    hashedAnswer: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    attempts: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // Automatically purged by MongoDB TTL worker when expiresAt is reached
    },
  },
  { timestamps: false }
);

export const CaptchaChallenge: Model<ICaptchaChallenge> =
  mongoose.models.CaptchaChallenge ||
  mongoose.model<ICaptchaChallenge>("CaptchaChallenge", CaptchaChallengeSchema);
