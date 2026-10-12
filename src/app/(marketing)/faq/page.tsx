import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { getFaqs } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "FAQ",
  description: "Questions about GCC basics, working with Vertara, time, cost, cities, and getting started.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();
  return <HomeFaqSection faqs={faqs} scope="all" />;
}
