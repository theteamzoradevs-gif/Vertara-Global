"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export type AssessmentSubmitter = {
  name: string;
  email: string;
  company: string;
  role: string;
  businessContext: string;
};

const emptySubmitter: AssessmentSubmitter = {
  name: "",
  email: "",
  company: "",
  role: "",
  businessContext: "",
};

const AssessmentSubmitterContext = createContext<{
  submitter: AssessmentSubmitter;
  setSubmitter: (patch: Partial<AssessmentSubmitter>) => void;
} | null>(null);

export function AssessmentSubmitterProvider({ children }: { children: ReactNode }) {
  const [submitter, setSubmitterState] = useState<AssessmentSubmitter>(emptySubmitter);

  return (
    <AssessmentSubmitterContext.Provider
      value={{
        submitter,
        setSubmitter: (patch) => setSubmitterState((current) => ({ ...current, ...patch })),
      }}
    >
      {children}
    </AssessmentSubmitterContext.Provider>
  );
}

export function useAssessmentSubmitter() {
  const context = useContext(AssessmentSubmitterContext);
  if (!context) {
    throw new Error("Assessment contact details are unavailable.");
  }
  return context;
}
