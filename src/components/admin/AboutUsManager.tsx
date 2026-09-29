"use client";

import { useState, useTransition } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  Plus,
  Trash2,
  Users,
  Award,
  BookOpen,
  Eye,
  Hash,
  Sparkles,
  ArrowRight,
  Info,
  Upload,
} from "lucide-react";
import {
  saveAboutContentAction,
  uploadTeamPhotoAction,
} from "@/app/admin/about/actions";
import type {
  AboutContentData,
  WhatWeStandForPoint,
  ByTheNumbersPoint,
  TeamMember,
} from "@/data/seed-about";

const inputClass =
  "w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none transition bg-white";

export function AboutUsManager({ initialContent }: { initialContent: AboutContentData }) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  // 1. About Us
  const [aboutUs, setAboutUs] = useState(initialContent.aboutUs);
  // 2. Our Story
  const [ourStory, setOurStory] = useState(initialContent.ourStory);
  // 3. Our Vision
  const [ourVision, setOurVision] = useState(initialContent.ourVision);
  // 4. The Name
  const [theName, setTheName] = useState(initialContent.theName);
  // 5. What We Stand For (3 points: Trust, Ownership, Craft)
  const [whatWeStandFor, setWhatWeStandFor] = useState<WhatWeStandForPoint[]>(
    initialContent.whatWeStandFor || []
  );
  // 6. By the Numbers (2 points)
  const [byTheNumbers, setByTheNumbers] = useState<ByTheNumbersPoint[]>(
    initialContent.byTheNumbers || []
  );
  // 7. The Team (3 entries)
  const [theTeam, setTheTeam] = useState<TeamMember[]>(initialContent.theTeam || []);
  // 8. Closing CTA
  const [closingCta, setClosingCta] = useState(initialContent.closingCta);

  // Navigation tab
  const [activeTab, setActiveTab] = useState<
    "aboutUs" | "ourStory" | "ourVision" | "theName" | "standFor" | "numbers" | "team" | "cta"
  >("aboutUs");

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    window.setTimeout(() => setMessage(null), 5000);
  };

  // Dynamic handlers for What We Stand For
  const addStandForPoint = () => {
    setWhatWeStandFor((prev) => [
      ...prev,
      { point: "" },
    ]);
  };

  const updateStandForPoint = (index: number, point: string) => {
    setWhatWeStandFor((prev) =>
      prev.map((item, i) => (i === index ? { ...item, point } : item))
    );
  };

  const removeStandForPoint = (index: number) => {
    setWhatWeStandFor((prev) => prev.filter((_, i) => i !== index));
  };

  // Dynamic handlers for By The Numbers
  const addNumberPoint = () => {
    setByTheNumbers((prev) => [
      ...prev,
      { point: "" },
    ]);
  };

  const updateNumberPoint = (index: number, point: string) => {
    setByTheNumbers((prev) =>
      prev.map((item, i) => (i === index ? { ...item, point } : item))
    );
  };

  const removeNumberPoint = (index: number) => {
    setByTheNumbers((prev) => prev.filter((_, i) => i !== index));
  };

  // Dynamic handlers for Team Members
  const addTeamMember = () => {
    setTheTeam((prev) => [
      ...prev,
      {
        name: "",
        role: "",
        bio: "",
        image: "",
      },
    ]);
  };

  const updateTeamMember = (index: number, patch: Partial<TeamMember>) => {
    setTheTeam((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  const removeTeamMember = (index: number) => {
    if (!window.confirm("Are you sure you want to remove this team member?")) return;
    setTheTeam((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePhotoUpload = async (index: number, file: File) => {
    setUploadingIndex(index);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadTeamPhotoAction(fd);
      if (res.success && res.url) {
        updateTeamMember(index, { image: res.url });
        showMessage("success", "Photo uploaded successfully. Save to persist changes.");
      } else {
        showMessage("error", res.error || "Failed to upload photo.");
      }
    } catch {
      showMessage("error", "Error uploading photo.");
    } finally {
      setUploadingIndex(null);
    }
  };

  // Save action
  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveAboutContentAction({
        aboutUs,
        ourStory,
        ourVision,
        theName,
        whatWeStandFor,
        byTheNumbers,
        theTeam,
        closingCta,
      });

      if (res.success) {
        showMessage("success", res.message || "About Us content saved.");
      } else {
        showMessage("error", res.error || "Failed to save About Us content.");
      }
    });
  };

  const tabs = [
    { id: "aboutUs", label: "1. About Us", icon: Info },
    { id: "ourStory", label: "2. Our Story", icon: BookOpen },
    { id: "ourVision", label: "3. Our Vision", icon: Eye },
    { id: "theName", label: "4. The Name", icon: Sparkles },
    { id: "standFor", label: "5. What We Stand For", icon: Award, count: whatWeStandFor.length },
    { id: "numbers", label: "6. By the Numbers", icon: Hash, count: byTheNumbers.length },
    { id: "team", label: "7. The Team", icon: Users, count: theTeam.length },
    { id: "cta", label: "8. Closing CTA", icon: ArrowRight },
  ] as const;

  return (
    <div className="w-full max-w-7xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold text-navy">About Us Editor</h1>
          <p className="mt-1 text-sm text-muted">
            Manage the official 8 sections of About Us matching your exact provided document.
          </p>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-2.5 text-xs font-semibold text-white hover:bg-accent-hover shadow-xs transition disabled:opacity-50 cursor-pointer self-start sm:self-auto"
        >
          {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          <span>{isPending ? "Saving changes..." : "Save About Us"}</span>
        </button>
      </div>

      {/* Alert Banner */}
      {message ? (
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3.5 text-xs font-medium border shadow-xs ${
            message.type === "success"
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
          <button
            type="button"
            onClick={() => setMessage(null)}
            className="text-slate-400 hover:text-slate-600 transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2.5 text-xs font-semibold rounded-xl transition cursor-pointer border ${
                isActive
                  ? "bg-navy text-white border-navy shadow-xs"
                  : "bg-surface-elevated text-slate-600 border-border hover:bg-surface hover:text-navy"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-highlight" : "text-slate-400"}`} />
              <span>{tab.label}</span>
              {"count" in tab && (
                <span
                  className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <form onSubmit={onSave} className="space-y-6">
        {/* 1. ABOUT US */}
        {activeTab === "aboutUs" && (
          <Section icon={Info} title="1. About Us">
            <Field label="Section Title">
              <input
                className={inputClass}
                value={aboutUs.title}
                onChange={(e) => setAboutUs({ ...aboutUs, title: e.target.value })}
                placeholder="About Us"
              />
            </Field>
            <Field label="Description">
              <textarea
                className={inputClass}
                rows={4}
                value={aboutUs.description}
                onChange={(e) => setAboutUs({ ...aboutUs, description: e.target.value })}
                placeholder="Renamed from “Who We Are” and moved towards the end of the navigation..."
              />
            </Field>
          </Section>
        )}

        {/* 2. OUR STORY */}
        {activeTab === "ourStory" && (
          <Section icon={BookOpen} title="2. Our Story">
            <Field label="Section Title">
              <input
                className={inputClass}
                value={ourStory.title}
                onChange={(e) => setOurStory({ ...ourStory, title: e.target.value })}
                placeholder="Our Story"
              />
            </Field>
            <Field label="Story Paragraph">
              <textarea
                className={inputClass}
                rows={6}
                value={ourStory.content}
                onChange={(e) => setOurStory({ ...ourStory, content: e.target.value })}
                placeholder="Vertara Global was founded by GCC builders, not GCC advisors..."
              />
            </Field>
          </Section>
        )}

        {/* 3. OUR VISION */}
        {activeTab === "ourVision" && (
          <Section icon={Eye} title="3. Our Vision">
            <Field label="Section Title">
              <input
                className={inputClass}
                value={ourVision.title}
                onChange={(e) => setOurVision({ ...ourVision, title: e.target.value })}
                placeholder="Our Vision"
              />
            </Field>
            <Field label="Vision Statement">
              <textarea
                className={inputClass}
                rows={4}
                value={ourVision.statement}
                onChange={(e) => setOurVision({ ...ourVision, statement: e.target.value })}
                placeholder="To be the most trusted partner for organizations building Global Capability Centres..."
              />
            </Field>
          </Section>
        )}

        {/* 4. THE NAME */}
        {activeTab === "theName" && (
          <Section icon={Sparkles} title="4. The Name">
            <Field label="Section Title">
              <input
                className={inputClass}
                value={theName.title}
                onChange={(e) => setTheName({ ...theName, title: e.target.value })}
                placeholder="The Name"
              />
            </Field>
            <Field label="Paragraph">
              <textarea
                className={inputClass}
                rows={4}
                value={theName.paragraph}
                onChange={(e) => setTheName({ ...theName, paragraph: e.target.value })}
                placeholder="Vertara draws on Vertex — the summit, the highest point of capability — and Tara, the Sanskrit word for star, guide, and “to cross over.” Together: the guiding summit, a partner that leads organizations to the peak of their GCC ambition."
              />
            </Field>
          </Section>
        )}

        {/* 5. WHAT WE STAND FOR (Exactly 3 Points) */}
        {activeTab === "standFor" && (
          <Section
            icon={Award}
            title="5. What We Stand For (Exactly 3 Points: Trust, Ownership, Craft)"
            action={
              <button
                type="button"
                onClick={addStandForPoint}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-accent hover:border-accent transition cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add Point
              </button>
            }
          >
            {whatWeStandFor.length === 0 ? (
              <p className="text-xs text-muted italic py-4">No points added yet. Click &quot;Add Point&quot; above.</p>
            ) : (
              <div className="space-y-4">
                {whatWeStandFor.map((item, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl border border-border bg-surface p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">
                        Point #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeStandForPoint(index)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-slate-400 hover:border-red-200 hover:text-red-600 transition cursor-pointer"
                        title="Delete point"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <Field label="Point">
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={item.point}
                        onChange={(e) => updateStandForPoint(index, e.target.value)}
                        placeholder="e.g. Trust — transparent scoping, milestone-based terms, no silent scope creep."
                      />
                    </Field>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* 6. BY THE NUMBERS (Exactly 2 Points) */}
        {activeTab === "numbers" && (
          <Section
            icon={Hash}
            title="6. By the Numbers (Exactly 2 Points)"
            action={
              <button
                type="button"
                onClick={addNumberPoint}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-accent hover:border-accent transition cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add Point
              </button>
            }
          >
            {byTheNumbers.length === 0 ? (
              <p className="text-xs text-muted italic py-4">No points added yet. Click &quot;Add Point&quot; above.</p>
            ) : (
              <div className="space-y-4">
                {byTheNumbers.map((item, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl border border-border bg-surface p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">
                        Point #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeNumberPoint(index)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-slate-400 hover:border-red-200 hover:text-red-600 transition cursor-pointer"
                        title="Delete point"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <Field label="Point">
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={item.point}
                        onChange={(e) => updateNumberPoint(index, e.target.value)}
                        placeholder="e.g. 50+ years of combined GCC experience across the founding team"
                      />
                    </Field>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* 7. THE TEAM (Namit, Neha, Joining the Team) */}
        {activeTab === "team" && (
          <Section
            icon={Users}
            title="7. The Team (Namit, Neha, Joining the Team)"
            action={
              <button
                type="button"
                onClick={addTeamMember}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-accent hover:border-accent transition cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add Team Member
              </button>
            }
          >
            {theTeam.length === 0 ? (
              <p className="text-xs text-muted italic py-4">No team members added yet. Click &quot;Add Team Member&quot; above.</p>
            ) : (
              <div className="space-y-6">
                {theTeam.map((member, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl border border-border bg-surface p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div>
                        <p className="font-bold text-navy text-sm">{member.name || `Member #${index + 1}`}</p>
                        <p className="text-[11px] text-muted">{member.role || "Role (Optional)"}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeTeamMember(index)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-slate-400 hover:border-red-200 hover:text-red-600 transition cursor-pointer"
                        title="Delete team member"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Name">
                        <input
                          className={inputClass}
                          value={member.name}
                          onChange={(e) => updateTeamMember(index, { name: e.target.value })}
                          placeholder="e.g. Namit Ganjisinghani"
                        />
                      </Field>
                      <Field label="Role (Optional)">
                        <input
                          className={inputClass}
                          value={member.role}
                          onChange={(e) => updateTeamMember(index, { role: e.target.value })}
                          placeholder="e.g. Co-Founder, Former Big 4 Partner"
                        />
                      </Field>
                    </div>

                    {/* Photo Upload / URL field */}
                    <Field
                      label="Photo (Optional)"
                      hint="Paste an image URL or upload a file (JPG, PNG, WEBP, GIF up to 5MB)."
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="relative flex-1">
                          <input
                            className={inputClass}
                            value={member.image || ""}
                            onChange={(e) => updateTeamMember(index, { image: e.target.value })}
                            placeholder="Paste photo URL or click Upload Photo"
                          />
                        </div>

                        <label
                          className={`inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-navy hover:border-accent hover:text-accent transition shadow-xs cursor-pointer shrink-0 ${
                            uploadingIndex === index ? "opacity-60 pointer-events-none" : ""
                          }`}
                        >
                          {uploadingIndex === index ? (
                            <Loader2 className="h-4 w-4 animate-spin text-accent" />
                          ) : (
                            <Upload className="h-4 w-4 text-accent" />
                          )}
                          <span>{uploadingIndex === index ? "Uploading..." : "Upload Photo"}</span>
                          <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp,image/gif"
                            className="hidden"
                            disabled={uploadingIndex === index}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void handlePhotoUpload(index, file);
                              e.target.value = "";
                            }}
                          />
                        </label>
                      </div>

                      {member.image ? (
                        <div className="mt-3 flex items-center gap-3 p-2.5 rounded-xl bg-white border border-border w-fit shadow-2xs">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={member.image}
                            alt={member.name || "Team member preview"}
                            className="h-12 w-12 rounded-lg object-cover border border-border"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).style.display = "none";
                            }}
                          />
                          <div className="text-left pr-2">
                            <p className="text-[11px] font-semibold text-navy truncate max-w-[220px]">
                              {member.image.split("/").pop() || "Photo preview"}
                            </p>
                            <button
                              type="button"
                              onClick={() => updateTeamMember(index, { image: "" })}
                              className="text-[11px] text-red-600 hover:underline cursor-pointer font-medium"
                            >
                              Remove photo
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </Field>

                    <Field label="Bio">
                      <textarea
                        className={inputClass}
                        rows={5}
                        value={member.bio}
                        onChange={(e) => updateTeamMember(index, { bio: e.target.value })}
                        placeholder="Exact founder bio or practice description..."
                      />
                    </Field>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* 8. CLOSING CTA */}
        {activeTab === "cta" && (
          <Section icon={ArrowRight} title="8. Closing CTA">
            <Field label="Closing CTA Text">
              <textarea
                className={inputClass}
                rows={3}
                value={closingCta.text}
                onChange={(e) => setClosingCta({ ...closingCta, text: e.target.value })}
                placeholder="Let’s build the right GCC — and build it to last."
              />
            </Field>
          </Section>
        )}

        {/* Bottom Save Action */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 rounded-xl bg-accent px-8 py-3 text-xs font-semibold text-white hover:bg-accent-hover shadow-xs transition disabled:opacity-50 cursor-pointer"
          >
            {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            <span>Save About Us Content</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function Section({
  icon: Icon,
  title,
  action,
  children,
}: {
  icon: React.ElementType;
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="flex items-center gap-2 text-base font-bold text-navy">
          <Icon className="h-5 w-5 text-accent" />
          <span>{title}</span>
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-navy">{label}</label>
      {hint ? <p className="mb-1.5 text-[11px] text-muted">{hint}</p> : null}
      {children}
    </div>
  );
}
