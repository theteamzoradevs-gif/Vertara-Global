"use client";

import { useState, useTransition } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
  ImageIcon,
  Type,
  Plus,
  Trash2,
  Upload,
  Users,
  Compass,
  Award,
  BookOpen,
  Eye,
  Hash,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import {
  saveAboutContentAction,
  uploadAboutImageAction,
} from "@/app/admin/about/actions";
import type {
  AboutContentData,
  WhatWeStandForPoint,
  ByTheNumbersPoint,
  TeamMember,
} from "@/data/seed-about";

const inputClass =
  "w-full rounded-xl border border-border px-4 py-2.5 text-xs text-navy font-medium focus:border-accent focus:outline-none transition bg-white";

const ICONS = ["Layers", "Wrench", "LayoutGrid", "Compass", "Shield", "Target", "Users", "Award"];

export function AboutUsManager({ initialContent }: { initialContent: AboutContentData }) {
  const [isPending, startTransition] = useTransition();
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingTeamIdx, setUploadingTeamIdx] = useState<number | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 1. Intro
  const [intro, setIntro] = useState(initialContent.intro);
  // 2. Story
  const [story, setStory] = useState(initialContent.story);
  // 3. Vision
  const [vision, setVision] = useState(initialContent.vision);
  // 4. The Name
  const [theName, setTheName] = useState(initialContent.theName);
  // 5. What We Stand For
  const [whatWeStandFor, setWhatWeStandFor] = useState<WhatWeStandForPoint[]>(
    initialContent.whatWeStandFor || []
  );
  // 6. By the Numbers
  const [byTheNumbers, setByTheNumbers] = useState<ByTheNumbersPoint[]>(
    initialContent.byTheNumbers || []
  );
  // 7. The Team
  const [theTeam, setTheTeam] = useState<TeamMember[]>(initialContent.theTeam || []);
  // 8. Closing CTA
  const [closingCta, setClosingCta] = useState(initialContent.closingCta);

  // Active Tab for smooth navigation
  const [activeTab, setActiveTab] = useState<
    "intro" | "story" | "vision" | "theName" | "standFor" | "numbers" | "team" | "cta"
  >("intro");

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    window.setTimeout(() => setMessage(null), 5000);
  };

  // Upload hero image
  const onUploadHeroImage = async (file: File) => {
    setUploadingHero(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadAboutImageAction(fd);
      if (res.success && res.url) {
        setIntro((prev) => ({ ...prev, image: res.url! }));
        showMessage("success", "Intro image uploaded. Remember to save changes.");
      } else {
        showMessage("error", res.error || "Could not upload image.");
      }
    } catch {
      showMessage("error", "Could not upload image.");
    } finally {
      setUploadingHero(false);
    }
  };

  // Upload team member image
  const onUploadTeamImage = async (file: File, index: number) => {
    setUploadingTeamIdx(index);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await uploadAboutImageAction(fd);
      if (res.success && res.url) {
        setTheTeam((prev) =>
          prev.map((member, i) => (i === index ? { ...member, image: res.url! } : member))
        );
        showMessage("success", "Team member photo uploaded. Remember to save changes.");
      } else {
        showMessage("error", res.error || "Could not upload image.");
      }
    } catch {
      showMessage("error", "Could not upload image.");
    } finally {
      setUploadingTeamIdx(null);
    }
  };

  // Dynamic handlers for What We Stand For
  const addStandForPoint = () => {
    setWhatWeStandFor((prev) => [
      ...prev,
      { title: "", description: "", icon: "Layers" },
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

  // Dynamic handlers for Team Members
  const addTeamMember = () => {
    setTheTeam((prev) => [
      ...prev,
      {
        name: "",
        role: "",
        bio: "",
        bullets: [""],
        image: "",
        initials: "",
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

  const updateTeamBullet = (memberIdx: number, bulletIdx: number, val: string) => {
    setTheTeam((prev) =>
      prev.map((m, i) => {
        if (i !== memberIdx) return m;
        const newBullets = [...(m.bullets || [])];
        newBullets[bulletIdx] = val;
        return { ...m, bullets: newBullets };
      })
    );
  };

  const addTeamBullet = (memberIdx: number) => {
    setTheTeam((prev) =>
      prev.map((m, i) => (i === memberIdx ? { ...m, bullets: [...(m.bullets || []), ""] } : m))
    );
  };

  const removeTeamBullet = (memberIdx: number, bulletIdx: number) => {
    setTheTeam((prev) =>
      prev.map((m, i) => {
        if (i !== memberIdx) return m;
        return { ...m, bullets: m.bullets.filter((_, bi) => bi !== bulletIdx) };
      })
    );
  };

  // On Save
  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await saveAboutContentAction({
        intro,
        story,
        vision,
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
    { id: "intro", label: "1. Intro & Hero", icon: Type },
    { id: "story", label: "2. Our Story", icon: BookOpen },
    { id: "vision", label: "3. Our Vision", icon: Eye },
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
            Manage all content for the About Us page — intro, story, vision, the name, pillars, credibility points, and team.
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

      {/* Section Tabs */}
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
        {/* 1. INTRO & HERO */}
        {activeTab === "intro" && (
          <Section icon={Type} title="About Us Intro & Hero">
            <Field label="Eyebrow / Breadcrumb Tag">
              <input
                className={inputClass}
                value={intro.eyebrow}
                onChange={(e) => setIntro({ ...intro, eyebrow: e.target.value })}
                placeholder="About / Who We Are"
              />
            </Field>
            <Field label="Page Main Headline">
              <input
                className={inputClass}
                value={intro.title}
                onChange={(e) => setIntro({ ...intro, title: e.target.value })}
                placeholder="About Vertara Global"
              />
            </Field>
            <Field label="Mission / Intro Subtitle">
              <textarea
                className={inputClass}
                rows={3}
                value={intro.description}
                onChange={(e) => setIntro({ ...intro, description: e.target.value })}
                placeholder="Make India GCC setup predictable for enterprise buyers..."
              />
            </Field>
            <Field label="Hero Background Image URL" hint="Local paths start with /images/ or /uploads/, or paste external URL">
              <div className="flex gap-2">
                <input
                  className={inputClass}
                  value={intro.image}
                  onChange={(e) => setIntro({ ...intro, image: e.target.value })}
                  placeholder="/images/about us.png"
                />
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-xs font-semibold text-navy hover:border-accent shrink-0">
                  {uploadingHero ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                  <span>{uploadingHero ? "Uploading…" : "Upload"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={uploadingHero}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) void onUploadHeroImage(file);
                      e.target.value = "";
                    }}
                  />
                </label>
              </div>
            </Field>
            {intro.image && (
              <div className="mt-2 overflow-hidden rounded-xl border border-border w-48 h-28 bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={intro.image} alt="Hero preview" className="w-full h-full object-cover" />
              </div>
            )}
          </Section>
        )}

        {/* 2. OUR STORY */}
        {activeTab === "story" && (
          <Section icon={BookOpen} title="Our Story">
            <Field label="Eyebrow">
              <input
                className={inputClass}
                value={story.eyebrow}
                onChange={(e) => setStory({ ...story, eyebrow: e.target.value })}
                placeholder="Our Story"
              />
            </Field>
            <Field label="Title">
              <input
                className={inputClass}
                value={story.title}
                onChange={(e) => setStory({ ...story, title: e.target.value })}
                placeholder="About Us"
              />
            </Field>
            <Field label="Story Content">
              <textarea
                className={inputClass}
                rows={6}
                value={story.content}
                onChange={(e) => setStory({ ...story, content: e.target.value })}
                placeholder="Vertara Global was founded by operators who have built and scaled..."
              />
            </Field>
          </Section>
        )}

        {/* 3. OUR VISION */}
        {activeTab === "vision" && (
          <Section icon={Eye} title="Our Vision">
            <Field label="Eyebrow">
              <input
                className={inputClass}
                value={vision.eyebrow}
                onChange={(e) => setVision({ ...vision, eyebrow: e.target.value })}
                placeholder="Our Vision"
              />
            </Field>
            <Field label="Title">
              <input
                className={inputClass}
                value={vision.title}
                onChange={(e) => setVision({ ...vision, title: e.target.value })}
                placeholder="Our Vision"
              />
            </Field>
            <Field label="Vision Statement">
              <textarea
                className={inputClass}
                rows={4}
                value={vision.statement}
                onChange={(e) => setVision({ ...vision, statement: e.target.value })}
                placeholder="To be the most trusted partner for organizations building Global Capability Centres..."
              />
            </Field>
          </Section>
        )}

        {/* 4. THE NAME */}
        {activeTab === "theName" && (
          <Section icon={Sparkles} title="The Name & Etymology">
            <Field label="Eyebrow">
              <input
                className={inputClass}
                value={theName.eyebrow}
                onChange={(e) => setTheName({ ...theName, eyebrow: e.target.value })}
                placeholder="The name"
              />
            </Field>
            <Field label="Section Title">
              <input
                className={inputClass}
                value={theName.title}
                onChange={(e) => setTheName({ ...theName, title: e.target.value })}
                placeholder="The Meaning of Vertara"
              />
            </Field>
            <Field label="Origin / Meaning">
              <textarea
                className={inputClass}
                rows={3}
                value={theName.meaning}
                onChange={(e) => setTheName({ ...theName, meaning: e.target.value })}
                placeholder="Vertara draws from Vertex, the summit... and Tara, the Sanskrit word for star..."
              />
            </Field>
            <Field label="Synthesis / Combined Promise">
              <textarea
                className={inputClass}
                rows={3}
                value={theName.description}
                onChange={(e) => setTheName({ ...theName, description: e.target.value })}
                placeholder="Together: The guiding summit, a partner that leads organizations to the peak..."
              />
            </Field>
          </Section>
        )}

        {/* 5. WHAT WE STAND FOR */}
        {activeTab === "standFor" && (
          <Section
            icon={Award}
            title="What We Stand For (Foundation Pillars)"
            action={
              <button
                type="button"
                onClick={addStandForPoint}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-accent hover:border-accent transition cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add Pillar
              </button>
            }
          >
            {whatWeStandFor.length === 0 ? (
              <p className="text-xs text-muted italic py-4">No pillars added yet. Click &quot;Add Pillar&quot; above.</p>
            ) : (
              <div className="space-y-4">
                {whatWeStandFor.map((point, index) => (
                  <div
                    key={index}
                    className="relative rounded-2xl border border-border bg-surface p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-accent">
                        Pillar #{index + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeStandForPoint(index)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border text-slate-400 hover:border-red-200 hover:text-red-600 transition cursor-pointer"
                        title="Delete pillar"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
                      <Field label="Pillar Title">
                        <input
                          className={inputClass}
                          value={point.title}
                          onChange={(e) => updateStandForPoint(index, { title: e.target.value })}
                          placeholder="e.g. Operator mindset"
                        />
                      </Field>
                      <Field label="Icon Style">
                        <select
                          className={inputClass}
                          value={point.icon || "Layers"}
                          onChange={(e) => updateStandForPoint(index, { icon: e.target.value })}
                        >
                          {ICONS.map((ic) => (
                            <option key={ic} value={ic}>
                              {ic}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>

                    <Field label="Pillar Description">
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={point.description}
                        onChange={(e) =>
                          updateStandForPoint(index, { description: e.target.value })
                        }
                        placeholder="Focused on driving decision, implementation, and delivering results..."
                      />
                    </Field>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* 6. BY THE NUMBERS */}
        {activeTab === "numbers" && (
          <Section
            icon={Hash}
            title="By the Numbers (Credibility Points)"
            action={
              <button
                type="button"
                onClick={addNumberPoint}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-accent hover:border-accent transition cursor-pointer"
              >
                <Plus className="h-4 w-4" /> Add Number Point
              </button>
            }
          >
            {byTheNumbers.length === 0 ? (
              <p className="text-xs text-muted italic py-4">No points added yet. Click &quot;Add Number Point&quot; above.</p>
            ) : (
              <div className="space-y-4">
                {byTheNumbers.map((point, index) => (
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

                    <div className="grid gap-3 sm:grid-cols-[100px_1fr]">
                      <Field label="Number / Stat">
                        <input
                          className={inputClass}
                          value={point.number}
                          onChange={(e) => updateNumberPoint(index, { number: e.target.value })}
                          placeholder="01 or 50+"
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

        {/* 7. THE TEAM */}
        {activeTab === "team" && (
          <Section
            icon={Users}
            title="The Leadership & Practitioners Team"
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
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-navy text-white flex items-center justify-center font-bold text-xs overflow-hidden">
                          {member.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
                          ) : (
                            member.initials || member.name.slice(0, 2).toUpperCase() || "TM"
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-navy text-sm">{member.name || `Member #${index + 1}`}</p>
                          <p className="text-[11px] text-muted">{member.role || "Role not set"}</p>
                        </div>
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

                    <div className="grid gap-4 sm:grid-cols-3">
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
                          placeholder="e.g. Co-Founder, Former Mining Director"
                        />
                      </Field>
                      <Field label="Initials">
                        <input
                          className={inputClass}
                          value={member.initials || ""}
                          onChange={(e) => updateTeamMember(index, { initials: e.target.value })}
                          placeholder="e.g. N"
                        />
                      </Field>
                    </div>

                    <Field label="Photo URL or Upload">
                      <div className="flex gap-2">
                        <input
                          className={inputClass}
                          value={member.image || ""}
                          onChange={(e) => updateTeamMember(index, { image: e.target.value })}
                          placeholder="Paste image URL"
                        />
                        <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-navy hover:border-accent shrink-0">
                          {uploadingTeamIdx === index ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Upload className="h-4 w-4" />
                          )}
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            disabled={uploadingTeamIdx === index}
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) void onUploadTeamImage(file, index);
                              e.target.value = "";
                            }}
                          />
                        </label>
                      </div>
                    </Field>

                    <Field label="Bio / Summary">
                      <textarea
                        className={inputClass}
                        rows={3}
                        value={member.bio}
                        onChange={(e) => updateTeamMember(index, { bio: e.target.value })}
                        placeholder="Executive summary of past experience..."
                      />
                    </Field>

                    {/* Bullets List */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-navy">Highlight Bullets</label>
                        <button
                          type="button"
                          onClick={() => addTeamBullet(index)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" /> Add Bullet
                        </button>
                      </div>
                      <div className="space-y-2">
                        {(member.bullets || []).map((b, bi) => (
                          <div key={bi} className="flex items-center gap-2">
                            <input
                              className={inputClass}
                              value={b}
                              onChange={(e) => updateTeamBullet(index, bi, e.target.value)}
                              placeholder={`Bullet point #${bi + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => removeTeamBullet(index, bi)}
                              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-slate-400 hover:text-red-600 transition cursor-pointer"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        )}

        {/* 8. CLOSING CTA */}
        {activeTab === "cta" && (
          <Section icon={ArrowRight} title="Closing CTA Banner">
            <Field label="Eyebrow">
              <input
                className={inputClass}
                value={closingCta.eyebrow}
                onChange={(e) => setClosingCta({ ...closingCta, eyebrow: e.target.value })}
                placeholder="Enquire"
              />
            </Field>
            <Field label="CTA Title">
              <input
                className={inputClass}
                value={closingCta.title}
                onChange={(e) => setClosingCta({ ...closingCta, title: e.target.value })}
                placeholder="Start a conversation with the team"
              />
            </Field>
            <Field label="CTA Description">
              <textarea
                className={inputClass}
                rows={3}
                value={closingCta.description}
                onChange={(e) => setClosingCta({ ...closingCta, description: e.target.value })}
                placeholder="Share what you're building, we'll connect you with the right partner."
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Button Text">
                <input
                  className={inputClass}
                  value={closingCta.buttonText}
                  onChange={(e) => setClosingCta({ ...closingCta, buttonText: e.target.value })}
                  placeholder="Request a partner call"
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
