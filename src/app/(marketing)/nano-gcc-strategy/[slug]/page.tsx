import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getNanoGccStudyBySlug,
  getNanoGccStudiesWithDetailPages,
} from "@/data/nano-gcc-strategy";
import { ArrowLeft, Download } from "lucide-react";

export async function generateStaticParams() {
  const studies = getNanoGccStudiesWithDetailPages();
  return studies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getNanoGccStudyBySlug(slug);

  if (!study) {
    return { title: "Nano GCC Strategy | Vertara Global" };
  }

  return {
    title: `${study.title} | Nano GCC Strategy | Vertara Global`,
    description: study.excerpt,
  };
}

export default async function NanoGccStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getNanoGccStudyBySlug(slug);

  if (!study || !study.hasDetailPage) {
    notFound();
  }

  const { content } = study;

  return (
    <div className="w-full font-sans bg-white" style={{ fontFamily: "Calibri" }}>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden text-white bg-[#2F3F34]">
        <div className="relative mx-auto max-w-4xl px-4 py-14 sm:px-6 md:py-18 lg:py-20 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
            <Link href="/insights" className="hover:underline">
              Insights
            </Link>
            <span>/</span>
            <Link href="/nano-gcc-strategy" className="hover:underline">
              Nano GCC Strategy
            </Link>
            <span>/</span>
            <span className="text-white/80">{study.category}</span>
          </div>

          {/* Back button */}
          <div className="mt-4">
            <Link
              href="/nano-gcc-strategy"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-[#B59439]" />
              <span>Back to Nano GCC Strategy</span>
            </Link>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-[44px] leading-tight text-white">
            {study.title}
          </h1>

          {/* Intro Paragraph */}
          {content?.intro && (
            <p className="mt-5 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed font-normal">
              {content.intro}
            </p>
          )}

          {/* Quick PDF Download in Hero */}
          <div className="mt-8">
            <a
              href={study.pdfUrl}
              download={study.pdfFilename}
              className="inline-flex items-center gap-2 rounded-xl bg-[#B59439] hover:bg-[#a6862f] px-5 py-3 text-xs sm:text-sm font-bold text-[#101C30] transition-all shadow-md cursor-pointer hover:-translate-y-0.5"
            >
              <Download className="h-4 w-4" />
              <span>Download the full paper</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT SECTION */}
      <section className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <article className="space-y-6 text-[#101C30]">
          {/* Body Paragraphs */}
          {content?.paragraphs.map((p, idx) => (
            <p
              key={idx}
              className="text-base sm:text-lg text-[#101C30]/90 leading-relaxed font-normal"
            >
              {p}
            </p>
          ))}

          {/* Inside, You'll Discover List */}
          {content?.insideList && (
            <div className="my-6 space-y-3">
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-[#101C30]">
                {content.insideListTitle}
              </h2>
              <ul className="space-y-2.5">
                {content.insideList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#B59439] shrink-0 mt-2.5" />
                    <span className="text-base sm:text-lg text-[#101C30]/90 leading-relaxed font-normal">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Highlight Quote Box */}
          {content?.highlightQuote && (
            <div className="my-8 rounded-2xl border-l-4 border-l-[#B59439] bg-[#edf5ef]/30 p-6 sm:p-7">
              {content.highlightQuote.map((line, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg md:text-xl font-bold text-[#101C30] leading-snug"
                >
                  {line}
                </p>
              ))}
            </div>
          )}

          {/* Vertara Global Practice Section */}
          {content?.partnerSectionText && (
            <p className="text-base sm:text-lg text-[#101C30]/90 leading-relaxed font-normal">
              {content.partnerSectionText}
            </p>
          )}

          {/* Document Download Callout Box */}
          <div className="my-10 rounded-2xl border border-[#cddcd1] bg-[#2F3F34] p-6 sm:p-8 text-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="max-w-xl">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
                  RESEARCH REPORT
                </p>
                <p className="mt-2 text-sm sm:text-base text-white/90 leading-relaxed">
                  {content?.closingCallout ||
                    "Read the full paper to explore how modern enterprises build and scale lean capability centres in India with confidence."}
                </p>
              </div>

              <a
                href={study.pdfUrl}
                download={study.pdfFilename}
                className="inline-flex items-center gap-2 rounded-xl bg-[#B59439] hover:bg-[#a6862f] px-6 py-3.5 text-xs sm:text-sm font-bold text-[#101C30] transition-all shadow-md shrink-0 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                <span>Download the full paper</span>
              </a>
            </div>
          </div>
        </article>

        {/* Back Link to Hub */}
        <div className="mt-10 flex items-center justify-between">
          <Link
            href="/nano-gcc-strategy"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#101C30] hover:text-[#B59439] transition-colors"
          >
            <ArrowLeft className="h-4 w-4 text-[#B59439]" />
            <span>Return to All 10 Nano GCC Strategic Perspectives</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
