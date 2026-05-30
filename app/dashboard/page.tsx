'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [riderData, setRiderData] = useState<any>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchRiderProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login');
        return;
      }
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setRiderData(profile);
      setLoading(false);
    };
    fetchRiderProfile();
  }, [router, supabase]);

  if (loading) return <div className="text-slate-400">Loading Dashboard...</div>;

  const nameToDisplay = riderData?.full_name ? riderData.full_name.split(' ')[0] : 'Member';
  const rawSaccoBalance = Number(riderData?.sacco_balance || 0);
  const loanEligibility = rawSaccoBalance * 3;
  const operationalZone = riderData?.current_operating_location || 'Not Set';
  const memberCreatedYear = riderData?.created_at ? new Date(riderData.created_at).getFullYear().toString().slice(-2) : '26';
  const shortId = riderData?.id_number ? riderData.id_number.slice(-4) : '0000';

  return (
    <>
      {/* Welcome Deck Info Block Row */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Welcome back, {nameToDisplay}</h2>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Member #UBTA-{memberCreatedYear}-{shortId} · <span className="text-emerald-500 font-semibold">Active</span>
          </p>
        </div>
        <div className="bg-[#241f1a] border border-[#402e23] px-4 py-1.5 rounded-full">
          <span className="text-xs font-semibold text-[#e57d38]">Zone: {operationalZone}</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-[#1a1b23] border border-white/[0.01] rounded-2xl p-6 shadow-xl">
          <span className="text-xs font-medium text-slate-400 tracking-wide">Total savings</span>
          <div className="text-2xl font-bold text-[#26b467] mt-3">Ksh {rawSaccoBalance.toLocaleString()}</div>
        </div>
        <div className="bg-[#1a1b23] border border-white/[0.01] rounded-2xl p-6 shadow-xl">
          <span className="text-xs font-medium text-slate-400 tracking-wide">Loan eligibility</span>
          <div className="text-2xl font-bold text-[#356ee7] mt-3">Ksh {loanEligibility.toLocaleString()}</div>
        </div>
        <div className="bg-[#1a1b23] border border-white/[0.01] rounded-2xl p-6 shadow-xl">
          <span className="text-xs font-medium text-slate-400 tracking-wide">Next contribution</span>
          <div className="text-2xl font-bold text-[#e07034] mt-3">Ksh 1,200</div>
        </div>
      </div>

      {/* Payment Table */}
      <div className="bg-[#1a1b23] rounded-2xl p-6 shadow-xl border border-white/[0.01]">
        <h3 className="text-md font-semibold text-white mb-5">Recent payments</h3>
        <table className="w-full text-left text-sm text-slate-300">
          <thead>
            <tr className="border-b border-white/[0.03] text-slate-500 text-xs font-medium uppercase">
              <th className="pb-4">Date</th>
              <th className="pb-4">Type</th>
              <th className="pb-4">Amount</th>
              <th className="pb-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.02]">
            <tr>
              <td className="py-4 text-slate-400">May 1, 2026</td>
              <td className="py-4">Monthly contribution</td>
              <td className="py-4 text-white font-semibold">Ksh 1,200</td>
              <td className="py-4 text-right"><span className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 text-[10px] px-2.5 py-1 rounded-full">Confirmed</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}