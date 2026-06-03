"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, CreditCard, Mail, Lock, ArrowRight, ShieldCheck, User } from "lucide-react";

type Tab = "member" | "admin";

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>("member");

  // Member login state
  const [phone, setPhone] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [memberLoading, setMemberLoading] = useState(false);
  const [memberError, setMemberError] = useState<string | null>(null);

  // Admin login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState<string | null>(null);

  const handleMemberLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMemberError(null);
    setMemberLoading(true);
    try {
      const res = await fetch("/api/auth/member-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, idNumber }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMemberError(data.error || "Login failed. Check your details and try again.");
      } else {
        window.location.href = "/dashboard";
      }
    } catch {
      setMemberError("A network error occurred. Please try again.");
    } finally {
      setMemberLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    setAdminLoading(true);
    try {
      const res = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAdminError(data.error || "Invalid admin credentials.");
      } else {
        window.location.href = "/admin/dashboard";
      }
    } catch {
      setAdminError("A network error occurred. Please try again.");
    } finally {
      setAdminLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4 py-12">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-md relative">

        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-white rounded-full shadow-lg mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpeg" alt="UBTA" className="w-12 h-12 rounded-full object-contain" />
          </div>
          <h1 className="font-black text-white text-2xl uppercase tracking-tight">
            UBTA Portal
          </h1>
          <p className="text-slate-500 text-xs mt-1">United Boda Transport Association</p>
        </div>

        {/* Card */}
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">

          {/* Tab switcher */}
          <div className="flex border-b border-slate-800">
            <button
              onClick={() => { setTab("member"); setMemberError(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider transition-all
                ${tab === "member"
                  ? "text-white bg-slate-800/60 border-b-2 border-orange-500"
                  : "text-slate-500 hover:text-slate-300"
                }`}
            >
              <User size={14} /> Member Login
            </button>
            <button
              onClick={() => { setTab("admin"); setAdminError(null); }}
              className={`flex-1 flex items-center justify-center gap-2 py-4 text-xs font-bold uppercase tracking-wider transition-all
                ${tab === "admin"
                  ? "text-white bg-slate-800/60 border-b-2 border-orange-500"
                  : "text-slate-500 hover:text-slate-300"
                }`}
            >
              <ShieldCheck size={14} /> Admin Login
            </button>
          </div>

          <div className="p-6 sm:p-8">

            {/* ── MEMBER LOGIN ── */}
            {tab === "member" && (
              <form onSubmit={handleMemberLogin} className="space-y-5">
                <div>
                  <p className="text-slate-300 text-sm font-semibold mb-1">Welcome back, rider</p>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Sign in using your registered phone number and National ID.
                  </p>
                </div>

                {memberError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-xs">
                    {memberError}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Phone Number <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <Phone size={15} />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. 0712 345 678"
                      required
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3.5
                                 text-white text-sm placeholder:text-slate-600
                                 focus:outline-none focus:border-orange-500/60 focus:bg-slate-950
                                 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    National ID Number <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <CreditCard size={15} />
                    </div>
                    <input
                      type="text"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      placeholder="e.g. 12345678"
                      required
                      pattern="[0-9]{7,8}"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3.5
                                 text-white text-sm placeholder:text-slate-600
                                 focus:outline-none focus:border-orange-500/60 focus:bg-slate-950
                                 transition-all"
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500">Your 7 or 8 digit National ID number</p>
                </div>

                <button
                  type="submit"
                  disabled={memberLoading}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed
                             text-white font-bold text-sm uppercase tracking-wide py-3.5 rounded-xl
                             transition-all flex items-center justify-center gap-2"
                >
                  {memberLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>Sign In <ArrowRight size={16} /></>
                  )}
                </button>

                <p className="text-center text-slate-500 text-xs">
                  Not a member yet?{" "}
                  <Link href="/auth/register" className="text-orange-400 hover:text-orange-300 font-semibold">
                    Register here
                  </Link>
                </p>
              </form>
            )}

            {/* ── ADMIN LOGIN ── */}
            {tab === "admin" && (
              <form onSubmit={handleAdminLogin} className="space-y-5">
                <div>
                  <p className="text-slate-300 text-sm font-semibold mb-1">Admin access</p>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    Restricted to authorised UBTA administrators only.
                  </p>
                </div>

                {adminError && (
                  <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-xs">
                    {adminError}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Admin Email <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <Mail size={15} />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@ubta.co.ke"
                      required
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3.5
                                 text-white text-sm placeholder:text-slate-600
                                 focus:outline-none focus:border-orange-500/60 focus:bg-slate-950
                                 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                    Password <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                      <Lock size={15} />
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3.5
                                 text-white text-sm placeholder:text-slate-600
                                 focus:outline-none focus:border-orange-500/60 focus:bg-slate-950
                                 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={adminLoading}
                  className="w-full bg-slate-700 hover:bg-slate-600 disabled:opacity-60 disabled:cursor-not-allowed
                             text-white font-bold text-sm uppercase tracking-wide py-3.5 rounded-xl
                             transition-all flex items-center justify-center gap-2 border border-slate-600"
                >
                  {adminLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Authenticating...
                    </>
                  ) : (
                    <><ShieldCheck size={16} /> Admin Sign In</>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-slate-700 text-[11px] mt-6">
          © {new Date().getFullYear()} United Boda Transport Association · Kenya
        </p>
      </div>
    </div>
  );
}