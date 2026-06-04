import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Phone, Shield, Users, TrendingUp, BookOpen,
  Heart, Target, Eye, CheckCircle, MapPin, Award, Briefcase,
  PiggyBank, Landmark, BadgeCheck, Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About & Leadership — UBTA",
  description:
    "United Boda Transport Association — our mission, pillars, leadership, and how riders access CBD SACCO financial services across Nairobi.",
};

// ─── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { val: "500+",      lbl: "Registered Members" },
  { val: "3",         lbl: "Agent Locations" },
  { val: "Ksh 1,200", lbl: "Monthly SACCO Contribution" },
  { val: "3×",        lbl: "Max Loan Multiplier" },
];

const PILLARS = [
  {
    icon: Shield,
    title: "Rider Welfare",
    description:
      "Advocacy and legal representation ensuring every registered rider has a voice, protection, and support when it matters most.",
    bgTheme: "bg-[#F37121]/10 border-[#F37121]/20 text-[#F37121]",
  },
  {
    icon: Users,
    title: "Member Organisation",
    description:
      "Structured registration, official membership cards, QR-coded motorbike tags, and a formal identity — giving riders a seat at the table.",
    bgTheme: "bg-[#00A651]/10 border-[#00A651]/20 text-[#00A651]",
  },
  {
    icon: TrendingUp,
    title: "Economic Empowerment",
    description:
      "CBD SACCO gives members a savings vehicle and loan access up to 3× savings — no bank account required. Financial freedom from Ksh 1,200/month.",
    bgTheme: "bg-teal-500/10 border-teal-500/20 text-teal-400",
  },
  {
    icon: BookOpen,
    title: "Training & Development",
    description:
      "Professional programs improving rider safety, road conduct, customer service standards, and long-term career prospects.",
    bgTheme: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  },
  {
    icon: Heart,
    title: "Community Building",
    description:
      "A trusted network across Nairobi where riders support, protect, and grow alongside one another — from Githurai to Njiru.",
    bgTheme: "bg-rose-500/10 border-rose-500/20 text-rose-400",
  },
];

const LEADERSHIP_TEAM = [
  {
    name: "John Njeru",
    role: "Executive Chairman",
    responsibility:
      "Strategic direction, government and county relations, and overall vision execution for UBTA across all Nairobi nodes.",
    image: "/leadership/chairman.jpeg",
  },
  {
    name: "Samuel Ndegwa Mugo",
    role: "Vice Chairman",
    responsibility:
      "Operations management, member registration systems, document compliance, and institutional partnerships.",
    image: "/leadership/secretary.jpeg",
  },
  {
    name: "Ruth",
    role: "General Secretary",
    responsibility:
      "Oversight of capital reserves, monthly member contributions, CBD SACCO compliance, and loan disbursement systems.",
    image: "/leadership/treasurer.jpeg",
  },
];

const TIMELINE_EVENTS = [
  {
    step: "1",
    title: "Founded",
    desc: "UBTA established in Nairobi to address the lack of structured representation and financial access for boda boda riders.",
    active: false,
  },
  {
    step: "2",
    title: "CBD SACCO Launched",
    desc: "CBD United Boda Transport Co-Operative Society Limited registered — opening savings accounts, credit records, and loan access for members.",
    active: false,
  },
  {
    step: "3",
    title: "Agent Network",
    desc: "Three official agent hubs established: Githurai 45, Ngara–Fig Tree, and Njiru–Kangundo Road, serving riders across Nairobi.",
    active: false,
  },
  {
    step: "4",
    title: "Today",
    desc: "500+ registered members, a growing savings pool, QR-coded motorbike fleet, and an expanding network of financially empowered riders.",
    active: true,
  },
];

// Split benefits clearly between UBTA and SACCO
const UBTA_BENEFITS = [
  "Official UBTA membership card & number",
  "Motorbike QR code for identification",
  "Legal representation & advocacy",
  "Safety & professionalism training",
  "UBTA reflector visibility jacket",
  "Access to agent network hubs",
  "A trusted community framework",
  "County & government representation",
];

const SACCO_BENEFITS = [
  "Personal savings account (Ksh 1,000/month)",
  "Loans up to 3× your total savings",
  "Qualifies after 3 months of consistent saving",
  "No bank account required",
  "Guaranteed member protection",
  "Collective financial growth",
];

