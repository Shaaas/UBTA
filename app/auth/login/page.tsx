'use client';

import React, { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data?.user) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid login details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-[85vh] w-full flex-col items-center justify-center bg-[#050507] px-4 font-sans antialiased selection:bg-white selection:text-black">
      
      {/* Soft Background Radial Atmosphere for Depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-[420px] z-10">
        {/* Crisp Card Container with Clean Borders */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-[#0d0d12]/90 p-8 sm:p-10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl">
          
          {/* Top Edge Highlight for Structural Definition */}
          <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />

          {/* Header */}
          <div className="mb-8 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              Internal Portal
            </span>
            <h1 className="mt-4 text-3xl font-extralight tracking-tight text-white">
              UBTA<span className="text-emerald-400">.</span>
            </h1>
            <p className="mt-3 text-xs text-neutral-300 font-light leading-relaxed">
              Enter your credentials to synchronize and securely manage your rider profile.
            </p>
          </div>

          {/* Error Handler */}
          {errorMessage && (
            <div className="mb-5 rounded-lg bg-red-950/40 border border-red-500/30 px-4 py-3 text-[11px] text-red-300 font-light backdrop-blur-md">
              {errorMessage}
            </div>
          )}

          {/* Input Grid */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-200 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="rider.35134192@ubta.co.ke"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/[0.1] bg-[#121218]/80 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-300 focus:border-white/30 focus:bg-black focus:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
              />
            </div>

            <div>
              <label className="block text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-200 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/[0.1] bg-[#121218]/80 px-4 py-3 text-sm text-white placeholder-neutral-600 outline-none transition-all duration-300 focus:border-white/30 focus:bg-black focus:shadow-[0_0_30px_rgba(255,255,255,0.02)]"
              />
            </div>

            {/* Crisp, Interactive Dark Button with Strong Borders */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full mt-4 overflow-hidden rounded-lg border border-white/20 bg-gradient-to-b from-neutral-900 to-neutral-950 px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-white shadow-xl transition-all duration-300 hover:from-neutral-800 hover:to-neutral-900 hover:border-white/40 active:scale-[0.985] disabled:opacity-30"
            >
              <span className="relative z-10">
                {loading ? 'Verifying Account...' : 'Sign In'}
              </span>
            </button>
          </form>
        </div>

        {/* System Monitoring Note */}
        <p className="mt-8 text-center text-[9px] font-medium tracking-[0.2em] uppercase text-neutral-500">
          Secure Environment // Monitored Connection
        </p>
      </div>
    </div>
  );
}