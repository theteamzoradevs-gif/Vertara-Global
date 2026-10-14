import crypto from "node:crypto";
import { connectDB } from "@/lib/db";
import { CaptchaChallenge } from "@/models/CaptchaChallenge";

const CHARSET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // Excluded ambiguous chars: 0, O, 1, I, L
const CHALLENGE_LENGTH = 5;
const CHALLENGE_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS_PER_CHALLENGE = 3;
const MAX_FAILED_PER_IP = 10;
const IP_LOCKOUT_MS = 5 * 60 * 1000; // 5 minutes lockout for repeated failures

// In-memory fallback if MongoDB connection is pending or unavailable
interface MemoryChallenge {
  challengeId: string;
  hashedAnswer: string;
  salt: string;
  attempts: number;
  expiresAt: number;
}

const memoryChallenges = new Map<string, MemoryChallenge>();
const ipFailedAttempts = new Map<string, { count: number; resetAt: number }>();

// Periodic in-memory cleanup
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [id, c] of memoryChallenges.entries()) {
      if (c.expiresAt <= now) {
        memoryChallenges.delete(id);
      }
    }
    for (const [ip, entry] of ipFailedAttempts.entries()) {
      if (entry.resetAt <= now) {
        ipFailedAttempts.delete(ip);
      }
    }
  }, 60000).unref?.();
}

function hashAnswer(salt: string, answer: string): string {
  return crypto
    .createHash("sha256")
    .update(`${salt}:${answer.trim().toUpperCase()}`)
    .digest("hex");
}

function generateRandomCode(): string {
  let code = "";
  for (let i = 0; i < CHALLENGE_LENGTH; i++) {
    const idx = crypto.randomInt(0, CHARSET.length);
    code += CHARSET[idx];
  }
  return code;
}