const LOCATIONS = [
  { name: "Githurai 45", detail: "Northern Nairobi Terminal" },
  { name: "Ngara – Fig Tree", detail: "Central Nairobi, Fig Tree Flyover" },
  { name: "Njiru – Kangundo Road", detail: "Eastern Nairobi, Njiru Shopping Centre" },
];

const MEMBERSHIP_OPTIONS = [
  {
    icon: BadgeCheck,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    title: "UBTA Only",
    fee: "Ksh 1,200",
    feeSub: "Ksh 1,000 reg + Ksh 200 office",
    perks: ["Membership card & QR tag", "Legal advocacy", "Training access", "Reflector jacket"],
  },
  {
    icon: PiggyBank,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    title: "CBD SACCO Only",
    fee: "Ksh 1,200",
    feeSub: "Ksh 1,000 reg + Ksh 200 office",
    perks: ["Savings account", "Loan up to 3× savings", "Qualifies in 3 months", "Member protection"],
  },
  {
    icon: Award,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20 ring-1 ring-green-500/20",
    title: "UBTA + SACCO",
    fee: "Ksh 2,400",
    feeSub: "Ksh 1,200 per membership",
    badge: "Full membership",
    perks: ["Everything in UBTA", "Everything in SACCO", "Priority agent support", "Full welfare coverage"],
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="w-full bg-[#0B0F19] min-h-screen text-slate-200">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden w-full py-24 lg:py-32 border-b border-gray-800/60 bg-cover bg-center"
        style={{ backgroundImage: "url('/aboutbackground.jpeg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/90 to-[#0B0F19]/40 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-[#0B0F19]/30 z-0" />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-green-600 to-orange-500" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-[#00A651]/10 border border-[#00A651]/20
                            text-[#00A651] text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              <Users size={12} /> Nairobi & Beyond
            </div>
            <h1 className="font-black text-white text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-none mb-6">
              About &<br />
              <span className="text-[#F37121]">Leadership</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mb-8 [text-shadow:_0_2px_4px_rgba(0,0,0,0.6)]">
              United Boda Transport Association was built for one reason. To give boda boda
              riders the structure, support, and financial opportunities they deserve.
              We are a movement driven by accountability-first leadership, backed by
              CBD SACCO for real financial inclusion.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/register"
                className="bg-[#F37121] hover:bg-[#d65f17] text-white inline-flex items-center gap-2
                           font-black text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-[#F37121]/20"
              >
                Become a Member <ArrowRight size={16} />
              </Link>
              <Link
                href="/sacco"
                className="border border-gray-700 hover:border-[#F37121] text-white inline-flex items-center gap-2
                           font-black text-sm px-6 py-3.5 rounded-xl transition-all bg-slate-950/40"
              >
                Explore CBD SACCO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────── */}
      <section className="bg-[#F37121] border-b border-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.lbl} className="p-2">
                <div className="font-black text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight">{s.val}</div>
                <div className="text-orange-100 text-xs sm:text-sm mt-1 font-semibold">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#0B0F19] border-b border-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">

            <div className="relative bg-[#F37121] rounded-2xl p-8 lg:p-10 overflow-hidden shadow-2xl min-h-[320px] group border border-orange-500/30">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: "url('/mission.jpeg')" }} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#F37121]/95 via-[#F37121]/80 to-transparent" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <Target size={20} className="text-white" />
                  </div>
                  <span className="font-black text-white text-xs uppercase tracking-widest">Our Mission</span>
                </div>
                <p className="text-white text-xl lg:text-2xl font-black leading-snug [text-shadow:_0_2px_8px_rgba(0,0,0,0.4)]">
                  To create a more professional and sustainable boda boda industry by supporting,
                  uniting, and empowering riders through structured leadership and financial growth
                  via CBD SACCO.
                </p>
              </div>
            </div>

            <div className="relative bg-[#111827] rounded-2xl p-8 lg:p-10 overflow-hidden shadow-2xl min-h-[320px] border border-gray-800 group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 opacity-35 group-hover:scale-105"
                style={{ backgroundImage: "url('/vision.jpeg')" }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/90 via-[#0B0F19]/40 to-black/20" />
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-black/70 flex items-center justify-center border border-gray-700 backdrop-blur-sm">
                    <Eye size={20} className="text-[#00A651]" />
                  </div>
                  <span className="font-black text-gray-300 text-xs uppercase tracking-widest">Our Vision</span>
                </div>
                <p className="text-white text-xl lg:text-2xl font-black leading-snug [text-shadow:_0_2px_12px_rgba(0,0,0,0.9)]">
                  To provide reliable, safe, and tech-driven transport solutions while becoming
                  Kenya's most trusted boda boda SACCO — enhancing member welfare at every step.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TWO WAYS TO JOIN ──────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#111827]/30 border-b border-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#F37121] text-xs font-black uppercase tracking-widest mb-3">
              Membership options
            </p>
            <h2 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-tight mb-4">
              Choose how you join
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm font-medium leading-relaxed">
              You can join UBTA as an association member, join CBD SACCO as a cooperative member,
              or do both. Each has a registration fee of Ksh 1,000 and a monthly office management
              fee of Ksh 200.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {MEMBERSHIP_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              return (
                <div key={opt.title}
                  className={`relative bg-[#0B0F19] border rounded-2xl p-6 flex flex-col gap-5 ${opt.border}`}>
                  {"badge" in opt && opt.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap">
                      {opt.badge}
                    </div>
                  )}
                  <div className={`w-11 h-11 rounded-xl ${opt.bg} flex items-center justify-center`}>
                    <Icon size={20} className={opt.color} />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base uppercase tracking-tight mb-1">{opt.title}</h3>
                    <div className={`text-xl font-black ${opt.color}`}>{opt.fee}</div>
                    <div className="text-gray-500 text-[11px] font-medium mt-0.5">{opt.feeSub}</div>
                  </div>
                  <ul className="space-y-2 flex-1">
                    {opt.perks.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs text-gray-400 font-medium">
                        <CheckCircle size={13} className={`${opt.color} shrink-0 mt-0.5`} /> {p}
                      </li>
                    ))}
                  </ul>
                  <Link href="/register"
                    className={`w-full text-center text-xs font-black uppercase tracking-wide py-3 rounded-xl border transition-all
                      ${opt.bg} ${opt.border} ${opt.color} hover:opacity-80`}>
                    Register Now
                  </Link>
                </div>
              );
            })}
          </div>

          {/* SACCO affiliate callout */}
          <div className="mt-8 max-w-5xl mx-auto bg-[#0B0F19] border border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center shrink-0">
                <Building2 size={18} className="text-teal-400" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Are you an existing SACCO?</p>
                <p className="text-gray-500 text-xs mt-0.5">SACCOs and transport organisations can apply to affiliate under UBTA. Affiliation fees are under discussion.</p>
              </div>
            </div>
            <Link href="/register"
              className="shrink-0 text-teal-400 border border-teal-500/30 bg-teal-500/10 hover:bg-teal-500/20
                         text-xs font-black uppercase tracking-wide px-5 py-2.5 rounded-xl transition-all whitespace-nowrap">
              Apply to Affiliate
            </Link>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#0B0F19] border-b border-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#F37121] text-xs font-black uppercase tracking-widest mb-3">
              Accountability-First Leadership
            </p>
            <h2 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-tight mb-4">
              Executive Council
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm font-medium">
              The foundational leadership board driving operational integrity, policy compliance,
              and asset protection for all UBTA members and CBD SACCO depositors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {LEADERSHIP_TEAM.map((member, idx) => (
              <div key={idx}
                className="bg-[#111827]/80 border border-gray-800/80 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                <div className="relative w-full h-72 bg-gradient-to-b from-[#1F2937] to-[#111827] flex items-center justify-center overflow-hidden border-b border-gray-800">
                  <div className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-40 hover:opacity-70 transition-all duration-300"
                    style={{ backgroundImage: `url('${member.image}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
                  <Briefcase size={40} className="text-gray-700/50 relative z-0" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <h3 className="font-black text-white text-lg tracking-wide uppercase">{member.name}</h3>
                      <span className="inline-flex items-center gap-1 bg-[#00A651]/10 text-[#00A651] border border-[#00A651]/20 text-[10px] uppercase font-black px-2 py-0.5 rounded-md">
                        <Award size={10} /> Verified
                      </span>
                    </div>
                    <p className="text-[#F37121] text-xs font-black uppercase tracking-wider mb-4">{member.role}</p>
                    <p className="text-gray-400 text-xs leading-relaxed font-medium">{member.responsibility}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FIVE PILLARS ──────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#111827]/30 border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#F37121] text-xs font-black uppercase tracking-widest mb-3">Our five pillars</p>
            <h2 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-tight mb-4">
              What UBTA stands for
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm font-medium">
              Everything we do flows from these five commitments to our members and the wider
              boda boda community across Nairobi and beyond.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx}
                  className="bg-[#0B0F19]/90 border border-gray-800/80 p-6 rounded-2xl shadow-xl flex flex-col">
                  <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-6 ${pillar.bgTheme}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-white text-base uppercase mb-3 tracking-wide">{pillar.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-medium">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── OUR STORY ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#0B0F19] border-b border-gray-800/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">

            <div className="lg:col-span-7 space-y-6">
              <div>
                <p className="text-[#F37121] text-xs font-black uppercase tracking-widest mb-3">Our story</p>
                <h2 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-tight">
                  Built from the ground up
                </h2>
              </div>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-medium">
                UBTA was born out of a simple truth; boda boda riders are the backbone of
                urban transport in Kenya, yet they remain among the most underserved workers
                in the economy. No formal representation. No financial access. No structure.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-medium">
                We changed that. Starting in Nairobi, UBTA brings riders under a single
                organised umbrella, giving them identity, advocacy, and a real path to
                financial growth. CBD SACCO was the next step: a fully registered co-operative
                where members save monthly and access loans up to 3× their savings, with no
                bank account required.
              </p>
              <p className="text-gray-300 leading-relaxed text-sm sm:text-base font-medium">
                Today, our agent network spans Githurai 45, Ngara, and Njiru — with more
                locations planned as membership grows.
              </p>
              <div className="relative w-full h-64 rounded-xl overflow-hidden border border-gray-800 shadow-2xl group bg-[#111827]">
                <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity duration-300 z-10"
                  style={{ backgroundImage: "url('/riders-community.jpeg')" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-20" />
                <span className="absolute bottom-4 left-4 text-xs font-black uppercase tracking-wider text-white bg-[#0B0F19]/90 px-4 py-2 rounded-xl border border-gray-800 backdrop-blur-sm z-30 shadow-xl">
                  Active Regional Infrastructure Base — Nairobi
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative border-l border-gray-800/80 space-y-8 py-2 lg:mt-16">
              {TIMELINE_EVENTS.map((event, idx) => (
                <div key={idx} className="relative flex gap-6 pl-8">
                  <div className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 border shadow-xl
                    ${event.active
                      ? "border-[#F37121] bg-[#F37121] text-white shadow-[#F37121]/10"
                      : "border-gray-800 bg-[#111827] text-white"}`}>
                    {event.step}
                  </div>
                  <div>
                    <div className={`font-black text-xs uppercase mb-1 tracking-wider ${event.active ? "text-[#F37121]" : "text-white"}`}>
                      {event.title}
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed font-medium">{event.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── BENEFITS — UBTA vs SACCO ───────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#0B0F19] border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[#F37121] text-xs font-black uppercase tracking-widest mb-3">Member benefits</p>
            <h2 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-tight mb-4">
              What you get as a member
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

            {/* UBTA benefits */}
            <div className="bg-[#111827]/60 border border-[#F37121]/20 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#F37121]/10 flex items-center justify-center">
                  <BadgeCheck size={18} className="text-[#F37121]" />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-tight">UBTA Association</h3>
                  <p className="text-[#F37121] text-[11px] font-bold">Ksh 1,200 to join</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {UBTA_BENEFITS.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 bg-[#0B0F19] border border-gray-800/50 p-3 rounded-xl">
                    <CheckCircle size={13} className="text-[#F37121] shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-xs font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SACCO benefits */}
            <div className="bg-[#111827]/60 border border-teal-500/20 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center">
                  <Landmark size={18} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-tight">CBD SACCO</h3>
                  <p className="text-teal-400 text-[11px] font-bold">Ksh 1,200 to join + Ksh 1,200/month</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {SACCO_BENEFITS.map((item) => (
                  <div key={item} className="flex items-start gap-2.5 bg-[#0B0F19] border border-gray-800/50 p-3 rounded-xl">
                    <CheckCircle size={13} className="text-teal-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-xs font-semibold">{item}</span>
                  </div>
                ))}
              </div>
              {/* Loan calculator strip */}
              <div className="bg-[#0B0F19] border border-teal-500/20 rounded-xl p-4">
                <p className="text-teal-400 text-[10px] font-black uppercase tracking-widest mb-3">Loan potential</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { months: "3 mo", saved: "Ksh 3,000", loan: "Ksh 9,000" },
                    { months: "6 mo", saved: "Ksh 6,000", loan: "Ksh 18,000" },
                    { months: "12 mo", saved: "Ksh 12,000", loan: "Ksh 36,000" },
                  ].map((r) => (
                    <div key={r.months} className="text-center">
                      <div className="text-[10px] text-gray-500 font-bold uppercase">{r.months}</div>
                      <div className="text-xs text-teal-400 font-bold mt-1">{r.saved}</div>
                      <div className="text-[9px] text-gray-600 uppercase mt-0.5">saved →</div>
                      <div className="text-sm font-black text-orange-400">{r.loan}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AGENT LOCATIONS + CONTACT ─────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#111827]/10 border-b border-gray-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            <div>
              <p className="text-[#F37121] text-xs font-black uppercase tracking-widest mb-3">Find us</p>
              <h2 className="text-white font-black text-3xl lg:text-4xl uppercase tracking-tight mb-8">
                Agent locations
              </h2>
              <div className="space-y-3">
                {LOCATIONS.map((loc, idx) => (
                  <div key={idx}
                    className="flex items-center gap-4 bg-[#111827]/60 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-[#F37121] flex items-center justify-center text-white font-black text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <div className="font-black text-white text-xs sm:text-sm uppercase tracking-tight">{loc.name}</div>
                      <div className="text-gray-500 text-xs font-medium mt-0.5">{loc.detail}</div>
                    </div>
                    <MapPin size={15} className="text-[#F37121] ml-auto shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#0B0F19] rounded-2xl p-6 lg:p-8 border border-gray-800 shadow-2xl">
              <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-2">Office contact</p>
              <a href="tel:0714314342"
                className="font-black text-white text-2xl sm:text-3xl hover:text-[#F37121] transition-colors block mb-1 font-mono tracking-tight">
                0714 314 342
              </a>
              <p className="text-gray-400 text-xs font-medium mb-6">Call or WhatsApp · Mon to Sat, 8am–6pm</p>

              <div className="space-y-3">
                <a href="https://wa.me/254714314342?text=Hello%20UBTA"
                  target="_blank" rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#00A651] hover:bg-[#008f45]
                             text-white text-sm font-black px-5 py-3 rounded-xl transition-all">
                  <Phone size={15} /> Chat on WhatsApp
                </a>
                <Link href="/register"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F37121] hover:bg-[#d65f17]
                             text-white text-sm font-black px-5 py-3 rounded-xl transition-all">
                  Register as a Member <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="font-black text-white text-xl">500+</div>
                  <div className="text-gray-500 text-[11px] font-semibold">Active members</div>
                </div>
                <div>
                  <div className="font-black text-white text-xl">3</div>
                  <div className="text-gray-500 text-[11px] font-semibold">Agent hubs</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ────────────────────────────────────────── */}
      <section className="py-20 lg:py-24 bg-[#F37121] text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="font-black text-white text-4xl lg:text-5xl uppercase tracking-tight mb-4">
            Be part of the movement
          </h2>
          <p className="text-orange-100 max-w-xl mx-auto mb-8 text-sm sm:text-base font-medium leading-relaxed">
            Over 500 riders have already taken the step. Register today for advocacy,
            fleet identification, and financial backing through CBD SACCO, from Ksh 1,200.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/register"
              className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-[#F37121] font-black text-sm px-6 py-3.5 rounded-xl transition-all shadow-xl">
              Register Now <ArrowRight size={16} />
            </Link>
            <Link href="/sacco"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-black text-sm px-6 py-3.5 rounded-xl hover:bg-white/10 transition-all">
              Explore CBD SACCO
            </Link>
          </div>
          <p className="mt-12 text-orange-100/70 text-xs font-black tracking-widest uppercase">
            Stronger Together · Safer Together · Growing Together
          </p>
        </div>
      </section>

    </div>
  );
}