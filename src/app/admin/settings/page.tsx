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
  if (settings.brandName === "GCC Advisor") {
    settings.brandName = "Vertara Global";
  }
  if (settings.contactEmail === "hello@gccadvisor.com") {
    settings.contactEmail = "hello@verataraglobal.com";
  }
  if (settings.aboutStory?.includes("GCC Advisor")) {
    settings.aboutStory = settings.aboutStory.replace(/GCC Advisor/g, "Vertara Global");
  }

  return (
    <AdminSettingsManager
      initialSettings={settings}
      isDbConnected={Boolean(conn)}
      userEmail={session?.user?.email}
    />
  );
}
