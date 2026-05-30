'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, DollarSign, FileText, HelpCircle, Scale } from 'lucide-react';

export default function LoanStatusPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Account Metrics State
  const [riderProfile, setRiderProfile] = useState<any>(null);
  const [existingLoan, setExistingLoan] = useState<any>(null);

  // Form Interactive Calculator State
  const [requestedAmount, setRequestedAmount] = useState<number>(0);
  const [repaymentMonths, setRepaymentMonths] = useState<number>(12);
  const [guarantorPhone, setGuarantorPhone] = useState<string>('');

  const [supabase] = useState(() => 
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  useEffect(() => {
    const fetchLoanMetrics = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // 1. Fetch dynamic rider balance data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setRiderProfile(profile);
      
      // Default initial calculator layout view to their baseline max eligibility ceiling
      const initialMax = Number(profile?.sacco_balance || 0) * 3;
      setRequestedAmount(initialMax > 10000 ? 10000 : initialMax);

      // 2. Scan for any existing active loans to prevent double dipping
      const { data: loanRecord } = await supabase
        .from('loans')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['pending', 'approved', 'active'])
        .maybeSingle();

      setExistingLoan(loanRecord);
      setLoading(false);
    };

    fetchLoanMetrics();
  }, [router, supabase]);

  const rawSaccoBalance = Number(riderProfile?.sacco_balance || 0);
  const maxEligibleLoan = rawSaccoBalance * 3;
  
  // Custom SACCO Interest Formulation: Fixed 1% reducing balance per month
  const estimatedInterest = requestedAmount * (0.01 * repaymentMonths);
  const totalRepayment = requestedAmount + estimatedInterest;
  const monthlyInstallment = totalRepayment / repaymentMonths;

  const handleLoanApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (requestedAmount <= 0 || requestedAmount > maxEligibleLoan) {
      setError(`Invalid amount. Your maximum allocation capacity is Ksh ${maxEligibleLoan.toLocaleString()}.`);
      return;
    }
    if (!guarantorPhone) {
      setError('An active peer guarantor mobile contact node is required.');
      return;
    }

    setError(null);
    setSubmitting(true);

    const { data: { user } } = await supabase.auth.getUser();

    const { error: insertError } = await supabase
      .from('loans')
      .insert({
        user_id: user?.id,
        amount: requestedAmount,
        term_months: repaymentMonths,
        guarantor_contact: guarantorPhone,
        monthly_repayment: monthlyInstallment,
        status: 'pending'
      });

    setSubmitting(false);
    if (insertError) {
      setError(insertError.message);
    } else {
      setSuccess(true);
      setExistingLoan({
        amount: requestedAmount,
        term_months: repaymentMonths,
        monthly_repayment: monthlyInstallment,
        status: 'pending',
        created_at: new Date().toISOString()
      });
    }
  };

  if (loading) return <div className="text-slate-400 p-8">Loading Financial Metrics...</div>;

  return (
    <div className="max-w-6xl mx-auto block w-full space-y-8">
      
      {/* View Header Meta Title */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Credit Facility & Asset Financing</h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Calculate interest matrices, monitor active balances, and register dynamic micro-loan requests.
        </p>
      </div>

      {/* Grid: Left Column Calculator, Right Column Status Desk */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT CARD STAGE: DYNAMIC CREDIT CALCULATOR FORM (7 Columns) */}
        <div className="lg:col-span-7 bg-[#1a1b23] border border-white/[0.01] rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-6">
            <Scale size={14} /> Allocation Adjustment Panel
          </div>

          {existingLoan ? (
            <div className="py-8 text-center bg-[#13141a]/40 border border-white/[0.01] rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-500">
                <FileText size={22} />
              </div>
              <h3 className="text-white font-semibold text-base uppercase tracking-wide">Application Lockout Active</h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto mt-2 leading-relaxed">
                You have a {existingLoan.status} credit asset record in processing pipeline hierarchy. Members cannot launch concurrent loan requests.
              </p>
            </div>
          ) : maxEligibleLoan === 0 ? (
            <div className="py-8 text-center bg-[#13141a]/40 border border-white/[0.01] rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-red-400">
                <AlertCircle size={22} />
              </div>
              <h3 className="text-white font-semibold text-base uppercase tracking-wide">Zero Borrowing Allocation</h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto mt-2 leading-relaxed">
                Your current CBD SACCO account deposit balance is Ksh 0. Add digital savings to activate your $Ksh\ \text{Savings} \times 3$ borrowing pipeline factor.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLoanApplication} className="space-y-6">
              
              {/* Slider for Requested Value */}
              <div>
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  <span>Borrowing Value Request</span>
                  <span className="text-white font-bold">Ksh {requestedAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={maxEligibleLoan}
                  step={500}
                  value={requestedAmount}
                  onChange={(e) => setRequestedAmount(Number(e.target.value))}
                  className="w-full h-2 bg-[#13141a] rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-medium mt-1">
                  <span>Min: Ksh 1,000</span>
                  <span>Max Limit: Ksh {maxEligibleLoan.toLocaleString()}</span>
                </div>
              </div>

              {/* Repayment Matrix Terms */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Amortization Duration Framework
                </label>
                <select
                  value={repaymentMonths}
                  onChange={(e) => setRepaymentMonths(Number(e.target.value))}
                  className="w-full bg-[#13141a] border border-white/[0.04] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50"
                >
                  <option value={3}>3 Months (Short Term Float)</option>
                  <option value={6}>6 Months (Standard Turnaround)</option>
                  <option value={12}>12 Months (Extended Asset Path)</option>
                  <option value={24}>24 Months (Premium Capital Line)</option>
                </select>
              </div>

              {/* Guarantor Contact Check */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  UBTA Registered Peer Guarantor Phone <span className="text-orange-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0722000000"
                  value={guarantorPhone}
                  onChange={(e) => setGuarantorPhone(e.target.value)}
                  required
                  className="w-full bg-[#13141a] border border-white/[0.04] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-orange-500/50"
                />
              </div>

              {error && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-xs text-red-400 p-4 rounded-xl">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition"
              >
                {submitting ? '