import { connectDB } from "@/lib/db";
import { getSettings } from "@/lib/content";
import { auth } from "@/lib/auth";
import { AdminSettingsManager } from "@/components/admin/AdminSettingsManager";

export const metadata = {
  title: "Settings & Security | Vertara Global Admin",
};

export default async function AdminSettingsPage() {
  const session = await auth();
  const settings = await getSettings();
  const conn = await connectDB();

  // Ensure default brand name & contact email are sanitized if DB has old seed defaults
  if (!settings.brandName || settings.brandName === "GCC Advisor" || settings.brandName.toLowerCase().includes("veratara")) {
    settings.brandName = "Vertara Global";
  } else {
    settings.brandName = settings.brandName.replace(/veratara/gi, "Vertara");
  }
  if (!settings.contactEmail || settings.contactEmail === "hello@gccadvisor.com" || settings.contactEmail === "hello@vertaraglobal.com" || settings.contactEmail.toLowerCase().includes("veratara")) {
    settings.contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "Namitg@vertaraglobal.com";
  } else {
    settings.contactEmail = settings.contactEmail.replace(/veratara/gi, "vertara");
  }
  if (settings.aboutStory) {
    settings.aboutStory = settings.aboutStory.replace(/GCC Advisor/g, "Vertara Global").replace(/veratara/gi, "Vertara");
  }

  return (
    <AdminSettingsManager
      initialSettings={settings}
      isDbConnected={Boolean(conn)}
      userEmail={session?.user?.email}
    />
  );
}
