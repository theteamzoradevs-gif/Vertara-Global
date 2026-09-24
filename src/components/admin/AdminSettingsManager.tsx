"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import {
  Save,
  KeyRound,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Building2,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
} from "lucide-react";
import {
  saveSiteSettingsAction,
  updateAdminPasswordAction,
} from "@/app/admin/settings/actions";
import type { Settings } from "@/lib/content/types";

interface AdminSettingsManagerProps {
  initialSettings: Settings;
  isDbConnected?: boolean;
  userEmail?: string | null;
}

export function AdminSettingsManager({
  initialSettings,
  userEmail,
}: AdminSettingsManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Password fields state
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveSiteSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await saveSiteSettingsAction(formData);
      if (res.success) {
        setMessage({ type: "success", text: res.message || "Site settings saved successfully!" });
      } else {
        setMessage({ type: "error", text: res.error || "Failed to save settings." });
      }
    });
  };

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateAdminPasswordAction(formData);
      if (res.success) {
        setMessage({ type: "success", text: res.message || "Password updated successfully!" });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setMessage({ type: "error", text: res.error || "Failed to update password." });
      }
    });
  };

  return (
    <div className="w-full max-w-7xl space-y-6">
      {/* Page Header */}
      <div className="border-b border-border pb-4">
        <h1 className="text-2xl font-bold text-navy">Settings & Security</h1>
      </div>

      {/* Alert Notification */}
      {message && (
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3.5 text-xs font-medium border shadow-xs ${message.type === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
            }`}
        >
          <div className="flex items-center gap-2.5">
            {message.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
            )}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600 transition">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* 2-Column Responsive Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* LEFT COLUMN: SITE INFORMATION */}
        <form
          onSubmit={handleSaveSiteSettings}
          className="rounded-2xl border border-border bg-surface-elevated p-6 md:p-8 shadow-xs space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-5">
            <div className="border-b border-border pb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-navy flex items-center gap-2">
                <Building2 className="h-5 w-5 text-accent" />
                <span>Site Information</span>
              </h2>
              <Link href="/admin/hero" className="text-[11px] font-semibold text-accent hover:underline">
                Open Home Editor →
              </Link>
            </div>

            {/* Brand Name */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">
                Brand Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="brandName"
                required
                defaultValue={initialSettings.brandName || "Vertara Global"}
                placeholder="e.g. Vertara Global"
                className="w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none transition"
              />
            </div>

            {/* Contact Email & Phone */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-muted" />
                  <span>Contact Email</span>
                </label>
                <input
                  type="email"
                  name="contactEmail"
                  defaultValue={initialSettings.contactEmail || "hello@verataraglobal.com"}
                  placeholder="hello@verataraglobal.com"
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1.5 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-muted" />
                  <span>Contact Phone</span>
                </label>
                <input
                  type="text"
                  name="contactPhone"
                  defaultValue={initialSettings.contactPhone || "+91 80 4000 1200"}
                  placeholder="+91 80 4000 1200"
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none transition"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-xs font-semibold text-white hover:bg-accent-hover shadow-xs transition disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>Save Site Settings</span>
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: CHANGE ADMIN PASSWORD */}
        <form
          onSubmit={handleUpdatePassword}
          className="rounded-2xl border border-border bg-surface-elevated p-6 md:p-8 shadow-xs space-y-6 flex flex-col justify-between"
        >
          <div className="space-y-5">
            <div className="border-b border-border pb-4 flex items-center justify-between">
              <h2 className="text-base font-bold text-navy flex items-center gap-2">
                <Lock className="h-5 w-5 text-accent" />
                <span>Change Admin Password</span>
              </h2>
              <div className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 border border-border text-[11px] font-medium text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                <span className="truncate max-w-[140px]">{userEmail || "admin@vertaraglobal.com"}</span>
              </div>
            </div>

            {/* Current Password */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">
                Current Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none pr-10 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy cursor-pointer transition"
                >
                  {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">
                New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none pr-10 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy cursor-pointer transition"
                >
                  {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label className="block text-xs font-semibold text-navy mb-1.5">
                Confirm New Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none pr-10 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-navy cursor-pointer transition"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <button
              type="submit"
              disabled={isPending}
              className="flex items-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-xs font-semibold text-white hover:bg-accent-hover shadow-xs transition disabled:opacity-50 cursor-pointer"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <KeyRound className="h-4 w-4" />
              )}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
