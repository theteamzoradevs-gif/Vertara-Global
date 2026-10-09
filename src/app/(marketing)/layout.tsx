import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { getSettings } from "@/lib/content";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader brandName={settings.brandName} />
      <main className="flex-1">{children}</main>
      <SiteFooter
        brandName={settings.brandName}
        email={settings.contactEmail}
        phone={settings.contactPhone}
      />
    </>
  );
}
