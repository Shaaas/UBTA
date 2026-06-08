"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { UBTA_CONFIG } from '../config';

export default function HomePage() {
  return (
    <div 
      className="bg-[#0B0F19] text-white min-h-[calc(100vh-73px)] flex flex-col relative bg-cover bg-right lg:bg-center bg-no-repeat bg-fixed overflow-x-hidden"
      style={{ backgroundImage: "url('/bike%201.jpg')" }}
    >
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F19] via-[#0B0F19]/80 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-transparent to-[#0B0F19]/40 pointer-events-none z-0" />

      <div className="w-full h-[3px] flex sticky top-[73px] z-40">
        <div className="bg-[#F37121] h-full flex-grow" />
        <div className="bg-[#00A651] h-full flex-grow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
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
              UBTA empowers boda boda riders through structured leadership, member welfare, and financial growth via CBD SACCO — Kenya&apos;s most trusted riders&apos; co-operative.
            </p>

            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F37121] text-white text-sm font-black rounded-xl hover:bg-[#d65f17] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#F37121]/20 group">
                Join UBTA Today
                <span className="text-base transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/sacco" className="px-6 py-3.5 bg-slate-950/40 text-[#F37121] text-sm font-black rounded-xl border border-[#F37121]/40 hover:border-[#F37121] hover:bg-[#F37121]/5 transition-all transform hover:-translate-y-0.5 backdrop-blur-md">
                About CBD SACCO
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold pt-2 bg-slate-950/20 px-3 py-1.5 rounded-lg border border-slate-800/40 backdrop-blur-sm">
              <span className="text-[#00A651] text-sm">✔</span>
              <span>Registration: Ksh 1,000 · Pay via M-Pesa Paybill</span>
            </div>

          </div>

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

      {/* Emergency & Contact Directory */}
      <div className="border-t border-gray-800/60 bg-[#111827]/40 backdrop-blur-md w-full py-10 relative z-10">
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

      {/* Compliance Requirements Grid */}
      <div className="border-t border-gray-800/60 bg-[#111827]/40 backdrop-blur-md w-full py-12 mt-auto relative z-10">
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
                    <Image 
                      src="/qrcode.png" 
                      alt="Motorbike QR Code" 
                      fill
                      className="object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-[1.02]"
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-500 block uppercase">Motorbike QR Code</span>
                  <span className="text-xl font-black text-[#00A651] font-mono block mt-1">Ksh {UBTA_CONFIG?.FEES?.MOTORBIKE_QR || "200"}</span>
                </div>
                <span className="text-[10px] text-gray-400 block mt-2">Reflective digital tracking asset tag</span>
              </div>

              <div className="p-5 bg-[#0B0F19]/90 border border-gray-800 rounded-xl backdrop-blur-sm flex flex-col justify-between group">
                <div>
                  <div className="relative w-full h-48 bg-black/40 rounded-lg mb-4 overflow-hidden border border-gray-800/60 flex items-center justify-center p-3">
                    <Image 
                      src="/member%20card.png" 
                      alt="Official Member Card" 
                      fill
                      className="object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-[1.02]"
                    />
                  </div>
                  <span className="text-xs font-bold text-gray-500 block uppercase">Official Member Card</span>
                  <span className="text-xl font-black text-[#F37121] font-mono block mt-1">Ksh {UBTA_CONFIG?.FEES?.MEMBER_CARD || "300"}</span>
                </div>
                <span className="text-[10px] text-gray-400 block mt-2">Physical barcode smart validation key</span>
              </div>

              <div className="p-5 bg-[#0B0F19]/90 border border-gray-800 rounded-xl backdrop-blur-sm flex flex-col justify-between group">
                <div>
                  <div className="relative w-full h-48 bg-black/40 rounded-lg mb-4 overflow-hidden border border-gray-800/60 flex items-center justify-center p-3">
                    <Image 
                      src="/reflectorjacket.png" 
                      alt="UBTA Reflector Jacket" 
                      fill
                      className="object-contain opacity-75 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-[1.02]"
                    />
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
