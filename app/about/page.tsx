import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  Shield,
  Users,
  TrendingUp,
  BookOpen,
  Heart,
  Target,
  Eye,
  CheckCircle,
  MapPin
} from "lucide-react";

export const metadata: Metadata = {
  title: "About UBTA",
  description:
    "Learn about United Boda Transport Association — our mission, vision, history, and what we stand for as we empower boda boda riders across Nairobi and beyond.",
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[#0B1220] min-h-screen text-slate-200 block">
      
      {/* ── HERO SECTION ────────────────────────────────────────── */}
      <section className="relative bg-[#0B1220] overflow-hidden w-full block py-20 lg:py-28 border-b border-slate-800/50">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-green-600 to-orange-500 z-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-600/10 border border-green-600/30 text-green-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
              <Users size={14} />
              Nairobi & Beyond
            </div>
            <h1 className="font-bold text-white text-5xl sm:text-6xl lg:text-7xl uppercase tracking-tight leading-none mb-6">
              About<br />
              <span className="text-orange-500">UBTA</span>
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-2xl mb-8">
              United Boda Transport Association was built for one reason — to give boda boda
              riders the structure, support, and financial opportunities they deserve.
              We are a movement, not just an association.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/register" className="bg-orange-500 hover:bg-orange-600 text-white inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all shadow-md shadow-orange-500/10">
                Become a Member <ArrowRight size={18} />
              </Link>
              <Link href="/sacco" className="border border-slate-700 hover:border-slate-500 text-white inline-flex items-center gap-2 font-bold px-6 py-3 rounded-xl transition-all bg-slate-900/40">
                Explore CBD SACCO
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white w-full block relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 relative z-10">

            {/* Mission Box */}
            <div className="relative bg-orange-500 block rounded-2xl p-8 lg:p-10 overflow-hidden shadow-xl min-h-[260px]">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shadow-inner">
                    <Target size={20} className="text-white" />
                  </div>
                  <span className="font-bold text-white text-xs uppercase tracking-widest">
                    Our Mission
                  </span>
                </div>
                <p className="text-white text-xl lg:text-2xl font-bold leading-snug">
                  To create a more professional and sustainable boda boda industry by supporting,
                  uniting, and empowering riders through structured leadership and financial growth.
                </p>
              </div>
            </div>

            {/* Vision Box */}
            <div className="relative bg-[#0B1220] block rounded-2xl p-8 lg:p-10 overflow-hidden shadow-xl min-h-[260px] border border-slate-800">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-600/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-slate-800">
                    <Eye size={20} className="text-green-400" />
                  </div>
                  <span className="font-bold text-slate-400 text-xs uppercase tracking-widest">
                    Our Vision
                  </span>
                </div>
                <p className="text-white text-xl lg:text-2xl font-bold leading-snug">
                  To provide reliable, safe, and tech-driven transport solutions while becoming
                  Kenya's most trusted SACCO — enhancing member welfare at every step.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── FIVE PILLARS SECTION ─────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50 w-full block border-t border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">
              Our five pillars
            </p>
            <h2 className="text-slate-900 font-bold text-3xl lg:text-4xl uppercase tracking-tight mb-4">
              What UBTA stands for
            </h2>
            <p className="text-slate-600 max-w-xl mx-auto text-base">
              Everything we do flows from these five commitments to our members and the
              wider boda boda community.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-6">
                <Shield size={22} className="text-orange-500" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg uppercase mb-3">Rider welfare</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Advocacy and representation ensuring every rider has a voice, protection, and support when it matters most.</p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-green-600/10 flex items-center justify-center mb-6">
                <Users size={22} className="text-green-600" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg uppercase mb-3">Member organisation</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Structured registration and leadership giving our members a formal identity and a seat at the table.</p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6">
                <TrendingUp size={22} className="text-teal-500" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg uppercase mb-3">Economic empowerment</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Connecting members to savings and financial opportunities through CBD SACCO — no bank account required.</p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6">
                <BookOpen size={22} className="text-amber-500" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg uppercase mb-3">Training & development</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Professional programs to improve rider safety, service standards, and long-term career prospects.</p>
            </div>

            {/* Pillar 5 */}
            <div className="bg-white border border-slate-200/80 p-6 sm:p-8 rounded-2xl shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center mb-6">
                <Heart size={22} className="text-rose-500" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg uppercase mb-3">Community building</h3>
              <p className="text-slate-600 text-sm leading-relaxed">A trusted network where riders support, protect, and grow alongside one another — stronger together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR STORY JOURNEY ──────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-white w-full block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-slate-900">
              <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">
                Our story
              </p>
              <h2 className="text-slate-900 font-bold text-3xl lg:text-4xl uppercase tracking-tight mb-6">
                Built from the ground up
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                UBTA was born out of a simple truth — boda boda riders are the backbone of
                urban transport in Kenya, yet they remain among the most underserved workers
                in the economy. No formal representation. No financial access. No structure.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6 text-sm sm:text-base">
                We set out to change that. Starting in Nairobi, UBTA brings riders together
                under a single organised umbrella — giving them identity, advocacy, and a
                real path to financial growth through CBD SACCO.
              </p>
              <p className="text-slate-700 font-medium leading-relaxed text-sm sm:text-base">
                Today, with over 500 registered members and agents across four major locations,
                UBTA is proving that when riders stand together, they move forward together.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative border-l border-slate-200 space-y-8 py-2">
              <div className="relative flex gap-6 pl-8 sm:pl-10">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-md border-2 border-white bg-[#0B1220] text-white">1</div>
                <div>
                  <div className="font-bold text-xs uppercase mb-1 tracking-wider text-slate-900">Founded</div>
                  <p className="text-slate-600 text-sm leading-relaxed">UBTA established in Nairobi to address the lack of structured representation for boda boda riders.</p>
                </div>
              </div>

              <div className="relative flex gap-6 pl-8 sm:pl-10">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-md border-2 border-white bg-[#0B1220] text-white">2</div>
                <div>
                  <div className="font-bold text-xs uppercase mb-1 tracking-wider text-slate-900">SACCO Launch</div>
                  <p className="text-slate-600 text-sm leading-relaxed">CBD United Boda Transport Co-Operative Society Limited registered, opening financial access for members.</p>
                </div>
              </div>

              <div className="relative flex gap-6 pl-8 sm:pl-10">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-md border-2 border-white bg-[#0B1220] text-white">3</div>
                <div>
                  <div className="font-bold text-xs uppercase mb-1 tracking-wider text-slate-900">Agent Network</div>
                  <p className="text-slate-600 text-sm leading-relaxed">Official agents established at Githurai 45, Ngara, Njiru, and Mlolongo to serve riders across Nairobi.</p>
                </div>
              </div>

              <div className="relative flex gap-6 pl-8 sm:pl-10">
                <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-md border-2 border-white bg-orange-500 text-white">4</div>
                <div>
                  <div className="font-bold text-xs uppercase mb-1 tracking-wider text-orange-500">Today</div>
                  <p className="text-slate-600 text-sm leading-relaxed">500+ registered members, growing savings pool, and an expanding network of empowered riders.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-[#0B1220] w-full block border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">
              What drives us
            </p>
            <h2 className="font-bold text-white text-3xl lg:text-4xl uppercase tracking-tight mb-4">
              Our core values
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-slate-800/80 rounded-2xl p-6 bg-slate-900/30">
              <div className="font-bold text-orange-500 text-3xl mb-4 leading-none">01</div>
              <h3 className="font-bold text-white text-base uppercase mb-2">Unity</h3>
              <p className="text-slate-400 text-sm leading-relaxed">We believe boda boda riders are stronger when they stand together under one organised voice.</p>
            </div>
            <div className="border border-slate-800/80 rounded-2xl p-6 bg-slate-900/30">
              <div className="font-bold text-orange-500 text-3xl mb-4 leading-none">02</div>
              <h3 className="font-bold text-white text-base uppercase mb-2">Integrity</h3>
              <p className="text-slate-400 text-sm leading-relaxed">We operate with transparency and honesty in all our dealings with members and partners.</p>
            </div>
            <div className="border border-slate-800/80 rounded-2xl p-6 bg-slate-900/30">
              <div className="font-bold text-orange-500 text-3xl mb-4 leading-none">03</div>
              <h3 className="font-bold text-white text-base uppercase mb-2">Empowerment</h3>
              <p className="text-slate-400 text-sm leading-relaxed">We equip riders with the tools, knowledge, and access they need to build better lives.</p>
            </div>
            <div className="border border-slate-800/80 rounded-2xl p-6 bg-slate-900/30">
              <div className="font-bold text-orange-500 text-3xl mb-4 leading-none">04</div>
              <h3 className="font-bold text-white text-base uppercase mb-2">Professionalism</h3>
              <p className="text-slate-400 text-sm leading-relaxed">We hold ourselves and our members to high standards of safety, conduct, and service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIP BENEFITS & AGENTS ──────────────────────── */}
      <section className="py-16 lg:py-24 bg-slate-50 w-full block border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Perks */}
            <div>
              <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">
                Membership benefits
              </p>
              <h2 className="text-slate-900 font-bold text-3xl lg:text-4xl uppercase tracking-tight mb-8">
                What you get as a member
              </h2>
              <div className="space-y-4">
                {[
                  "Official UBTA membership card & number",
                  "Motorbike QR code for verified identification",
                  "Access to CBD SACCO savings & loan program",
                  "Legal representation and rider advocacy",
                  "Safety and professionalism training programs",
                  "Access to agent network at 4 Nairobi locations",
                  "UBTA reflector jacket for on-road visibility",
                  "A trusted community of fellow riders",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-green-600 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm sm:text-base font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Map Stage Box */}
            <div className="space-y-4">
              <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">
                Find us
              </p>
              <h2 className="text-slate-900 font-bold text-3xl lg:text-4xl uppercase tracking-tight mb-8">
                Agent locations
              </h2>
              <div className="grid gap-3 w-full">
                <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-xs shrink-0">1</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">Githurai 45</span>
                    <span className="text-slate-500 text-xs font-medium">Githurai Terminal</span>
                  </div>
                  <MapPin size={16} className="text-orange-500 ml-auto shrink-0" />
                </div>

                <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-xs shrink-0">2</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">Ngara – Fig Tree</span>
                    <span className="text-slate-500 text-xs font-medium">Fig Tree Flyover</span>
                  </div>
                  <MapPin size={16} className="text-orange-500 ml-auto shrink-0" />
                </div>

                <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl p-4">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-xs shrink-0">3</div>
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 text-xs sm:text-sm uppercase tracking-wide">Njiru – Kangundo Road</span>
                    <span className="text-slate-500 text-xs font-medium">Njiru Shopping Centre</span>
                  </div>
                  <MapPin size={16} className="text-orange-500 ml-auto shrink-0" />
                </div>

              </div>

              {/* Office Contact Callout */}
              <div className="bg-[#0B1220] rounded-2xl p-6 mt-8 border border-slate-800 shadow-xl">
                <p className="text-slate-500 text-xs uppercase font-bold tracking-wider mb-2">Office contact</p>
                <a href="tel:0714314342" className="font-bold text-white text-2xl sm:text-3xl hover:text-orange-400 transition-colors block mb-1 tracking-tight">
                  0714 314 342
                </a>
                <p className="text-slate-400 text-xs">Call or WhatsApp · Mon to Sat, 8am–6pm</p>
                <a href="https://wa.me/254714314342?text=Hello%20UBTA" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-5 bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-colors shadow-md">
                  <Phone size={14} /> Chat on WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-24 bg-orange-500 w-full block text-center relative overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <h2 className="font-bold text-white text-4xl lg:text-5xl uppercase tracking-tight mb-4">
            Be part of the movement
          </h2>
          <p className="text-orange-100 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
            Over 500 riders have already taken the step. Register today for Ksh 1,000
            and start your journey with UBTA and CBD SACCO.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auth/register" className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-orange-600 font-bold px-6 py-3 rounded-xl transition-colors shadow-md">
              Register Now <ArrowRight size={18} />
            </Link>
            <Link href="/leadership" className="inline-flex items-center gap-2 border-2 border-white/90 hover:bg-white/10 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Meet the Leadership
            </Link>
          </div>
          <p className="mt-10 text-orange-100/80 text-xs font-semibold tracking-wider uppercase">
            Stronger Together · Safer Together · Growing Together
          </p>
        </div>
      </section>

    </div>
  );
}