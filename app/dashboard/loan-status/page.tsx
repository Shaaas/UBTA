'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, DollarSign, FileText, HelpCircle, Scale } from 'lucide-react';

interface RiderProfile {
  id: string;
  sacco_balance?: number;
  [key: string]: any;
}

interface LoanRecord {
  amount: number;
  term_months: number;
  monthly_repayment: number;
  status: 'pending' | 'approved' | 'active' | 'rejected';
  created_at: string;
}

// Safe build-time evaluation guards
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Initialize ONCE outside the component scope
const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

export default function LoanStatusPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Account Metrics State
  const [riderProfile, setRiderProfile] = useState<RiderProfile | null>(null);
  const [existingLoan, setExistingLoan] = useState<LoanRecord | null>(null);

  // Form Interactive Calculator State
  const [requestedAmount, setRequestedAmount] = useState<number>(0);
  const [repaymentMonths, setRepaymentMonths] = useState<number>(12);
  const [guarantorPhone, setGuarantorPhone] = useState<string>('');

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
      Loading(false);
    };

    FetchLoanMetrics();
  }, [router]);

  Const rawSaccoBalance = Number(riderProfile?.sacco_balance || 0);
  Const maxEligibleLoan = rawSaccoBalance * 3;
  
  // Custom SACCO Interest Formulation: Fixed 1% reducing balance per month
  Const estimatedInterest = requestedAmount * (0.01 * repaymentMonths);
  Const totalRepayment = requestedAmount + estimatedInterest;
  Const monthlyInstallment = repaymentMonths > 0 ? TotalRepayment / repaymentMonths : 0;

  Const handleLoanApplication = async (e: React.FormEvent) => {
    E.preventDefault();
    If (requestedAmount <= 0 || requestedAmount > maxEligibleLoan) {
      SetError(`Invalid amount. Your maximum allocation capacity is Ksh ${maxEligibleLoan.toLocaleString()}.`);
      Return;
    }
    If (!guarantorPhone) {
      SetError('An active peer guarantor mobile contact node is required.');
      Return;
    }

    SetError(null);
    SetSubmitting(true);

    Const { data: { user } } = await supabase.auth.getUser();

    Const { error: insertError } = await supabase
      .from('loans')
      .insert({
        User_id: user?.id,
        Amount: requestedAmount,
        Term_months: repaymentMonths,
        Guarantor_contact: guarantorPhone,
        Monthly_repayment: monthlyInstallment,
        Status: 'pending'
      });

    SetSubmitting(false);
    If (insertError) {
      SetError(insertError.message);
    } else {
      SetSuccess(true);
      SetExistingLoan({
        Amount: requestedAmount,
        Term_months: repaymentMonths,
        Monthly_repayment: monthlyInstallment,
        Status: 'pending',
        Created_at: new Date().toISOString()
      });
    }
  };

  If (loading) return <div className="text-slate-400 p-8">Loading Financial Metrics...</div>;

  Return (
    <div className="max-w-6xl mx-auto block w-full space-y-8 p-4 sm:p-6">
      
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
          <div className="flex items-center gap-2 text-[#F37121] text-xs font-bold uppercase tracking-wider mb-6">
            <Scale size={14} /> Allocation Adjustment Panel
          </div>

          {existingLoan ? (
            <div className="py-8 text-center bg-[#13141a]/40 border border-white/[0.01] rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4 text-amber-500">
                <FileText size={22} />
              </div>
              <h3 className="text-white font-semibold text-base uppercase tracking-wide">Application Lockout Active</h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto mt-2 leading-relaxed">
                You have an active <span className="text-[#F37121] font-bold">{existingLoan.status}</span> credit asset record in the processing pipeline hierarchy. Members cannot launch concurrent loan requests.
              </p>
            </div>
          ) : maxEligibleLoan === 0 ? (
            <div className="py-8 text-center bg-[#13141a]/40 border border-white/[0.01] rounded-xl p-6">
              <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-4 text-red-400">
                <AlertCircle size={22} />
              </div>
              <h3 className="text-white font-semibold text-base uppercase tracking-wide">Zero Borrowing Allocation</h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto mt-2 leading-relaxed">
                Your current CBD SACCO account deposit balance is Ksh 0. Add digital savings to activate your borrowing pipeline factor.
              </p>
            </div>
          ) : (
            <form onSubmit={handleLoanApplication} className="space-y-6">
              {success && (
                <div className="flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 p-4 rounded-xl">
                  <CheckCircle2 size={14} className="shrink-0 mt-0.5" />
                  <span>Loan application transmitted successfully into clearance queue.</span>
                </div>
              )}

              {/* Slider for Requested Value */}
              <div>
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  <span>Borrowing Value Request</span>
                  <span className="text-white font-bold">Ksh {requestedAmount.toLocaleString()}</span>
                </div>
                <input
                  Type="range"
                  Min={1000}
                  Max={maxEligibleLoan}
                  Step={500}
                  Value={requestedAmount}
                  OnChange={(e) => setRequestedAmount(Number(e.target.value))}
                  ClassName="w-full h-2 bg-[#13141a] rounded-lg appearance-none cursor-pointer accent-[#F37121]"
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
                  Value={repaymentMonths}
                  OnChange={(e) => setRepaymentMonths(Number(e.target.value))}
                  ClassName="w-full bg-[#13141a] border border-white/[0.04] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F37121]/50"
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
                  UBTA Registered Peer Guarantor Phone <span className="text-[#F37121]">*</span>
                </label>
                <input
                  Type="tel"
                  Placeholder="e.g. 0722000000"
                  Value={guarantorPhone}
                  OnChange={(e) => setGuarantorPhone(e.target.value)}
                  Required
                  ClassName="w-full bg-[#13141a] border border-white/[0.04] rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-700 focus:outline-none focus:border-[#F37121]/50"
                />
              </div>

              {error && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-xs text-red-400 p-4 rounded-xl">
                  <AlertCircle size={14} className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                Type="submit"
                Disabled={submitting}
                ClassName="w-full bg-[#F37121] hover:bg-[#d65d14] disabled:opacity-50 text-white text-xs font-bold py-2.5 rounded-lg transition-colors"
              >
                {submitting ? "Submitting Request..." : "Apply for Loan"}
              </button>
            </form>
          )}
        </div>

        {/* RIGHT COLUMN: ACCOUNT SUMMARY STATUS DESK (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-[#1a1b23] border border-white/[0.01] rounded-2xl p-6 shadow-xl">
            <h3 className="text-white font-bold text-xs uppercase tracking-wider mb-4 flex items-center gap-2 text-[#00A651]">
              <DollarSign size={14} /> Financial Standing Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/[0.02] pb-3">
                <span className="text-xs text-slate-400">Total SACCO Deposits</span>
                <span className="text-sm font-bold text-white font-mono">Ksh {rawSaccoBalance.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/[0.02] pb-3">
                <span className="text-xs text-slate-400">Max Borrowing Capacity</span>
                <span className="text-sm font-bold text-[#00A651] font-mono">Ksh {maxEligibleLoan.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs text-slate-400">Estimated Installment</span>
                <span className="text-sm font-bold text-[#F37121] font-mono">Ksh {monthlyInstallment.toLocaleString()}/mo</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}