import { getAboutContent } from "@/lib/content";
import { AboutUsManager } from "@/components/admin/AboutUsManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us Editor | Vertara Global Admin",
  description: "Manage About Us page content, vision, story, team members and pillars.",
};

export default async function AdminAboutPage() {
  const aboutContent = await getAboutContent();

  return <AboutUsManager initialContent={aboutContent} />;
}
