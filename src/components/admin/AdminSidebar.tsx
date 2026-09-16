"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  MessageSquare,
  FileText,
  HelpCircle,
  Quote,
  FolderGit2,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  Shield,
  User,
} from "lucide-react";

interface AdminSidebarProps {
  userEmail?: string | null;
  signOutAction: () => Promise<void>;
}

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
      { href: "/admin/leads", label: "Leads Inbox", icon: Inbox },
      { href: "/admin/chat-sessions", label: "Chat Sessions", icon: MessageSquare },
    ],
  },
  {
    title: "CMS Content",
    items: [
      { href: "/admin/insights", label: "Insights", icon: FileText },
      { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
      { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
      { href: "/admin/case-studies", label: "Case Studies", icon: FolderGit2 },
    ],
  },
  {
    title: "System",
    items: [
      { href: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

export function AdminSidebar({ userEmail, signOutAction }: AdminSidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between bg-[#061526] text-white">
      {/* Brand Header */}
      <div>
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-white shadow-xs">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <span className="font-bold tracking-tight text-white text-base">Veratara Global</span>
              <p className="text-[11px] text-white/50">Admin Panel</p>
            </div>
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="rounded-lg p-1.5 text-white/60 hover:bg-white/10 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation List */}
        <div className="custom-scrollbar overflow-y-auto px-4 py-6 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-white/40">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                        isActive
                          ? "bg-accent/15 text-highlight shadow-sm shadow-accent/10 border border-accent/25"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-r-full bg-highlight shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                      )}
                      <Icon
                        className={`h-4 w-4 transition-transform duration-150 group-hover:scale-110 ${
                          isActive ? "text-highlight" : "text-white/50 group-hover:text-white"
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer / User Profile & Actions */}
      <div className="border-t border-white/10 p-4 space-y-3 bg-[#040e1a]">
        {/* User Card */}
        <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3 border border-white/5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-highlight">
            <User className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-white">
              {userEmail || "Admin User"}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div>
          <form action={signOutAction}>
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs font-medium text-red-300 transition hover:bg-red-500/20 hover:text-red-200"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign out</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Bar Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-[#061526] px-4 py-3 text-white md:hidden">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
            <Shield className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm tracking-tight">Veratara Global Admin</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg border border-white/10 p-2 text-white/80 hover:bg-white/10"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop Persistent Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-white/10 md:flex min-h-screen shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative z-10 w-72 max-w-[80vw] shadow-2xl">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
