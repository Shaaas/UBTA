"use client";

import React from 'react';
import Link from 'next/link';
import { UBTA_CONFIG } from '../config';

export default function HomePage() {
  return (
    <div className="bg-[#0B0F19] text-white min-h-[calc(100vh-73px)] flex flex-col relative">
      
      {/* Dynamic Bi-Color Trim Accent Line from Screen Layout */}
      <div className="w-full h-[3px] flex sticky top-[73px] z-40">
        <div className="bg-[#F37121] h-full flex-grow" />
        <div className="bg-[#00A651] h-full flex-grow" />
      </div>

      {/* Main Hero Container Core */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Text Column: Structural Messaging (7-span column width) */}
          <div className="space-y-8 lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Tag Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F37121]/10 border border-[#F37121]/20">
              <span className="w-2 h-2 rounded-full bg-[#F37121] animate-pulse" />
              <span className="text-xs font-bold text-[#F37121] tracking-wide">Nairobi & Beyond</span>
            </div>

            {/* High-Impact Headline Text Block */}
            <h1 className="text-5xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white">
              United.<br />
              <span className="text-[#F37121]">Stronger.</span><br />
              Growing.
            </h1>

            {/* Core Description Text Body */}
            <p className="text-base sm:text-lg text-gray-400 leading-relaxed font-medium max-w-xl">
              UBTA empowers boda boda riders through structured leadership, member welfare, and financial growth via CBD SACCO — Kenya’s most trusted riders’ co-operative.
            </p>

            {/* Layout Primary Button Actions Container */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <Link href="/register" className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#F37121] text-white text-sm font-black rounded-xl hover:bg-[#d65f17] transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#F37121]/10 group">
                Join UBTA Today
                <span className="text-base transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <Link href="/sacco" className="px-6 py-3.5 bg-transparent text-[#F37121] text-sm font-black rounded-xl border border-[#F37121]/40 hover:border-[#F37121] hover:bg-[#F37121]/5 transition-all transform hover:-translate-y-0.5">
                About CBD SACCO
              </Link>
            </div>

            {/* Compliance Note Baseline Check */}
            <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold pt-2">
              <span className="text-[#00A651] text-sm">✔</span>
              <span>Registration: Ksh 1,000 · Pay via M-Pesa Paybill</span>
            </div>

          </div>

          {/* Right Column: Custom Badge Asset Overlay Layout (5-span column width) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end items-center relative w-full py-8">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center rounded-full border-[3px] border-[#F37121]/20 bg-[#111827]/30 backdrop-blur-xl group hover:border-[#F37121]/40 transition-all duration-300">
              
              {/* Outer Shadow Ring Core */}
              <div className="absolute inset-4 rounded-full border border-gray-800 bg-[#0B0F19]/90 flex flex-col items-center justify-center p-6 text-center shadow-2xl">
                <span className="text-4xl font-black text-[#F37121] tracking-tight mb-1 group-hover:scale-105 transition-transform duration-300">
                  UBTA
                </span>
                <span className="text-[11px] font-bold text-gray-400 tracking-normal max-w-[140px] leading-tight">
                  United Boda Transport Assoc.
                </span>
              </div>

              {/* Verified Verification Accent Capsule Tag */}
              <div className="absolute bottom-6 right-2 sm:right-4 inline-flex items-center gap-1 px-3 py-1 bg-[#00A651] text-white rounded-full font-black text-[10px] uppercase tracking-wider shadow-md">
                CBD SACCO <span>✓</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Down Scroll Indicator Icon Anchor Node */}
      <div className="w-full flex justify-center pb-8">
        <div className="w-10 h-10 rounded-full bg-[#111827] border border-gray-800 flex items-center justify-center text-gray-400 shadow-md">
          <span className="text-sm font-bold animate-bounce">↓</span>
        </div>
      </div>

      {/* Compliance Requirements Grid Container (Positioned right before footer) */}
      <div className="border-t border-gray-800/60 bg-[#111827]/20 w-full py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#111827]/60 border border-gray-800 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-[#2096D4] rounded" /> Mandatory Member Compliance Assets
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              Make sure you pay directly at our central office or verified digital gateway nodes. Payment validation is tracked exclusively across active account nodes.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#0B0F19] border border-gray-800 rounded-xl">
                <span className="text-xs font-bold text-gray-500 block uppercase">Motorbike QR Code</span>
                <span className="text-xl font-black text-[#00A651] font-mono block mt-2">Ksh {UBTA_CONFIG?.FEES?.MOTORBIKE_QR || "200"}</span>
                <span className="text-[10px] text-gray-400 block mt-1">Reflective digital tracking asset tag</span>
              </div>
              <div className="p-4 bg-[#0B0F19] border border-gray-800 rounded-xl">
                <span className="text-xs font-bold text-gray-500 block uppercase">Official Member Card</span>
                <span className="text-xl font-black text-[#F37121] font-mono block mt-2">Ksh {UBTA_CONFIG?.FEES?.MEMBER_CARD || "300"}</span>
                <span className="text-[10px] text-gray-400 block mt-1">Physical barcode smart validation key</span>
              </div>
              <div className="p-4 bg-[#0B0F19] border border-gray-800 rounded-xl">
                <span className="text-xs font-bold text-gray-500 block uppercase">UBTA Reflector Jacket</span>
                <span className="text-xl font-black text-white font-mono block mt-2">From Ksh 500</span>
                <span className="text-[10px] text-gray-400 block mt-1">Available operational tiers: 500, 700, 1,000</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}