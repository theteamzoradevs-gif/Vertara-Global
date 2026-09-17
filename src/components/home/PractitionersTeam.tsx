"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { User, Mail } from "lucide-react";

interface Leader {
  name: string;
  role: string;
  bio: string;
  image?: string;
  initials: string;
}

const leaders: Leader[] = [
  {
    name: "Neha",
    role: "Co-Founder, Ex-Rio Tinto Director",
    initials: "N",
    bio: "20+ years in corporate real estate, workplace strategy and portfolio management; set up GCCs for Rio Tinto; setup execution across a large enterprise footprint",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=compress&cs=tinysrgb&w=300",
  },
  {
    name: "Namit G",
    role: "Co-Founder, Ex-KPMG Partner",
    initials: "NG",
    bio: "17+ yrs at KPMG; Built and led KPMG Capability hub; enabled 10+ GCC set-ups, expert in GCC strategy, location assessment and innovation led CoEs.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=compress&cs=tinysrgb&w=300",
  },
  {
    name: "Rajesh",
    role: "Practice Director, Ex WSP GCC India Head",
    initials: "R",
    bio: "Expert in shared-services operations for global organizations, with deep expertise in transition management, process migration and vendor governance",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=compress&cs=tinysrgb&w=300",
  },
];

const openPositions = [
  {
    title: "Joining the team",
    role: "Practice leadership — role to be announced",
  },
  {
    title: "Joining the team",
    role: "Practice leadership — role to be announced",
  },
  {
    title: "Joining the team",
    role: "Practice leadership — role to be announced",
  },
  {
    title: "Joining the team",
    role: "Practice leadership — role to be announced",
  },
  {
    title: "Joining the team",
    role: "Practice leadership — role to be announced",
  },
];

export function PractitionersTeam() {
  return (
    <section className="relative w-full overflow-hidden bg-[#162f27] py-16 md:py-24 text-white">
      {/* Background glow accents */}
      <div className="pointer-events-none absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#1f4337]/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#ba8e2d]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-4xl text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Led by practitioners. Built to grow.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#b4cec3] sm:text-lg">
            Strategy, GCC execution and shared services under one senior-led
            platform — with the bench expanding across practice areas.
          </p>
        </div>

        {/* 8-Card Grid (4 cols x 2 rows on desktop) */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {/* Active Leaders (Solid Cards) */}
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex flex-col justify-between rounded-2xl border border-[#254d3e] bg-[#1d3b30] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c8923a]/50 hover:shadow-lg hover:shadow-black/20"
            >
              <div>
                {/* Avatar & Name/Role Header */}
                <div className="flex items-center gap-3.5">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20 bg-[#0f241d]">
                    {leader.image ? (
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#c8923a]">
                        {leader.initials}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold leading-tight text-[#c8923a]">
                      {leader.role}
                    </p>
                  </div>
                </div>

                {/* Bio text */}
                <p className="mt-4 text-xs font-normal leading-relaxed text-[#b4cec3]">
                  {leader.bio}
                </p>
              </div>
            </motion.div>
          ))}

          {/* Open / Expanding Practice Leadership (Dashed Cards) */}
          {openPositions.map((slot, index) => (
            <motion.div
              key={`open-slot-${index}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
              className="flex min-h-[170px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2b5445] bg-white/[0.02] p-5 text-center transition-all duration-300 hover:border-[#c8923a]/40 hover:bg-white/[0.04]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#24493c] text-[#a3c2b6]">
                <User className="h-5 w-5 stroke-[2]" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-white/95">
                {slot.title}
              </h4>
              <p className="mt-1 text-xs text-[#8ea89d]">
                {slot.role}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Mandate Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-xl bg-[#ba8e2d] px-6 py-4.5 sm:flex-row sm:rounded-2xl"
        >
          <p className="text-center text-sm font-bold text-[#0b1f3a] sm:text-left sm:text-base md:text-lg">
            Let's build the right GCC — and build it to last.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-bold text-[#0b1f3a] transition-all hover:opacity-80 text-sm sm:text-base whitespace-nowrap"
          >
            <span>Discuss your GCC mandate</span>
            <Mail className="h-4 w-4 stroke-[2.4]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
