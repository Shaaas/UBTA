import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight, Phone, TrendingUp, Shield, Users,
  PiggyBank, CreditCard, CheckCircle, MapPin,
  BadgeCheck, Landmark, Clock, AlertCircle
} from "lucide-react";

export const metadata: Metadata = {
  title: "CBD SACCO",
  description:
    "CBD United Boda Transport Co-Operative Society Limited — save consistently, build credit, and access loans up to 3× your savings.",
};

const requirements = [
  {
    icon: BadgeCheck,
    title: "Be a registered UBTA member",
    desc: "You must first register as a UBTA member (Ksh 1,000 registration fee).",
  },
  {
    icon: CreditCard,
    title: "National ID copy",
    desc: "Clear scan or photo of your national ID — front and back.",
  },
  {
    icon: Landmark,
    title: "KRA PIN certificate",
    desc: "Download from itax.kra.go.ke if you don't already have it.",
  },
  {
    icon: Users,
    title: "Passport photo",
    desc: "Recent clear photo against a plain background.",
  },
];

const howItWorks = [
  {
    step: "01",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    title: "Save consistently",
    desc: "Contribute Ksh 1,200 every month — Ksh 1,000 goes into your savings and Ksh 200 is the management fee. The more you save, the more you can borrow.",
  },
  {
    step: "02",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    title: "Stay active for 3 months",
    desc: "Your consistent contributions build an active savings record. After 3 months of uninterrupted saving, your credit record qualifies you for a loan.",
  },
  {
    step: "03",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    title: "Access your loan",
    desc: "Apply for up to 3× your total savings. For example, Ksh 4,000 saved = up to Ksh 12,000 loan. Repay and grow your limit over time.",
  },
];

const benefits = [
  { icon: PiggyBank,   color: "text-orange-500", bg: "bg-orange-500/10", title: "Savings plan",      desc: "Ksh 1,000/month minimum savings, growing your personal fund month by month." },
  { icon: TrendingUp,  color: "text-emerald-400",  bg: "bg-emerald-500/10",  title: "Loan access",       desc: "Borrow up to 3× your savings after 3 months. No bank account needed." },
  { icon: Shield,      color: "text-blue-400",     bg: "bg-blue-500/10",     title: "Member protection", desc: "Legal and welfare support for all active SACCO members." },
  { icon: Users,       color: "text-amber-400",   bg: "bg-amber-500/10",    title: "Group strength",    desc: "Pooled savings create a larger fund — everyone benefits from collective growth." },
];

const faqItems = [
  {
    q: "Can I join the SACCO without being a UBTA member?",
    a: "No. CBD SACCO is exclusively for registered UBTA members. You must complete your UBTA membership registration first.",
  },
  {
    q: "What happens if I miss a monthly payment?",
    a: "Missed payments affect your active status and loan eligibility. Contact the office immediately at 0714 314 342 if you're unable to make a payment.",
  },
  {
    q: "How long does a loan application take?",
    a: "Loan applications are reviewed by the committee. Processing typically takes a few business days once all requirements are met.",
  },
  {
    q: "Can I withdraw my savings?",
    a: "Savings withdrawal policies are governed by the SACCO rules. Speak to an agent at your nearest location for specific withdrawal terms.",
  },
  {
    q: "What is the management fee used for?",
    a: "The Ksh 200 monthly management fee covers SACCO operations, administration, and member services — keeping the cooperative running for everyone.",
  },
];

const agents = [
  { name: "Githurai 45",          desc: "Serve northern Nairobi zones" },
  { name: "Ngara – Fig Tree",     desc: "Central Nairobi agent" },
  { name: "Njiru – Kangundo Road",desc: "Eastern Nairobi zones" },
  { name: "Mlolongo – Mombasa Road", desc: "South-eastern corridor" },
];

