import { getSettings } from "@/lib/content";
import { HeroManager } from "@/components/admin/HeroManager";

export const metadata = {
  title: "Hero Section | Vertara Global Admin",
};

export default async function AdminHeroPage() {
  const settings = await getSettings();

  return <HeroManager initialSettings={settings} />;
}
