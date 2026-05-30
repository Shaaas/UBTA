'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { CreditCard, ArrowUpRight, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export default function PaymentsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [amountToPay, setAmountToPay] = useState<string>('1200');
  const [mpesaNumber, setMpesaNumber] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [supabase] = useState(() => 
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  useEffect(() => {
    const fetchPaymentData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch profile to pre-fill their phone number if available
      const { data: profile } = await supabase
        .from('profiles')
        .select('phone_number')
        .eq('id', user.id)
        .single();
      
      if (profile?.phone_number) {
        setMpesaNumber(profile.phone_number);
      }

      // Fetch payment ledger records from the database
      const { data: payments, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (!error && payments) {
        setPaymentHistory(payments);
      }
      
      setLoading(false);
    };

    fetchPaymentData();
  }, [router, supabase]);

  const handleMpesaPush = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);
    setSubmitting(true);

    // Basic client validation
    if (!amountToPay || Number(amountToPay) <= 0) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid contribution amount.' });
      setSubmitting(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();

      // Log the pending intent into Supabase
      const { error: insertError } = await supabase
        .from('payments')
        .insert({
          user_id: user?.id,
          amount: Number(amountToPay),
          payment_type: 'Monthly contribution',
          phone_utilised: mpesaNumber,
          status: 'pending'
        });

      if (insertError) throw insertError;

      setStatusMessage({ 
        type: 'success', 
        text: 'STK Push prompt dispatched! Enter your M-Pesa PIN on your phone to authorize the transaction.' 
      });

      // Optimistically append the pending transaction to the list view
      setPaymentHistory(prev => [
        {
          id: 'temp-id-' + Date.now(),
          created_at: new Date().toISOString(),
          payment_type: 'Monthly contribution',
          amount: Number(amountToPay),
          status: 'pending'
        },
        ...prev
      ]);

    } catch (err: any) {
      setStatusMessage({ type: 'error', text: err.message || 'Failed to initialize transaction pipeline.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-slate-400 p-8">Loading financial statements...</div>;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Payments & Contribution Ledger</h2>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Remit daily or monthly SACCO targets via M-Pesa and review verified digital receipts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Dynamic Payment Portal Trigger Box */}
        <div className="lg:col-span-5 bg-[#1a1b23] border border-white/[0.01] rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-2 text-[#e57d38] text-xs font-bold uppercase tracking-wider mb-6">
            <CreditCard size={14} /> M-Pesa Remittance Node
          </div>

          <form onSubmit={handleMpesaPush} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Contribution Value (Ksh)
              </label>
              <input
                type="number"
                value={amountToPay}
                onChange={(e) => setAmountToPay(e.target.value)}
                placeholder="e.g. 1200"
                className="w-full bg-[#13141a] border border-white/[0.04] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                M-Pesa Mobile Identity Number
              </label>
              <input
                type="tel"
                value={mpesaNumber}
                onChange={(e) => setMpesaNumber(e.target.value)}
                placeholder="e.g. 07XXXXXXXX"
                className="w-full bg-[#13141a] border border-white/[0.04] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500/50"
                required
              />
            </div>

            {statusMessage && (
              <div className={`flex items-start gap-3 text-xs p-4 rounded-xl border ${
                statusMessage.type === 'success' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}>
                {statusMessage.type === 'success' ? <CheckCircle2 size={16} className="shrink-0" /> : <AlertCircle size={16} className="shrink-0" />}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl transition flex items-center justify-center gap-2"
            >
              {submitting ? 'Awaiting Handshake...' : 'Trigger STK Push API'}
              <ArrowUpRight size={14} />
            </button>
          </form>
        </div>

        {/* Right Side: Historical Record Matrix Table */}
        <div className="lg:col-span-7 bg-[#1a1b23] border border-white/[0.01] rounded-2xl p-6 shadow-xl">
          <h3 className="text-sm font-semibold text-white mb-5">Transaction History Statement</h3>

          {paymentHistory.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-white/[0.02] rounded-xl text-slate-500 text-xs font-medium">
              No historical contributions mapped to this member index yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-300">
                <thead>
                  <tr className="border-b border-white/[0.03] text-slate-500 text-xs font-medium uppercase">
                    <th className="pb-4">Timestamp</th>
                    <th className="pb-4">Description</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4 text-right">State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                  {paymentHistory.map((tx) => (
                    <tr key={tx.id}>
                      <td className="py-4 text-xs text-slate-500">
                        {new Date(tx.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </td>
                      <td className="py-4 font-medium text-slate-300 text-xs">{tx.payment_type}</td>
                      <td className="py-4 text-white font-semibold text-xs">Ksh {tx.amount.toLocaleString()}</td>
                      <td className="py-4 text-right">
                        <span className={`inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-full border ${
                          tx.status === 'confirmed' || tx.status === 'completed'
                            ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400'
                            : tx.status === 'pending'
                            ? 'bg-amber-950/40 border-amber-500/20 text-amber-400'
                            : 'bg-red-950/40 border-red-500/20 text-red-400'
                        }`}>
                          {tx.status === 'pending' && <Clock size={10} />}
                          <span className="capitalize">{tx.status}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}