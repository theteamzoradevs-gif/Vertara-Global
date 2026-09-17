import { connectDB } from "@/lib/db";
import { CaseStudy } from "@/models/CaseStudy";
import { seedCaseStudies } from "@/data/seed-content";
import {
  CaseStudiesManager,
  CaseStudyItemData,
} from "@/components/admin/CaseStudiesManager";

export const metadata = {
  title: "Case Studies Management | Veratara Global Admin",
};

export default async function AdminCaseStudiesPage() {
  const conn = await connectDB();
  let cases: CaseStudyItemData[] = [];

  if (conn) {
    try {
      const docs = await CaseStudy.find().lean();
      if (docs.length > 0) {
        cases = JSON.parse(JSON.stringify(docs));
      } else {
        cases = seedCaseStudies.map((s, idx) => ({
          _id: `seed-${idx}`,
          ...s,
        }));
      }
    } catch {
      cases = seedCaseStudies.map((s, idx) => ({
        _id: `seed-${idx}`,
        ...s,
      }));
    }
  } else {
    cases = seedCaseStudies.map((s, idx) => ({
      _id: `seed-${idx}`,
      ...s,
    }));
  }

  return <CaseStudiesManager initialCaseStudies={cases} isDbConnected={!!conn} />;
}
