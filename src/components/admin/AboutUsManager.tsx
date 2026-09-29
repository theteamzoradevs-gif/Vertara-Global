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
} from "lucide-react";
import { saveAboutContentAction } from "@/app/admin/about/actions";
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
      { title: "", description: "" },
    ]);
  };

  const updateStandForPoint = (index: number, patch: Partial<WhatWeStandForPoint>) => {
    setWhatWeStandFor((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  const removeStandForPoint = (index: number) => {
    setWhatWeStandFor((prev) => prev.filter((_, i) => i !== index));
  };

  // Dynamic handlers for By The Numbers
  const addNumberPoint = () => {
    const nextNum = String(byTheNumbers.length + 1).padStart(2, "0");
    setByTheNumbers((prev) => [
      ...prev,
      { number: nextNum, title: "", description: "" },
    ]);
  };

  const updateNumberPoint = (index: number, patch: Partial<ByTheNumbersPoint>) => {
    setByTheNumbers((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  const removeNumberPoint = (index: number) => {
    setByTheNumbers((prev) => prev.filter((_, i) => i !== index));
  };

  // Dynamic handlers for Team Members (Only Name, Role, Bio)
  const addTeamMember = () => {
    setTheTeam((prev) => [
      ...prev,
      {
        name: "",
        role: "",
        bio: "",
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
            Manage the official 8 sections of About Us matching your exact provided content.
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
            <Field label="Title">
              <input
                className={inputClass}
                value={aboutUs.title}
                onChange={(e) => setAboutUs({ ...aboutUs, title: e.target.value })}
                placeholder="About Us"
              />
            </Field>
            <Field label="Content">
              <textarea
                className={inputClass}
                rows={5}
                value={aboutUs.content}
                onChange={(e) => setAboutUs({ ...aboutUs, content: e.target.value })}
                placeholder="To be the most trusted partner for organizations building Global Capability Centres that create real enterprise value."
              />
            </Field>
          </Section>
        )}

        {/* 2. OUR STORY */}
        {activeTab === "ourStory" && (
          <Section icon={BookOpen} title="2. Our Story">
            <Field label="Title">
              <input
                className={inputClass}
                value={ourStory.title}
                onChange={(e) => setOurStory({ ...ourStory, title: e.target.value })}
                placeholder="Our Story"
              />
            </Field>
            <Field label="Story Content">
              <textarea
                className={inputClass}
                rows={6}
                value={ourStory.content}
                onChange={(e) => setOurStory({ ...ourStory, content: e.target.value })}
                placeholder="Vertara Global was founded by operators who have built and scaled..."
              />
            </Field>
          </Section>
        )}

        {/* 3. OUR VISION */}
        {activeTab === "ourVision" && (
          <Section icon={Eye} title="3. Our Vision">
            <Field label="Title">
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
                placeholder="To be the most trusted partner for organizations building Global Capability Centres that create real enterprise value."
              />
            </Field>
          </Section>
        )}

        {/* 4. THE NAME */}
        {activeTab === "theName" && (
          <Section icon={Sparkles} title="4. The Name">
            <Field label="Title">
              <input
                className={inputClass}
                value={theName.title}
                onChange={(e) => setTheName({ ...theName, title: e.target.value })}
                placeholder="The Name"
              />
            </Field>
            <Field label="Meaning">
              <textarea
                className={inputClass}
                rows={3}
                value={theName.meaning}
                onChange={(e) => setTheName({ ...theName, meaning: e.target.value })}
                placeholder="Vertara draws from Vertex, the summit, the highest point of capability and Tara, the Sanskrit word for star, guide and to cross over."
              />
            </Field>
            <Field label="Description">
              <textarea
                className={inputClass}
                rows={3}
                value={theName.description}
                onChange={(e) => setTheName({ ...theName, description: e.target.value })}
                placeholder="Together: The guiding summit, a partner that leads organizations to the peak of their GCC ambition."
              />
            </Field>
          </Section>
        )}

        {/* 5. WHAT WE STAND FOR (3 Points: Trust, Ownership, Craft) */}
        {activeTab === "standFor" && (
          <Section
            icon={Award}
            title="5. What We Stand For (Trust, Ownership, Craft)"
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
                {whatWeStandFor.map((point, index) => (
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

                    <Field label="Point Name">
                      <input
                        className={inputClass}
                        value={point.title}
                        onChange={(e) => updateStandForPoint(index, { title: e.target.value })}
                        placeholder="e.g. Trust"
                      />
                    </Field>

                    <Field label="Description (Optional)">
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={point.description || ""}
                        onChange={(e) =>
                          updateStandForPoint(index, { description: e.target.value })
                        }
                        placeholder="Description if applicable..."
                      />
                    </Field>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* 6. BY THE NUMBERS (2 Points) */}
        {activeTab === "numbers" && (
          <Section
            icon={Hash}
            title="6. By the Numbers (2 Points)"
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
                {byTheNumbers.map((point, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl border border-border bg-surface p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">
                        Stat #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeNumberPoint(index)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-slate-400 hover:border-red-200 hover:text-red-600 transition cursor-pointer"
                        title="Delete stat point"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-[100px_1fr]">
                      <Field label="Number">
                        <input
                          className={inputClass}
                          value={point.number}
                          onChange={(e) => updateNumberPoint(index, { number: e.target.value })}
                          placeholder="01 or 02"
                        />
                      </Field>
                      <Field label="Title">
                        <input
                          className={inputClass}
                          value={point.title}
                          onChange={(e) => updateNumberPoint(index, { title: e.target.value })}
                          placeholder="e.g. Founded by GCC builders"
                        />
                      </Field>
                    </div>

                    <Field label="Description">
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={point.description}
                        onChange={(e) =>
                          updateNumberPoint(index, { description: e.target.value })
                        }
                        placeholder="Detail explaining this credibility metric..."
                      />
                    </Field>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* 7. THE TEAM (3 Entries - Name, Role, Bio only) */}
        {activeTab === "team" && (
          <Section
            icon={Users}
            title="7. The Team (3 Entries)"
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
                        <p className="text-[11px] text-muted">{member.role || "Role not set"}</p>
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
                          placeholder="e.g. Neha"
                        />
                      </Field>
                      <Field label="Role">
                        <input
                          className={inputClass}
                          value={member.role}
                          onChange={(e) => updateTeamMember(index, { role: e.target.value })}
                          placeholder="e.g. Co-Founder, Former Global Mining Director"
                        />
                      </Field>
                    </div>

                    <Field label="Bio">
                      <textarea
                        className={inputClass}
                        rows={4}
                        value={member.bio}
                        onChange={(e) => updateTeamMember(index, { bio: e.target.value })}
                        placeholder="Executive summary of experience..."
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
            <Field label="CTA Headline">
              <input
                className={inputClass}
                value={closingCta.title}
                onChange={(e) => setClosingCta({ ...closingCta, title: e.target.value })}
                placeholder="Let’s build the right GCC — and build it to last."
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Button Text">
                <input
                  className={inputClass}
                  value={closingCta.buttonText}
                  onChange={(e) => setClosingCta({ ...closingCta, buttonText: e.target.value })}
                  placeholder="Discuss your GCC mandate"
                />
              </Field>
              <Field label="Button Link">
                <input
                  className={inputClass}
                  value={closingCta.buttonLink}
                  onChange={(e) => setClosingCta({ ...closingCta, buttonLink: e.target.value })}
                  placeholder="/contact"
                />
              </Field>
            </div>
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
