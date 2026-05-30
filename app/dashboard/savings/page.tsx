'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { PiggyBank, Target, TrendingUp, ShieldCheck, Award } from 'lucide-react';

export default function SavingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [riderProfile, setRiderProfile] = useState<any>(null);

  const [supabase] = useState(() => 
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  useEffect(() => {
    const fetchSavingsData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setRiderProfile(profile);
      setLoading(false);
    };

    fetchSavingsData();
  }, [router, supabase]);

  if (loading) return <div className="text-slate-400 p-8">Loading savings analytics...</div>;

  const currentSavings = Number(riderProfile?.sacco_balance || 0);
  
  // Custom SACCO savings target settings
  const targetGoal = 50000; 
  const progressPercentage = Math.min(Math.round((currentSavings / targetGoal) * 100), 100);
  const multiFactorLoanCapacity = currentSavings * 3;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Top Meta Header */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Savings & Wealth Analytics</h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Track asset targets, audit structural liquidity reserves, and visualize active credit capacity growth.
        </p>
      </div>

      {/* Main Structural Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: VISUAL TARGET ACCELERATOR METER (7 Columns) */}
        <div className="lg:col-span-7 bg-[#1a1b23] border border-white/[0.01] rounded-2xl p-6 sm:p-8 shadow-xl space-y-8">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Target size={14} /> Capital Milestone Gauge
          </div>

          {/* Large Goal Analytics Status Ring Context */}
          <div className="bg-[#13141a]/50 border border-white/[0.01] p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs text-slate-500 font-medium">Active Target Blueprint</span>
              <h3 className="text-xl font-bold text-white tracking-tight">Ksh {targetGoal.toLocaleString()} Base Goal</h3>
              <p className="text-[11px] text-slate-400 max-w-xs leading-relaxed">
                Reaching this target unlocks premier capital access rings and provides enhanced structural account standing.
              </p>
            </div>
            
            {/* Minimal Digital Dial Meter Readout */}
            <div className="relative w-24 h-24 rounded-full border-4 border-white/[0.02] flex items-center justify-center bg-[#16171e]">
              <div className="text-center">
                <span className="text-xl font-black text-white">{progressPercentage}%</span>
                <p className="text-[8px] text-slate-500 uppercase font-bold tracking-wider mt-0.5">Filled</p>
              </div>
            </div>
          </div>

          {/* Premium Linear Progress Track Component */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-medium">
              <span className="text-slate-500">Accumulated Reserves</span>
              <span className="text-white font-bold">Ksh {currentSavings.toLocaleString()} / Ksh {targetGoal.toLocaleString()}</span>
            </div>
            <div className="w-full h-2.5 bg-[#13141a] rounded-full overflow-hidden p-0.5 border border-white/[0.02]">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Core SACCO Value Proposition Indicators Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-[#13141a]/30 border border-white/[0.02] rounded-xl flex gap-3 items-start">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 shrink-0">
                <TrendingUp size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Leveraged Capacity</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Your asset multiplier provides dynamic collateral matching, securing up to Ksh {multiFactorLoanCapacity.toLocaleString()} in credit facilities.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#13141a]/30 border border-white/[0.02] rounded-xl flex gap-3 items-start">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shrink-0">
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Dividend Security</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Savings deposits directly yield recurring prorated annual returns distributed at fiscal closing windows.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REWARD TIERS & ACCOUNT VERIFICATION NODES (5 Columns) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Quick Metrics Standalone Card */}
          <div className="bg-[#1a1b23] border border-white/[0.01] rounded-2xl p-6 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-xl flex items-center justify-center shrink-0">
              <PiggyBank size={22} />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-medium">Net Digital Reserves</span>
              <div className="text-2xl font-bold text-white tracking-tight mt-0.5">Ksh {currentSavings.toLocaleString()}</div>
            </div>
          </div>

          {/* Trackable Milestone Checkpoints Roadmap */}
          <div className="bg-[#1a1b23] border border-white/[0.01] rounded-2xl p-6 shadow-xl">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-5">Milestone Checkpoint Roadmap</h3>
            
            <div className="relative border-l border-white/[0.04] pl-5 ml-2.5 space-y-6">
              
              {/* Milestone item 1 */}
              <div className="relative">
                <div className={`absolute -left-[27px] top-0.5 w-3 h-3 rounded-full border-2 ${
                  currentSavings >= 10000 ? 'bg-emerald-500 border-emerald-500' : 'bg-[#1a1b23] border-slate-700'
                }`} />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">Bronze Gate</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Initial dynamic account registration and pool activation threshold.</p>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">Ksh 10k</span>
                </div>
              </div>

              {/* Milestone item 2 */}
              <div className="relative">
                <div className={`absolute -left-[27px] top-0.5 w-3 h-3 rounded-full border-2 ${
                  currentSavings >= 25000 ? 'bg-emerald-500 border-emerald-500' : 'bg-[#1a1b23] border-slate-700'
                }`} />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">Silver Tier Status</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Unlocks access to standard asset vehicle financing pathways.</p>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">Ksh 25k</span>
                </div>
              </div>

              {/* Milestone item 3 */}
              <div className="relative">
                <div className={`absolute -left-[27px] top-0.5 w-3 h-3 rounded-full border-2 ${
                  currentSavings >= 50000 ? 'bg-emerald-500 border-emerald-500' : 'bg-[#1a1b23] border-slate-700'
                }`} />
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wide">Gold Elite Tier</h4>
                    <p className="text-[10px] text-slate-500 mt-0.5">Unlocks emergency credit fast-tracks and premium dividend weight factors.</p>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">Ksh 50k</span>
                </div>
              </div>

            </div>
          </div>

          {/* Micro Account Badge Placement Context */}
          {currentSavings >= targetGoal && (
            <div className="bg-gradient-to-r from-emerald-950/20 to-teal-950/20 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-3 text-emerald-400">
              <Award size={18} className="shrink-0" />
              <span className="text-[11px] font-medium leading-tight">
                Maximum structural goal achieved! Your standing ranks inside the premier high-liquidity class pool.
              </span>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}