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

  const ALLOWED_CATEGORIES = ["Home", "Our Offerings", "Insights", "About Us"];

  if (conn) {
    // Delete any old FAQs that do not belong to the 4 main categories
    await Faq.deleteMany({ category: { $nin: ALLOWED_CATEGORIES } });

    let docs = await Faq.find().sort({ order: 1 }).lean();
    if (docs.length === 0) {
      await Faq.insertMany(seedFaqs);
      docs = await Faq.find().sort({ order: 1 }).lean();
    }
    faqs = JSON.parse(JSON.stringify(docs));
  } else {
    faqs = seedFaqs.map((s, idx) => ({
      _id: `seed-${idx}`,
      ...s,
    }));
  }

  return <FaqsManager initialFaqs={faqs} />;
}