export default function SaccoPage() {
  return (
    <div className="bg-[#0B0F19] text-gray-100 min-h-screen antialiased">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-[#0F172A] border-b border-gray-800/80 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(255,255,255,0.1) 40px,rgba(255,255,255,0.1) 41px),repeating-linear-gradient(90deg,transparent,transparent 40px,rgba(255,255,255,0.1) 40px,rgba(255,255,255,0.1) 41px)",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-500 via-teal-500 to-emerald-500" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30
                            text-teal-400 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              <Landmark size={14} className="shrink-0" />
              CBD United Boda Transport Co-Operative Society Limited
            </div>
            <h1 className="font-black text-white text-4xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-none mb-6">
              CBD<br />
              <span className="text-teal-400">SACCO</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
              Your savings cooperative — built by riders, for riders. Save monthly,
              build your credit record, and access loans up to <span className="text-white font-bold">3× your savings</span>.
              Financial freedom starts here.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/register" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20 group">
                Join & Start Saving <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform shrink-0" />
              </Link>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hello, I want to learn more about CBD SACCO`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-800/80 border border-gray-700
                           text-white text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-gray-700 transition-colors"
              >
                <Phone size={16} className="text-emerald-400 shrink-0" /> Ask Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY NUMBERS BAR ──────────────────────────────────── */}
      <section className="bg-teal-600 border-b border-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { val: "Ksh 1,000", lbl: "Minimum monthly savings" },
              { val: "Ksh 200",   lbl: "Monthly management fee" },
              { val: "3 months",  lbl: "To qualify for a loan" },
              { val: "3×",        lbl: "Max loan multiplier" },
            ].map((s) => (
              <div key={s.lbl} className="p-2">
                <div className="font-black text-white text-2xl sm:text-3xl lg:text-4xl tracking-tight">{s.val}</div>
                <div className="text-teal-100 text-xs sm:text-sm mt-1 font-medium">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IS CBD SACCO ────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
                Who we are
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-6">
                Kenya's boda boda financial cooperative
              </h2>
              <div className="space-y-4 text-gray-400 text-sm sm:text-base leading-relaxed">
                <p>
                  CBD United Boda Transport Co-Operative Society Limited — known as CBD SACCO —
                  is the financial arm of UBTA. We exist to bring real financial inclusion to
                  boda boda and taxi operators across Nairobi and beyond.
                </p>
                <p>
                  Too many riders have been locked out of formal financial services. No bank
                  account, no credit history, no loan access. CBD SACCO changes that — using
                  the strength of collective savings to unlock credit for every active member.
                </p>
                <p>
                  Our mission: provide reliable, safe, and tech-driven transport solutions while
                  becoming Kenya's most trusted SACCO, enhancing member welfare at every step.
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  "Empowering boda & taxi operators",
                  "Digital transport platforms",
                  "Financial inclusion & organization",
                  "Become Kenya's most trusted SACCO",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5 text-xs font-semibold text-gray-300 bg-[#0B0F19] p-3 rounded-lg border border-gray-800">
                    <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                    {point}
                  </div>
                ))}
              </div>
            </div>

            {/* Visual stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: PiggyBank,  color: "bg-orange-500/10 text-orange-400 border-orange-500/20", val: "Ksh 1,200", lbl: "Monthly total contribution" },
                { icon: TrendingUp, color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",   val: "3×",        lbl: "Loan multiplier after 3 months" },
                { icon: Clock,      color: "bg-blue-500/10 text-blue-400 border-blue-500/20",              val: "3 months",  lbl: "Minimum active saving period" },
                { icon: Shield,     color: "bg-amber-500/10 text-amber-400 border-amber-500/20",           val: "Ksh 200",   lbl: "Monthly management fee" },
              ].map(({ icon: Icon, color, val, lbl }) => (
                <div key={lbl} className={`bg-[#0B0F19] border rounded-xl flex flex-col items-center text-center p-6 sm:p-8 ${color.split(' ')[2]}`}>
                  <div className={`w-12 h-12 rounded-xl ${color.split(' ')[0]} ${color.split(' ')[1]} flex items-center justify-center mb-4`}>
                    <Icon size={22} className="shrink-0" />
                  </div>
                  <div className="font-black text-white text-xl sm:text-2xl mb-1 tracking-tight">{val}</div>
                  <div className="text-gray-400 text-xs leading-normal font-medium max-w-[150px]">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[#0B0F19] border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
              Simple. Clear. Powerful.
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-3">How CBD SACCO works</h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto leading-relaxed">
              Three steps stand between you and financial freedom. No complicated forms.
              No bank accounts required.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {howItWorks.map((step, i) => (
              <div
                key={step.step}
                className={`relative bg-[#111827] rounded-2xl p-6 sm:p-8 border ${step.border}`}
              >
                {i < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3.5 w-7 border-t border-dashed border-gray-700 z-10" />
                )}
                <div className={`text-6xl font-black ${step.color} opacity-10 leading-none mb-2 select-none font-mono`}>
                  {step.step}
                </div>
                <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider
                                 ${step.color} ${step.bg} px-2.5 py-1 rounded-md mb-4`}>
                  Step {step.step}
                </div>
                <h3 className="font-bold text-white text-lg uppercase tracking-tight mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Loan calculator callout */}
          <div className="mt-12 bg-[#111827] border border-gray-800 rounded-2xl p-6 lg:p-8">
            <div className="grid lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-2">
                <h3 className="font-bold text-white text-xl uppercase tracking-tight mb-2">
                  See your loan potential
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  The more consistently you save, the larger your loan eligibility grows.
                  Discipline today — financial freedom tomorrow.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:col-span-3">
                {[
                  { months: "3 months", saved: "Ksh 3,000", loan: "Ksh 9,000" },
                  { months: "6 months", saved: "Ksh 6,000", loan: "Ksh 18,000" },
                  { months: "12 months", saved: "Ksh 12,000", loan: "Ksh 36,000" },
                ].map((row) => (
                  <div key={row.months} className="bg-[#0B0F19] rounded-xl p-3 sm:p-4 border border-gray-800/80 text-center">
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">{row.months}</div>
                    <div className="text-xs sm:text-sm font-bold text-teal-400 mb-1">{row.saved}</div>
                    <div className="text-[9px] text-gray-500 uppercase font-bold tracking-tight mb-1">saved →</div>
                    <div className="font-black text-orange-400 text-base sm:text-lg">{row.loan}</div>
                    <div className="text-[9px] text-gray-400 uppercase tracking-tight font-medium">max loan</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
              Member benefits
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              What you get as a CBD SACCO member
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {benefits.map((b) => (
              <div key={b.title} className="bg-[#0B0F19] border border-gray-800/60 p-6 rounded-2xl transition-all hover:border-gray-700 group">
                <div className={`w-11 h-11 rounded-xl ${b.bg} flex items-center justify-center
                                 mb-5 group-hover:scale-105 transition-transform`}>
                  <b.icon size={20} className={`${b.color} shrink-0`} />
                </div>
                <h3 className="font-bold text-white text-base uppercase tracking-tight mb-2">
                  {b.title}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBER ITEMS ─────────────────────────────────────── */}
      <section className="py-16 bg-[#0B0F19] border-t border-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
              Official member items
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Get your UBTA gear
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm mt-2 max-w-md mx-auto">
              All payable via M-Pesa Paybill. Account Name format: specify reason for payment.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {[
              {
                name:  "Motorbike QR Code",
                price: "Ksh 500",
                desc:  "Official UBTA QR code for your motorbike — verifiable identification.",
                border: "border-orange-500/20 bg-orange-500/5 text-orange-400",
              },
              {
                name:  "Member Card",
                price: "Ksh 300",
                desc:  "Your official UBTA member card with your name and member number.",
                border: "border-emerald-500/20 bg-emerald-500/5 text-emerald-400",
              },
              {
                name:  "Reflector Jacket",
                price: "From Ksh 500",
                desc:  "UBTA branded hi-vis reflector jacket. Available in 3 sizes — Ksh 500, 700, 1,000.",
                border: "border-amber-500/20 bg-amber-500/5 text-amber-400",
              },
            ].map((item) => (
              <div
                key={item.name}
                className={`bg-[#111827] rounded-2xl border p-6 text-center ${item.border.split(' ')[0]}`}
              >
                <span className={`inline-block text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-md mb-4 ${item.border.split(' ')[1]} ${item.border.split(' ')[2]}`}>
                  {item.price}
                </span>
                <h3 className="font-bold text-white text-base uppercase tracking-tight mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Payment note */}
          <div className="mt-10 max-w-xl mx-auto bg-[#111827] border border-gray-800 rounded-2xl p-6 text-center">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Pay via M-Pesa</p>
            <div className="font-black text-orange-400 text-2xl mb-1 tracking-tight">
              Paybill: Coming soon
            </div>
            <p className="text-gray-400 text-[11px] leading-normal max-w-sm mx-auto">
              Account No: use the reason for payment (e.g. "Registration", "Monthly", "QRCode")
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-500/5 border border-amber-500/20 px-4 py-2 rounded-xl text-amber-400 text-xs font-semibold">
              <AlertCircle size={14} className="shrink-0" />
              Paybill number will be updated once active
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW TO JOIN ──────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-[#111827]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
                Application requirements
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-8">
                What you need to join
              </h2>
              <div className="space-y-5">
                {requirements.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex items-start gap-4 p-4 bg-[#0B0F19] border border-gray-800/50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-orange-400 shrink-0" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm uppercase tracking-tight mb-1">
                        {title}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Agent locations */}
            <div>
              <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
                Official agents & locations
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mb-8">
                Find us near you
              </h2>
              <div className="space-y-3.5">
                {agents.map((agent, i) => (
                  <div
                    key={agent.name}
                    className="flex items-center gap-4 p-4 bg-[#0B0F19] rounded-xl
                               border border-gray-800/80 hover:border-orange-500/30 transition-all"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-500 text-white flex items-center
                                    justify-center shrink-0 text-sm font-bold font-mono">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-bold text-white uppercase text-xs sm:text-sm tracking-tight">
                        {agent.name}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5 font-medium">{agent.desc}</div>
                    </div>
                    <MapPin size={15} className="text-orange-400 ml-auto shrink-0" />
                  </div>
                ))}
              </div>

              <div className="mt-6 p-5 bg-[#0B0F19] border border-gray-800 rounded-xl flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-wide">Office contact</p>
                  <a
                    href="tel:0714314342"
                    className="font-black text-white text-xl sm:text-2xl hover:text-orange-400 transition-colors tracking-tight block mt-0.5"
                  >
                    0714 314 342
                  </a>
                </div>
                <p className="text-gray-400 text-xs font-medium max-w-[190px] leading-normal sm:text-right">
                  Call or WhatsApp <span className="text-gray-600 block text-[11px]">Mon to Sat, 8am–6pm</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-16 bg-[#0B0F19] border-t border-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-teal-400 text-xs font-bold uppercase tracking-widest mb-3">
              Common questions
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Frequently asked questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqItems.map(({ q, a }) => (
              <div key={q} className="bg-[#111827] rounded-xl border border-gray-800/80 p-5 sm:p-6">
                <h4 className="font-bold text-white text-sm sm:text-base uppercase tracking-tight mb-2.5">
                  {q}
                </h4>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ───────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#0F172A] relative overflow-hidden border-t border-gray-800/60">
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-teal-500 to-emerald-500" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mb-4">
            Start your savings journey today
          </h2>
          <p className="text-gray-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            Join hundreds of riders already saving and growing with CBD SACCO.
            Discipline today — financial freedom tomorrow.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-orange-500/20">
              Register Now <ArrowRight size={16} className="shrink-0" />
            </Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hello, I want to join CBD SACCO`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white text-sm font-bold px-6 py-3.5 rounded-xl hover:bg-emerald-700 transition-colors"
            >
              <Phone size={16} className="shrink-0" /> WhatsApp Us
            </a>
          </div>
          <p className="mt-10 text-gray-600 text-xs font-bold uppercase tracking-widest">
            Stronger Together · Safer Together · Growing Together
          </p>
        </div>
      </section>
    </div>
  );
}