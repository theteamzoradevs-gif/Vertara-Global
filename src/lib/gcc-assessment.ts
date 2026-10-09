export const GCC_ASSESSMENT_ANSWER_COUNT = 12;

export type StoredAssessmentAnswer = {
  question: string;
  answer: string | string[];
};

function cleanAnswer(value: unknown): string | string[] | null {
  if (Array.isArray(value)) {
    const items = value
      .map((item) => String(item ?? "").trim())
      .filter(Boolean);
    return items.length ? items : null;
  }
  if (typeof value === "string") {
    const text = value.trim();
    return text ? text : null;
  }
  return null;
}

/** Keep the submitted question wording. Reject anything other than 12 complete answers. */
export function normalizeAssessmentAnswers(input: unknown): StoredAssessmentAnswer[] {
  if (!Array.isArray(input) || input.length !== GCC_ASSESSMENT_ANSWER_COUNT) {
    throw new Error(`A GCC Assessment must include exactly ${GCC_ASSESSMENT_ANSWER_COUNT} answers.`);
  }

  return input.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`Answer ${index + 1} is missing.`);
    }
    const row = item as { question?: unknown; answer?: unknown };
    const question = String(row.question ?? "").trim();
    const answer = cleanAnswer(row.answer);
    if (!question || !answer) {
      throw new Error(`Question ${index + 1} needs its original wording and a complete answer.`);
    }
    return { question, answer };
  });
}

export function formatAssessmentAnswer(answer: string | string[]) {
  return Array.isArray(answer) ? answer.join(", ") : answer;
}
