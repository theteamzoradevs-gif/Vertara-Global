import { connectDB } from "@/lib/db";
import { GccAssessment } from "@/models/GccAssessment";
import {
  GccAssessmentsManager,
  type AssessmentListItem,
} from "@/components/admin/GccAssessmentsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "GCC Assessment | Vertara Global Admin",
};

export default async function AdminGccAssessmentPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const params = await searchParams;
  const conn = await connectDB();
  let assessments: AssessmentListItem[] = [];

  if (conn) {
    try {
      const docs = await GccAssessment.find().sort({ createdAt: -1 }).lean();
      assessments = JSON.parse(JSON.stringify(docs));
    } catch {
      assessments = [];
    }
  }

  return (
    <GccAssessmentsManager
      initialAssessments={assessments}
      isDbConnected={!!conn}
      initialOpenId={params.id}
    />
  );
}
