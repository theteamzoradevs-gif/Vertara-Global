import { auth, signOut } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}

async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // If unauthenticated (e.g. login page), render bare children without sidebar
  if (!session?.user) {
    return <>{children}</>;
  }

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/admin/login" });
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f7f9fc]">
      {/* Sidebar Navigation */}
      <AdminSidebar
        userEmail={session.user.email}
        signOutAction={handleSignOut}
      />

      {/* Main Content Container */}
      <div className="flex flex-1 flex-col min-w-0">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

