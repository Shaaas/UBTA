"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UBTA_CONFIG } from '../config';

// ── Floating WhatsApp Button ──────────────────────────────────────────────────
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254714314342?text=Hello%20UBTA%2C%20I%20would%20like%20to%20inquire%20about%20membership."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-4 py-3 rounded-full shadow-2xl shadow-[#25D366]/30 transition-all hover:scale-105 group"
      aria-label="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.112.549 4.094 1.508 5.814L0 24l6.335-1.493A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.369l-.36-.214-3.732.979.998-3.648-.235-.374A9.818 9.818 0 1112 21.818z"/>
      </svg>
      <span className="text-sm hidden sm:block">Chat with Us</span>
    </a>
  );
}

// ── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedCounter({ target, duration = 1500 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="bg-[#0B0F19] text-white min-h-[calc(100vh-73px)] flex flex-col relative overflow-x-hidden">

      <WhatsAppButton />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div
        className="relative bg-cover bg-right lg:bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/bike%201.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/80 to-transparent pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-[#0B0F19]/40 pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">

            {/* Left */}
            <div className="space-y-8 lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F37121]/10 border border-[#F37121]/20 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-[#F37121] animate-pulse" />
                <span className="text-xs font-bold text-[#F37121] tracking-wide">Nairobi & Beyond</span>
              </div>

              <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
                United.<br />
                <span className="text-[#F37121]">Stronger.</span><br />
                Growing.
              </h1>

              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-medium max-w-xl [text-shadow:_0_2px_4px_rgba(0,0,0,0.6)]">
                UBTA empowers boda boda riders through structured leadership, member welfare, and financial growth via CBD SACCO, Kenya&apos;s most trusted riders&apos; co-operative.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="text-2xl font-black text-[#F37121]">
                    {mounted ? <AnimatedCounter target={3900} /> : "3,900"}+
                  </p>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Members</p>
                </div>
                <div className="w-px bg-gray-700" />
                <div>
                  <p className="text-2xl font-black text-[#00A651]">47</p>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Counties</p>
                </div>
                <div className="w-px bg-gray-700" />
                <div>
                  <p className="text-2xl font-black text-white">Ksh 1,000</p>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Registration</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F37121] text-white text-sm font-black rounded-xl hover:bg-[#d65f17] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#F37121]/20 group">
                  Join UBTA Today
                  <span className="text-base transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
                <Link href="/sacco" className="px-6 py-3.5 bg-slate-950/40 text-[#F37121] text-sm font-black rounded-xl border border-[#F37121]/40 hover:border-[#F37121] hover:bg-[#F37121]/5 transition-all transform hover:-translate-y-0.5 backdrop-blur-md">
                  About CBD SACCO
                </Link>
              </div>

              {/* Paybill */}
              <div className="flex flex-wrap items-center gap-3 bg-slate-950/40 border border-slate-800/60 backdrop-blur-sm rounded-xl px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-[#00A651] text-sm">✔</span>
                  <span className="text-xs text-gray-400 font-semibold">Pay via M-Pesa</span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Paybill:</span>
                  <span className="text-sm font-black text-white font-mono tracking-wider">4146697</span>
                </div>
                <div className="w-px h-4 bg-gray-700" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Account:</span>
                  <span className="text-sm font-black text-[#F37121] font-mono">Registration / Savings</span>
                </div>
              </div>
            </div>

            {/* Right — Logo */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative w-full py-8">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center rounded-full border-[3px] border-[#F37121]/30 bg-[#0B0F19]/40 backdrop-blur-xl group hover:border-[#F37121]/60 transition-all duration-300 shadow-2xl shadow-black/80">
                <div className="absolute inset-4 rounded-full border border-gray-800/80 bg-[#0B0F19]/95 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
  <span className="text-4xl font-black text-[#F37121] tracking-tight mb-1 group-hover:scale-105 transition-transform duration-300">
    UBTA
  </span>
  <span className="text-[11px] font-bold text-gray-400 tracking-normal max-w-[140px] leading-tight">
    United Boda Transport Assoc.
  </span>
</div>
                <div className="absolute bottom-6 right-2 sm:right-4 inline-flex items-center gap-1 px-3 py-1 bg-[#00A651] text-white rounded-full font-black text-[10px] uppercase tracking-wider shadow-md">
                  CBD SACCO <span>✓</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="w-full flex justify-center pb-8 relative z-10">
          <div className="w-10 h-10 rounded-full bg-[#111827]/80 border border-gray-800 backdrop-blur-sm flex items-center justify-center text-gray-400 shadow-md">
            <span className="text-sm font-bold animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <div className="border-t border-gray-800/60 bg-[#111827]/40 backdrop-blur-md w-full py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-black text-[#F37121] uppercase tracking-widest">Simple Process</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">How to Join UBTA</h2>
            <p className="text-gray-400 text-sm mt-2 max-w-md mx-auto">Get registered and receive your official membership certificate in minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
            {/* connector line desktop */}
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-px bg-gradient-to-r from-[#F37121]/40 via-[#00A651]/40 to-[#F37121]/40 z-0" />

            {[
              {
                step: "01",
                color: "#F37121",
                title: "Register Online",
                desc: "Fill in your details on our registration page — name, ID, phone number and bike plate.",
                icon: "📝",
                cta: { label: "Register Now", href: "/register" },
              },
              {
                step: "02",
                color: "#00A651",
                title: "Pay via M-Pesa",
                desc: "Send Ksh 1,000 via M-Pesa Paybill 4146697, Account: Registration or Savings. Keep your receipt.",
                icon: "📱",
                cta: null,
              },
              {
                step: "03",
                color: "#2096D4",
                title: "Get Your Certificate",
                desc: "Admin verifies your payment and sends your official UBTA membership certificate via WhatsApp.",
                icon: "🏆",
                cta: { label: "Verify Status", href: "/verify" },
              },
            ].map((s) => (
              <div key={s.step} className="relative z-10 bg-[#0B0F19]/90 border border-gray-800 rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{s.icon}</span>
                  <span className="text-4xl font-black opacity-10" style={{ color: s.color }}>{s.step}</span>
                </div>
                <div>
                  <h3 className="font-black text-white text-lg">{s.title}</h3>
                  <p className="text-gray-400 text-sm mt-1 leading-relaxed">{s.desc}</p>
                </div>
                {s.cta && (
                  <Link href={s.cta.href}
                    className="mt-auto inline-flex items-center gap-1 text-xs font-black uppercase tracking-wide hover:gap-2 transition-all"
                    style={{ color: s.color }}>
                    {s.cta.label} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Certificate Preview ───────────────────────────────────────────── */}
      <div className="border-t border-gray-800/60 w-full py-14 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-black text-[#F37121] uppercase tracking-widest">Official Document</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">Your Membership Certificate</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every verified UBTA member receives an official PDF certificate with their member ID, name, and membership details — sent directly via WhatsApp.
              </p>
              <ul className="space-y-2">
                {[
                  "Official UBTA member number",
                  "Digitally generated & verifiable",
                  "Sent to your WhatsApp instantly",
                  "Required for county compliance",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-[#00A651] font-black">✔</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/verify"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#111827] border border-gray-700 text-white text-sm font-bold rounded-xl hover:border-[#F37121]/50 transition-all">
                Check Your Membership Status →
              </Link>
            </div>
           <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/60 bg-[#111827] p-6 min-h-[220px]">
  {/* Mock certificate */}
  <div className="border-2 border-[#F37121]/40 rounded-xl p-4 bg-[#0B0F19] h-full flex flex-col gap-3">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-[#F37121]/10 border border-[#F37121]/30 flex items-center justify-center">
          <span className="text-xs font-black text-[#F37121]">UBTA</span>
        </div>
        <div>
          <p className="text-[10px] font-black text-white">CBD UNITED BODA TRANSPORT</p>
          <p className="text-[9px] text-gray-500">CO-OPERATIVE SOCIETY LIMITED</p>
        </div>
      </div>
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-700 flex items-center justify-center">
        <span className="text-[8px] font-black text-white text-center leading-tight">UBTA<br/>✓</span>
      </div>
    </div>
    <div className="border-t border-b border-[#F37121]/20 py-2 text-center">
      <p className="text-base font-black text-white tracking-widest uppercase">Certificate</p>
      <p className="text-[9px] text-gray-400 tracking-widest">— OF MEMBERSHIP —</p>
    </div>
    <div className="text-center">
      <p className="text-[9px] text-gray-400 uppercase tracking-widest">This is to certify that</p>
      <p className="text-lg font-black text-white mt-1">John Doe Rider</p>
    </div>
    <p className="text-[9px] text-gray-400 text-center leading-relaxed">
      is a registered member of CBD United Boda Transport Co-Operative Society Limited (<span className="text-[#F37121]">UBTA</span>)
    </p>
    <div className="grid grid-cols-2 gap-2 mt-auto">
      <div className="bg-[#111827] rounded-lg p-2">
        <p className="text-[8px] text-gray-500 uppercase">Member ID</p>
        <p className="text-xs font-black text-[#F37121]">UBTA3921</p>
      </div>
      <div className="bg-[#111827] rounded-lg p-2">
        <p className="text-[8px] text-gray-500 uppercase">Date Joined</p>
        <p className="text-xs font-black text-white">18 Jun 2026</p>
      </div>
    </div>
    <div className="flex items-center justify-between mt-1">
      <div className="w-16 border-t border-gray-600 pt-1">
        <p className="text-[8px] text-gray-500">Chairperson</p>
      </div>
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-700 flex items-center justify-center">
        <span className="text-[7px] font-black text-white">SEAL</span>
      </div>
    </div>
  </div>
  <div className="absolute top-3 right-3 bg-[#F37121]/10 border border-[#F37121]/30 rounded-full px-2 py-0.5">
    <span className="text-[9px] font-black text-[#F37121]">SAMPLE</span>
  </div>
</div>
          </div>
        </div>
      </div>

      {/* ── Contact & Emergency ───────────────────────────────────────────── */}
      <div className="border-t border-gray-800/60 bg-[#111827]/40 backdrop-blur-md w-full py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#111827]/70 border border-gray-800/80 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#F37121] rounded" /> Contact & Emergency Directory
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              For registration, office details, or emergency support — reach UBTA leadership directly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-[#0B0F19]/90 border border-gray-800 rounded-xl">
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Registration / Office</span>
                <span className="text-sm font-bold text-white block">General Enquiries</span>
                <a href="tel:0714314342" className="text-[#F37121] font-mono font-black text-base hover:underline">0714 314 342</a>
              </div>
              <div className="p-4 bg-[#0B0F19]/90 border border-gray-800 rounded-xl">
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Arrest / Motorbike Emergency</span>
                <span className="text-sm font-bold text-white block mb-2">Leadership Contacts</span>
                <div className="space-y-1.5">
                  <div>
                    <span className="text-[10px] text-gray-400">Chairman</span><br />
                    <a href="tel:0715050260" className="text-[#00A651] font-mono font-black text-sm hover:underline">0715 050 260</a>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400">Secretary</span><br />
                    <a href="tel:0726571139" className="text-[#00A651] font-mono font-black text-sm hover:underline">0726 571 139</a>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400">Vice Chairman</span><br />
                    <a href="tel:0729550820" className="text-[#00A651] font-mono font-black text-sm hover:underline">0729 550 820</a>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-[#0B0F19]/90 border border-gray-800 rounded-xl">
                <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Nairobi County UBTA</span>
                <span className="text-sm font-bold text-white block">County Chairman</span>
                <a href="tel:0711715588" className="text-[#2096D4] font-mono font-black text-base hover:underline">0711 715 588</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Compliance Assets ─────────────────────────────────────────────── */}
      <div className="border-t border-gray-800/60 bg-[#111827]/40 backdrop-blur-md w-full py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#111827]/70 border border-gray-800/80 rounded-2xl p-6 md:p-8 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#2096D4] rounded" /> Mandatory Member Compliance Assets
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Make sure you pay directly at our central office or verified digital gateway nodes. Payment validation is tracked exclusively across active account nodes.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 bg-[#0B0F19]/90 border border-gray-800 rounded-xl backdrop-blur-sm flex flex-col justify-between group">
                <div>
                  <div className="relative w-full h-48 bg-black/40 rounded-lg mb-4 overflow-hidden border border-gray-800/60 flex items-center justify-center p-3">
                    <Image src="/qrcode.png" alt="Motorbike QR Code" fill className="object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-[1.02]" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 block uppercase">Motorbike QR Code</span>
                  <span className="text-xl font-black text-[#00A651] font-mono block mt-1">Ksh {UBTA_CONFIG?.FEES?.MOTORBIKE_QR || "200"}</span>
                </div>
                <span className="text-[10px] text-gray-400 block mt-2">Reflective digital tracking asset tag</span>
              </div>
              <div className="p-5 bg-[#0B0F19]/90 border border-gray-800 rounded-xl backdrop-blur-sm flex flex-col justify-between group">
                <div>
                  <div className="relative w-full h-48 bg-black/40 rounded-lg mb-4 overflow-hidden border border-gray-800/60 flex items-center justify-center p-3">
                    <Image src="/member%20card.png" alt="Official Member Card" fill className="object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-[1.02]" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 block uppercase">Official Member Card</span>
                  <span className="text-xl font-black text-[#F37121] font-mono block mt-1">Ksh {UBTA_CONFIG?.FEES?.MEMBER_CARD || "300"}</span>
                </div>
                <span className="text-[10px] text-gray-400 block mt-2">Physical barcode smart validation key</span>
              </div>
              <div className="p-5 bg-[#0B0F19]/90 border border-gray-800 rounded-xl backdrop-blur-sm flex flex-col justify-between group">
                <div>
                  <div className="relative w-full h-48 bg-black/40 rounded-lg mb-4 overflow-hidden border border-gray-800/60 flex items-center justify-center p-3">
                    <Image src="/reflectorjacket.png" alt="UBTA Reflector Jacket" fill className="object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-[1.02]" />
                  </div>
                  <span className="text-xs font-bold text-gray-500 block uppercase">UBTA Reflector Jacket</span>
                  <span className="text-xl font-black text-white font-mono block mt-1">From Ksh 500</span>
                </div>
                <span className="text-[10px] text-gray-400 block mt-2">Available operational tiers: 500, 700, 1,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}