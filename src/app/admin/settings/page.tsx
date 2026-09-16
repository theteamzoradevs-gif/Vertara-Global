import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/db";
import { SiteSettings } from "@/models/SiteSettings";
import { getSettings } from "@/lib/content";
import { Button } from "@/components/ui/Button";

async function saveSettings(formData: FormData) {
  "use server";
  const conn = await connectDB();
  if (!conn) return;
  await SiteSettings.findOneAndUpdate(
    {},
    {
      brandName: String(formData.get("brandName") || ""),
      tagline: String(formData.get("tagline") || ""),
      heroHeadline: String(formData.get("heroHeadline") || ""),
      heroSubheadline: String(formData.get("heroSubheadline") || ""),
      contactEmail: String(formData.get("contactEmail") || ""),
      contactPhone: String(formData.get("contactPhone") || ""),
      trustPopHeadline: String(formData.get("trustPopHeadline") || ""),
      aboutStory: String(formData.get("aboutStory") || ""),
      aboutMission: String(formData.get("aboutMission") || ""),
    },
    { upsert: true },
  );
  revalidatePath("/");
  revalidatePath("/about");
  revalidatePath("/contact");
}

export default async function AdminSettingsPage() {
  const settings = await getSettings();
  const conn = await connectDB();

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy">Site settings</h1>
      <p className="mt-1 text-sm text-muted">
        Brand, hero, contact, and trust-pop copy.
        {!conn ? " MongoDB offline — edits will not persist." : ""}
      </p>
      <form action={saveSettings} className="mt-6 max-w-2xl space-y-4">
        {(
          [
            ["brandName", "Brand name", settings.brandName],
            ["tagline", "Tagline", settings.tagline],
            ["heroHeadline", "Hero headline", settings.heroHeadline],
            ["heroSubheadline", "Hero subheadline", settings.heroSubheadline],
            ["contactEmail", "Contact email", settings.contactEmail],
            ["contactPhone", "Contact phone", settings.contactPhone],
            ["trustPopHeadline", "Trust pop headline", settings.trustPopHeadline],
          ] as const
        ).map(([name, label, value]) => (
          <div key={name}>
            <label className="mb-1.5 block text-sm font-medium text-navy">{label}</label>
            {name.includes("headline") && name !== "trustPopHeadline" && name !== "heroHeadline" ? (
              <textarea
                name={name}
                defaultValue={value}
                rows={3}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            ) : name === "heroSubheadline" || name === "tagline" ? (
              <textarea
                name={name}
                defaultValue={value}
                rows={2}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            ) : (
              <input
                name={name}
                defaultValue={value}
                className="w-full rounded-lg border border-border px-3 py-2 text-sm"
              />
            )}
          </div>
        ))}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy">About story</label>
          <textarea
            name="aboutStory"
            defaultValue={settings.aboutStory}
            rows={5}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-navy">About mission</label>
          <textarea
            name="aboutMission"
            defaultValue={settings.aboutMission}
            rows={3}
            className="w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </div>
        <Button type="submit" disabled={!conn}>
          Save settings
        </Button>
      </form>
    </div>
  );
}
