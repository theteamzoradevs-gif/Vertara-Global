import { getFaqs } from "@/lib/content";
import { FaqsManager } from "@/components/admin/FaqsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FAQs Management | Vertara Global Admin",
};

export default async function AdminFaqsPage() {
  const faqs = await getFaqs();
  return <FaqsManager initialFaqs={faqs} />;
}
