'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { AlertCircle, CheckCircle2, DollarSign, FileText, Scale } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function LoanStatusPage() {
  const router = useRouter();
  const [supabase, setSupabase] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [riderProfile, setRiderProfile] = useState<any>(null);
  const [existingLoan, setExistingLoan] = useState<any>(null);
  const [requestedAmount, setRequestedAmount] = useState<number>(0);
  const [repaymentMonths, setRepaymentMonths] = useState<number>(12);
  const [guarantorPhone, setGuarantorPhone] = useState<string>('');

  useEffect(() => {
    const client = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    setSupabase(client);
  }, []);

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

  if (!supabase || loading) return <div className="text-slate-400 p-8">Initializing secure connection...</div>;

  return (
    <div className="max-w-6xl mx-auto block w-full space-y-8 p-4 sm:p-6">
      <h2 className="text-2xl font-semibold text-white">Credit Facility & Asset Financing</h2>
      {/* ... rest of your UI ... */}
    </div>
  );
}