"use client";

import Image from "next/image";
import Link from "next/link";
import { Shield, Users, Award, ArrowRight, Mail, Phone } from "lucide-react";

// Mock data for the leadership tier
const LEADERS = [
  {
    name: "John Njeru",
    role: "National Chairman",
    tier: "Executive Board",
    bio: "Over 15 years in public transport management and policy development, guiding strategic institutional governance.",
    initials: "J.N"
  },
  {
    name: "Samuel Ndegwa Mugo",
    role: "Vice Chairman",
    tier: "Executive Board",
    bio: "Financial systems specialist focusing on micro-investment structures, compliance, and asset management portfolios.",
    initials: "S.N.M"
  },
  {
    name: "Ruth",
    role: "Corporate Secretary",
    tier: "Operations",
    bio: "Manages regional hub enforcement, county relations, and stage node operational efficiency structures.",
    initials: "R"
  },
  {
    name: "Joel",
    role: "Welfare & Benefits Trustee",
    tier: "Trustees",
    bio: "Oversees member medical funds, emergency coverage allocation, and education bursary schemes.",
    initials: "JS"
  }
];

export default function LeadershipPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 block w-full">
      
      {/* Page Header */}
      <div className="relative bg-[#0B1220] border-b border-slate-800/60 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-green-600 to-orange-500" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <Shield size={12} /> Institutional Governance
          </div>
          <h1 className="font-bold text-white text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-none mb-4">
            Our<br />
            <span className="text-orange-500">Leadership</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Meet the executive board, management team, and trustees driving regulatory compliance and financial empowerment for our members.
          </p>
        </div>
      </div>

      {/* Core Leadership Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full block">
        <div className="mb-12">
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">Board of directors</p>
          <h2 className="text-white font-bold text-2xl uppercase tracking-wide">Executive Administration</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
          {LEADERS.map((leader) => (
            <div 
              key={leader.name} 
              className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between transition-all hover:border-slate-800"
            >
              <div>
                {/* Visual Avatar Placeholder with premium dark glass style */}
                <div className="w-14 h-14 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-orange-500 font-bold text-lg mb-5">
                  {leader.initials}
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                  {leader.tier}
                </span>
                <h3 className="text-white font-bold text-lg leading-tight mb-1">{leader.name}</h3>
                <p className="text-orange-400 text-xs font-medium mb-4">{leader.role}</p>
                <p className="text-slate-400 text-xs leading-relaxed">{leader.bio}</p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/60 flex items-center gap-3 text-slate-500">
                <a href="mailto:governance@ubta.co.ke" className="hover:text-white transition-colors" aria-label="Email leader">
                  <Mail size={14} />
                </a>
                <a href="tel:0714314342" className="hover:text-white transition-colors" aria-label="Call office">
                  <Phone size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Strategy Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 w-full block">
        <div className="bg-slate-900/10 border border-slate-800/60 rounded-3xl p-8 lg:p-12 grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <div className="w-8 h-8 rounded-lg bg-green-600/10 border border-green-600/20 flex items-center justify-center text-green-400">
              <Award size={16} />
            </div>
            <h3 className="text-white font-bold text-xl uppercase tracking-wide">Accountability & Integrity Blueprint</h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
              Our leadership team operates under a strict, audited compliance mandate. Every financial product, micro-loan framework, and welfare resource management metric is scrutinized to protect our member investments.
            </p>
          </div>
          <div className="flex md:justify-end">
            <Link href="/contact" className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-white font-bold text-xs uppercase tracking-wider px-6 py-4 rounded-xl transition-all">
              Request Governance Report <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}