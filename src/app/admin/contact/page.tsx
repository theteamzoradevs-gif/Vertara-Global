import { getContactContent } from "@/lib/content";
import { ContactManager } from "@/components/admin/ContactManager";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us Editor | Vertara Global Admin",
  description: "Manage Contact Us page copy, proposition, form headers, and direct contact details.",
};

export default async function AdminContactPage() {
  const contactContent = await getContactContent();

  return <ContactManager initialContent={contactContent} />;
}