function generateCaptchaSvg(code: string): string {
  const width = 220;
  const height = 48;

  // Background wave lines for anti-OCR distortion
  const lines: string[] = [];
  const strokes = ["#B59439", "#2F3F34", "#4A5D4E", "#8C7026"];
  for (let i = 0; i < 3; i++) {
    const y1 = crypto.randomInt(10, height - 10);
    const y2 = crypto.randomInt(10, height - 10);
    const cy = crypto.randomInt(5, height - 5);
    const stroke = strokes[i % strokes.length];
    lines.push(
      `<path d="M 0 ${y1} Q ${width / 2} ${cy} ${width} ${y2}" stroke="${stroke}" stroke-width="1.5" fill="none" opacity="0.35" />`
    );
  }

  // Scattered noise dots
  const dots: string[] = [];
  for (let i = 0; i < 18; i++) {
    const cx = crypto.randomInt(10, width - 10);
    const cy = crypto.randomInt(6, height - 6);
    const r = (crypto.randomInt(10, 25) / 10).toFixed(1);
    dots.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#B59439" opacity="0.25" />`);
  }

  // Characters with controlled rotation and vertical jitter
  const charElements: string[] = [];
  const charSpacing = width / (CHALLENGE_LENGTH + 1);
  const colors = ["#FFFFFF", "#F5F2EA", "#E5C368", "#FFFFFF", "#F0EDE1"];

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const x = Math.round((i + 1) * charSpacing);
    const y = crypto.randomInt(31, 35);
    const rotate = crypto.randomInt(-8, 9);
    const color = colors[i % colors.length];

    charElements.push(
      `<text x="${x}" y="${y}" fill="${color}" font-family="Calibri, -apple-system, BlinkMacSystemFont, sans-serif" font-size="27" font-weight="bold" font-style="italic" text-anchor="middle" transform="rotate(${rotate} ${x} ${y})" letter-spacing="2">${char}</text>`
    );
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" class="w-full max-w-[220px] h-[48px] select-none" aria-hidden="true" role="img">
    <rect width="${width}" height="${height}" rx="8" fill="#162235" />
    ${lines.join("\n")}
    ${dots.join("\n")}
    ${charElements.join("\n")}
  </svg>`;
}

export async function createCaptchaChallenge(): Promise<{
  challengeId: string;
  svg: string;
}> {
  const challengeId = crypto.randomUUID();
  const code = generateRandomCode();
  const salt = crypto.randomBytes(16).toString("hex");
  const hashedAnswer = hashAnswer(salt, code);
  const expiresAt = new Date(Date.now() + CHALLENGE_TTL_MS);

  // Store in MongoDB
  const conn = await connectDB();
  if (conn) {
    try {
      await CaptchaChallenge.create({
        challengeId,
        hashedAnswer,
        salt,
        expiresAt,
        attempts: 0,
      });
    } catch (err) {
      console.error("[captcha] Failed to persist challenge to MongoDB, falling back to memory:", err);
      memoryChallenges.set(challengeId, {
        challengeId,
        hashedAnswer,
        salt,
        attempts: 0,
        expiresAt: expiresAt.getTime(),
      });
    }
  } else {
    memoryChallenges.set(challengeId, {
      challengeId,
      hashedAnswer,
      salt,
      attempts: 0,
      expiresAt: expiresAt.getTime(),
    });
  }

  const svg = generateCaptchaSvg(code);

  return {
    challengeId,
    svg,
  };
}

export async function verifyCaptchaChallenge(
  challengeId: string | undefined,
  userAnswer: string | undefined,
  clientIp: string = "unknown"
): Promise<{ success: boolean; error?: string }> {
  // Rate-limiting check by IP
  const now = Date.now();
  const ipEntry = ipFailedAttempts.get(clientIp);
  if (ipEntry && ipEntry.resetAt > now && ipEntry.count >= MAX_FAILED_PER_IP) {
    return {
      success: false,
      error: "Too many failed attempts. Please wait 5 minutes before trying again.",
    };
  }

  function recordFailure() {
    const existing = ipFailedAttempts.get(clientIp);
    if (!existing || existing.resetAt <= now) {
      ipFailedAttempts.set(clientIp, { count: 1, resetAt: now + IP_LOCKOUT_MS });
    } else {
      existing.count += 1;
    }
  }

  if (!challengeId || typeof challengeId !== "string" || !challengeId.trim()) {
    recordFailure();
    return { success: false, error: "CAPTCHA challenge is missing." };
  }

  if (!userAnswer || typeof userAnswer !== "string" || !userAnswer.trim()) {
    recordFailure();
    return { success: false, error: "Please enter the CAPTCHA characters." };
  }

  const normalizedInput = userAnswer.trim().toUpperCase();

  const conn = await connectDB();
  let challenge: { hashedAnswer: string; salt: string; attempts: number; expiresAt: Date | number } | null = null;
  let isMongo = false;

  if (conn) {
    try {
      const doc = await CaptchaChallenge.findOne({ challengeId });
      if (doc) {
        challenge = doc;
        isMongo = true;
      }
    } catch (dbErr) {
      console.error("[captcha] Mongo read error, checking memory:", dbErr);
    }
  }

  if (!challenge) {
    const mem = memoryChallenges.get(challengeId);
    if (mem) {
      challenge = mem;
      isMongo = false;
    }
  }

  if (!challenge) {
    recordFailure();
    return {
      success: false,
      error: "CAPTCHA has expired or was already used. Please refresh and try again.",
    };
  }

  const expiryTime = challenge.expiresAt instanceof Date ? challenge.expiresAt.getTime() : challenge.expiresAt;
  if (expiryTime <= now) {
    // Expired
    if (isMongo) {
      await CaptchaChallenge.deleteOne({ challengeId }).catch(() => {});
    } else {
      memoryChallenges.delete(challengeId);
    }
    recordFailure();
    return {
      success: false,
      error: "CAPTCHA expired. Please click refresh to generate a new one.",
    };
  }

  // Check attempts
  if (challenge.attempts >= MAX_ATTEMPTS_PER_CHALLENGE) {
    if (isMongo) {
      await CaptchaChallenge.deleteOne({ challengeId }).catch(() => {});
    } else {
      memoryChallenges.delete(challengeId);
    }
    recordFailure();
    return {
      success: false,
      error: "Maximum CAPTCHA attempts exceeded. Please refresh for a new challenge.",
    };
  }

  // Compare hash
  const computedHash = hashAnswer(challenge.salt, normalizedInput);
  const isValid = crypto.timingSafeEqual(
    Buffer.from(computedHash, "hex"),
    Buffer.from(challenge.hashedAnswer, "hex")
  );

  if (!isValid) {
    // Increment attempts
    challenge.attempts += 1;
    if (isMongo) {
      await CaptchaChallenge.updateOne({ challengeId }, { $inc: { attempts: 1 } }).catch(() => {});
    }
    recordFailure();
    return {
      success: false,
      error: "Incorrect CAPTCHA answer. Please try again.",
    };
  }

  // Success: Invalidate challenge immediately (single-use)
  if (isMongo) {
    await CaptchaChallenge.deleteOne({ challengeId }).catch(() => {});
  } else {
    memoryChallenges.delete(challengeId);
  }

  // Clear or decrement failed attempts on success
  if (ipEntry) {
    ipFailedAttempts.delete(clientIp);
  }

  return { success: true };
}
