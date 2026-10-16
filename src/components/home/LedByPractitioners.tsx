"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="24" rx="4" fill="#0A66C2" />
      <path
        d="M19 19H16.27V14.73C16.27 13.71 16.25 12.4 14.85 12.4C13.43 12.4 13.21 13.51 13.21 14.66V19H10.48V10.22H13.1V11.42H13.14C13.5 10.73 14.39 10 15.72 10C18.49 10 19 11.82 19 14.19V19ZM7.46 9.03C6.58 9.03 5.87 8.32 5.87 7.44C5.87 6.56 6.58 5.85 7.46 5.85C8.34 5.85 9.05 6.56 9.05 7.44C9.05 8.32 8.34 9.03 7.46 9.03ZM8.83 19H6.1V10.22H8.83V19Z"
        fill="white"
      />
    </svg>
  );
}

export function LedByPractitioners() {
  return (
    <section
      id="led-by-practitioners"
      className="relative w-full overflow-hidden bg-white py-12 sm:py-14 md:py-16 border-b border-border font-sans"
    >
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="w-full text-left">
            {/* Eyebrow */}
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B59439]">
              Leadership
            </p>

            {/* Title */}
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#101C30] sm:text-3xl lg:text-[1.875rem]">
              Led by practitioners
            </h2>

            {/* Main Statement */}
            <p className="mt-3 sm:mt-4 text-base sm:text-lg leading-relaxed text-[#101C30] max-w-4xl">
              Vertara was started by people who have built capability centres from the inside, at a Big 4 firm and at one of the world's largest mining companies. We've sat in the client's chair. We know what it's like to defend a business case to the board, hire the first leader, find the right office and keep a new team on track in year two. That's the experience we bring to every client.
            </p>

            {/* Co-Founders & Read More CTA */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-start gap-6 sm:gap-8 lg:gap-10">

              {/* Neha Chauhan */}
              <div className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#B59439]" aria-hidden="true" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#101C30] leading-snug">
                      Neha Chauhan
                    </h3>
                    <a
                      href="https://www.linkedin.com/in/nehachauhan82?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center transition-transform duration-200 hover:scale-110"
                      aria-label="Neha Chauhan on LinkedIn"
                      title="Neha Chauhan on LinkedIn"
                    >
                      <LinkedInIcon className="h-4 w-4 rounded-[3px] shadow-xs" />
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#8C7026]">
                    Co-Founder, Corporate Real Estate and Workplace Leader
                  </p>
                </div>
              </div>

              {/* Namit Ganjisinghani */}
              <div className="flex items-start gap-3">
                <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[#B59439]" aria-hidden="true" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base sm:text-lg font-bold text-[#101C30] leading-snug">
                      Namit Ganjsinghani
                    </h3>
                    <a
                      href="https://www.linkedin.com/in/namit-ganjsinghani-219b343?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center transition-transform duration-200 hover:scale-110"
                      aria-label="Namit Ganjsinghani on LinkedIn"
                      title="Namit Ganjsinghani on LinkedIn"
                    >
                      <LinkedInIcon className="h-4 w-4 rounded-[3px] shadow-xs" />
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-[#8C7026]">
                    Co-Founder, Former Big 4 Partner
                  </p>
                </div>
              </div>


              {/* Read More CTA Button - on left side after names */}
              <div className="flex items-center">
                <Link
                  href="/about#leadership"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2F3F34] px-5 py-3 text-xs sm:text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#233027] hover:shadow-md"
                >
                  <span>Read more</span>
                  <span className="text-sm leading-none">→</span>
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
