import { getSettings, getFaqs } from "@/lib/content";
import { HeroManager } from "@/components/admin/HeroManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Home Editor | Vertara Global Admin",
};

export default async function AdminHeroPage() {
  const [settings, faqs] = await Promise.all([
    getSettings(),
    getFaqs(),
  ]);

  return <HeroManager initialSettings={settings} initialFaqs={faqs} />;
}

