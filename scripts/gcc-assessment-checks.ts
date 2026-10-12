import assert from "node:assert/strict";
import { addBusinessDays } from "../src/lib/business-days";
import { assessmentNotificationText, leadNotificationText } from "../src/lib/founder-notification";
import { formatAssessmentAnswer, normalizeAssessmentAnswers } from "../src/lib/gcc-assessment";
import { sendFounderEmail, smtpConfigured } from "../src/lib/mail";

const answers = Array.from({ length: 12 }, (_, index) => ({
  question: `Question ${index + 1}`,
  answer: index === 1 ? ["Alpha", "Beta"] : `Answer ${index + 1}`,
}));

const normalized = normalizeAssessmentAnswers(answers);
assert.equal(normalized.length, 12);
assert.equal(formatAssessmentAnswer(normalized[1].answer), "Alpha, Beta");
assert.equal(normalized[0].question, "Question 1");

assert.throws(() => normalizeAssessmentAnswers(answers.slice(0, 11)));
assert.throws(() =>
  normalizeAssessmentAnswers(
    answers.map((row, index) => (index === 3 ? { ...row, answer: "  " } : row)),
  ),
);

const friday = new Date("2026-10-09T06:30:00.000Z");
const tuesday = addBusinessDays(friday, 2);
assert.equal(tuesday.toISOString(), "2026-10-13T06:30:00.000Z");
assert.equal(addBusinessDays(new Date("2026-10-10T06:30:00.000Z"), 2).toISOString(), "2026-10-13T06:30:00.000Z");
assert.equal(addBusinessDays(new Date("2026-10-11T06:30:00.000Z"), 2).toISOString(), "2026-10-13T06:30:00.000Z");
assert.equal(addBusinessDays(new Date("2026-10-08T06:30:00.000Z"), 2).toISOString(), "2026-10-12T06:30:00.000Z");

const leadText = leadNotificationText({
  _id: "abc123",
  name: "Ada",
  company: "Example Co",
  email: "ada@example.com",
  createdAt: friday,
});
assert.match(leadText, /Submission type: Lead/);
assert.match(leadText, /Name: Ada/);
assert.match(leadText, /Company: Example Co/);
assert.match(leadText, /Email: ada@example.com/);
assert.match(leadText, /\/admin\/inquiries\?id=abc123/);

const assessmentText = assessmentNotificationText({
  _id: "def456",
  name: "Ada",
  company: "Example Co",
  email: "ada@example.com",
  createdAt: friday,
});
assert.match(assessmentText, /Submission type: GCC Assessment/);
assert.match(assessmentText, /\/admin\/gcc-assessment\?id=def456/);

async function main() {
  delete process.env.SMTP_HOST;
  delete process.env.SMTP_FROM;
  delete process.env.FOUNDER_EMAIL;
  delete process.env.ADMIN_EMAIL;
  const mail = await sendFounderEmail({ subject: "Test", text: "Test" });
  assert.equal(mail.ok, false);
  if (!mail.ok) assert.match(mail.error, /SMTP is not configured/);
  console.log("gcc assessment checks passed");
}

main();
