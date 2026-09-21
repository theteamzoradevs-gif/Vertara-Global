import { connectDB } from "@/lib/db";
import { Faq } from "@/models/Faq";
import { seedFaqs } from "@/data/seed-content";
import { FaqsManager } from "@/components/admin/FaqsManager";

export const metadata = {
  title: "FAQs Management | Vertara Global Admin",
};

export default async function AdminFaqsPage() {
  const conn = await connectDB();
  let faqs = [];

  if (conn) {
    const docs = await Faq.find().sort({ order: 1 }).lean();
    if (docs.length > 0) {
      faqs = JSON.parse(JSON.stringify(docs));
    } else {
      faqs = seedFaqs.map((s, idx) => ({
        _id: `seed-${idx}`,
        ...s,
      }));
    }
  } else {
    faqs = seedFaqs.map((s, idx) => ({
      _id: `seed-${idx}`,
      ...s,
    }));
  }

  return <FaqsManager initialFaqs={faqs} />;
}
