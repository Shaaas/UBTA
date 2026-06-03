'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, DollarSign, FileText, Scale } from 'lucide-react';
// Add this configuration object
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

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

export default function LoanStatusPage() {
  const router = useRouter();
  const [supabase, setSupabase] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [riderProfile, setRiderProfile] = useState<RiderProfile | null>(null);
  const [existingLoan, setExistingLoan] = useState<LoanRecord | null>(null);
  const [requestedAmount, setRequestedAmount] = useState<number>(0);
  const [repaymentMonths, setRepaymentMonths] = useState<number>(12);
  const [guarantorPhone, setGuarantorPhone] = useState<string>('');

  // 1. Initialize client ONLY in the browser
  useEffect(() => {
    const client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    setSupabase(client);
  }, []);

  // 2. Fetch data only when client is ready
  useEffect(() => {
    if (!supabase) return;

    const fetchLoanMetrics = async () => {
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
      const initialMax = Number(profile?.sacco_balance || 0) * 3;
      setRequestedAmount(initialMax > 10000 ? 10000 : initialMax);

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
  }, [supabase, router]);

  const rawSaccoBalance = Number(riderProfile?.sacco_balance || 0);
  const maxEligibleLoan = rawSaccoBalance * 3;
  const estimatedInterest = requestedAmount * (0.01 * repaymentMonths);
  const totalRepayment = requestedAmount + estimatedInterest;
  const monthlyInstallment = repaymentMonths > 0 ? totalRepayment / repaymentMonths : 0;

  const handleLoanApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    
    if (requestedAmount <= 0 || requestedAmount > maxEligibleLoan) {
      setError(`Invalid amount. Max capacity: Ksh ${maxEligibleLoan.toLocaleString()}.`);
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
    if (insertError) setError(insertError.message);
    else {
      setSuccess(true);
      setExistingLoan({ amount: requestedAmount, term_months: repaymentMonths, monthly_repayment: monthlyInstallment, status: 'pending', created_at: new Date().toISOString() });
    }
  };

  // Render guard: Wait for initialization
  if (!supabase || loading) return <div className="text-slate-400 p-8">Initializing secure connection...</div>;

  return (
    // ... rest of your JSX remains exactly the same ...
    <div className="max-w-6xl mx-auto block w-full space-y-8 p-4 sm:p-6">
       {/* ... paste your existing JSX here ... */}
    </div>
  );
}