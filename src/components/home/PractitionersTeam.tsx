"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

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

export function PractitionersTeam() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 md:py-20 text-[#0b1f3a]">
      <div className="relative z-[1] mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl text-left">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1f3a] sm:text-4xl">
            Led by practitioners. Built to grow.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-[#526171] sm:text-lg">
            Strategy, GCC execution and shared services under one senior-led
            platform — with the bench expanding across practice areas.
          </p>
        </div>

        {/* 3-Card Grid for Leaders */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
          {leaders.map((leader, index) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col justify-between rounded-2xl border border-[#cddcd1] bg-[#e5ebe6] p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#2e3f33]/40 hover:shadow-md"
            >
              <div>
                {/* Avatar & Name/Role Header */}
                <div className="flex items-center gap-3.5">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-[#cddcd1] bg-white">
                    {leader.image ? (
                      <Image
                        src={leader.image}
                        alt={leader.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-sm font-bold text-[#b49339]">
                        {leader.initials}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0b1f3a]">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-semibold leading-tight text-[#b49339]">
                      {leader.role}
                    </p>
                  </div>
                </div>

                {/* Bio text */}
                <p className="mt-4 text-xs font-normal leading-relaxed text-[#475569] sm:text-sm">
                  {leader.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Mandate Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#3c5243] bg-[#2e3f33] px-6 py-4.5 sm:flex-row sm:px-8 sm:py-5 shadow-md"
        >
          <p className="text-center text-sm font-bold text-white sm:text-left sm:text-base md:text-lg">
            Let's build the right GCC — and build it to last.
          </p>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-[#b49339] px-5 py-2.5 text-sm font-bold text-[#0b1f3a] shadow-sm transition-all hover:bg-[#c4a44b] hover:shadow-md whitespace-nowrap"
          >
            <span>Discuss your GCC mandate</span>
            <Mail className="h-4 w-4 stroke-[2.4]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
