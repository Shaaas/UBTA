"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "CBD SACCO",  href: "/sacco" },
  { label: "Services",   href: "/services" },
  { label: "Gallery",    href: "/gallery" },
  { label: "News",       href: "/news" },
  { label: "Verify",     href: "/verify" },
  { label: "Contact",    href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#0B1220]/95 border-b border-slate-800/60 sticky top-0 z-50 backdrop-blur-md">
        {/* Top accent bar matching operational brand colors */}
        <div className="h-[2px] bg-gradient-to-r from-[#F37121] via-[#00A651] to-[#F37121]" />

        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">

          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 focus:outline-none shrink-0">
            <div className="bg-white p-1 rounded-full shadow-md flex items-center justify-center h-10 w-10 min-w-[40px]">
              <Image
                src="/logo.jpeg"
                alt="UBTA Logo"
                width={36}
                height={36}
                className="object-contain rounded-full"
                priority
              />
            </div>
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-sm font-black tracking-tight text-white">UBTA</span>
              <span className="text-[10px] text-slate-400 font-medium">United Boda Transport Association</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150 whitespace-nowrap
                    ${active
                      ? "text-[#F37121] bg-[#F37121]/10"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              href="/register"
              className="px-4 py-2 bg-[#F37121] hover:bg-[#d65d14] text-white text-xs font-bold rounded-lg transition-colors whitespace-nowrap"
            >
              Register
            </Link>
            <Link
              href="/auth/login"
              className="px-4 py-2 bg-transparent text-white text-xs font-bold rounded-lg border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50 transition-all whitespace-nowrap"
            >
              Member Login
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-[#0B1220] px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors
                  ${pathname === link.href
                    ? "text-[#F37121] bg-[#F37121]/10"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-800 mt-3 flex flex-col gap-2">
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 bg-[#F37121] hover:bg-[#d65d14] text-white text-sm font-bold rounded-lg transition-colors"
              >
                Register
              </Link>
              <Link
                href="/auth/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2.5 border border-slate-700 text-white text-sm font-bold rounded-lg hover:bg-slate-800/50 transition-colors"
              >
                Member Login
              </Link>
              <Link
                href="/auth/admin"
                onClick={() => setMobileOpen(false)}
                className="block text-center px-4 py-2 text-slate-500 hover:text-slate-400 text-xs font-semibold transition-colors"
              >
                Admin Login
              </Link>
            </div>
          </div>
        )}
      </nav>
      <div className="w-full h-[3px] flex"><div className="bg-[#F37121] h-full flex-grow" /><div className="bg-[#00A651] h-full flex-grow" /></div>
    </>
  );
}