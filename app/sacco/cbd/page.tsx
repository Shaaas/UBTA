"use client";

import React, { useState } from 'react';
import { UBTA_CONFIG } from '../../../config';

const MOCK_SACCO_MEMBERS = [
  { memberId: "CBD-01-204", name: "John Kamau Omondi", phone: "0712345678", savings: 14500, activeLoan: 0, status: "Active Member" },
  { memberId: "CBD-01-112", name: "Evans Kipchirchir", phone: "0722111222", savings: 32000, activeLoan: 15000, status: "Active Member" }
];

export default function CbdSaccoPage() {
  const [verifyInput, setVerifyInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<typeof MOCK_SACCO_MEMBERS[0] | null | 'not_found'>(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [simulatedUser, setSimulatedUser] = useState<typeof MOCK_SACCO_MEMBERS[0] | null>(null);
  const [loginPhone, setLoginPhone] = useState('');
  
  const [loanAmount, setLoanAmount] = useState('');
  const [loanSuccess, setLoanSuccess] = useState(false);

  const handleVerification = (e: React.FormEvent) => {
    e.preventDefault();
    const match = MOCK_SACCO_MEMBERS.find(m => m.phone === verifyInput || m.memberId.toLowerCase() === verifyInput.toLowerCase());
    setVerificationResult(match ? match : 'not_found');
  };

  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const match = MOCK_SACCO_MEMBERS.find(m => m.phone === loginPhone);
    if (match) {
      setSimulatedUser(match);
      setIsLoggedIn(true);
    } else {
      alert("Demo token unlisted! Type phone string: 0712345678");
    }
  };

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoanSuccess(true);
    setTimeout(() => {
      if (simulatedUser) {
        setSimulatedUser({ ...simulatedUser, activeLoan: simulatedUser.activeLoan + Number(loanAmount) });
      }
      setLoanSuccess(false);
      setLoanAmount('');
    }, 1500);
  };

  const saccoBenefits = [
    { title: "High-Yield Annual Dividends", desc: "Members earn standard interest payouts calculated on total savings plus premium sharing dividends on cooperative share capital outlays." },
    { title: "Empowered Credit Facilities", desc: "Access fast, affordable financing to buy or upgrade your motorbike fleet with flexible, low-interest repayment matrices." },
    { title: "Welfare & Comprehensive Emergency Coverage", desc: "Instant access to immediate emergency cash advances, medical support structures, and comprehensive rider welfare funds." },
    { title: "Micro-Investment & Financial Coaching", desc: "Participate in mandatory education workshops designed to master wealth tracking, long-term investments, and asset management." }
  ];

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#0B0F19] text-white px-4 sm:px-6 py-12">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Block */}
        <div className="border-b border-gray-800 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-[#00A651] uppercase tracking-widest bg-[#00A651]/10 px-2.5 py-1 rounded-md">Node Registry ID: CBD-01</span>
            <h1 className="text-3xl font-black text-white mt-2">CBD United Boda Transport SACCO</h1>
            <p className="text-sm text-gray-400 mt-1">Official central registry system node. Pay via official corporate channels only.</p>
          </div>
          {isLoggedIn && (
            <button onClick={() => { setIsLoggedIn(false); setSimulatedUser(null); }} className="px-4 py-2 text-xs font-bold text-red-400 bg-red-500/10 rounded-lg border border-red-500/20 hover:bg-red-500/20 transition-colors">
              Disconnect Session
            </button>
          )}
        </div>

        {!isLoggedIn ? (
          <div className="space-y-12">
            
            {/* Informational Section: Benefits & Value Propositions */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Co-operative Membership Value Pillars</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {saccoBenefits.map((b, i) => (
                  <div key={i} className="p-5 bg-[#111827] border border-gray-800 rounded-xl hover:border-gray-700 transition-colors">
                    <span className="text-lg mr-2">💎</span>
                    <h3 className="text-base font-bold text-white inline-block">{b.title}</h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Informational Section: Loan Multiplier Guide */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border-l-4 border-l-[#F37121]">
              <div>
                <h2 className="text-lg font-black text-[#F37121]">How Co-operative Loans Work</h2>
                <p className="text-xs text-gray-400 mt-1">Our credit allocation process operates under a standard regulatory matrix designed to step up rider equity safely.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-500 uppercase font-mono block">Phase 01 / Savings Accumulation</span>
                  <h4 className="text-sm font-bold text-white">Consistent Group Contributions</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Members make a fixed monthly contribution to establish their cash deposit borrowing foundation.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-500 uppercase font-mono block">Phase 02 / The Credit Multiplier</span>
                  <h4 className="text-sm font-bold text-white">3x Capital Ceiling Regulation</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Once verified as an active member, you qualify to apply for loans totaling up to **three times (3x)** your net cumulative savings balance.</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-gray-500 uppercase font-mono block">Phase 03 / Collateral Security</span>
                  <h4 className="text-sm font-bold text-white">Guarantor Verification Grouping</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Loans are secured against your personal savings equity pool combined with sign-offs from fellow active SACCO members acting as co-guarantors.</p>
                </div>
              </div>
            </div>

            {/* Split Lookup and Secure Entrance Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Member Verification Station */}
              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl">
                <h2 className="text-lg font-bold text-white mb-2">SACCO Status Verification</h2>
                <p className="text-xs text-gray-400 mb-6">Inspectors and marshals lookup zone to assert financial entry clearance.</p>
                
                <form onSubmit={handleVerification} className="space-y-4">
                  <input 
                    type="text" 
                    value={verifyInput}
                    onChange={(e) => setVerifyInput(e.target.value)}
                    placeholder="Enter Member ID or Phone Number..."
                    className="w-full bg-[#0B0F19] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#00A651] text-sm font-mono"
                  />
                  <button type="submit" className="w-full py-3 bg-[#00A651] text-white rounded-lg text-sm font-bold tracking-wide">
                    Verify SACCO Standing
                  </button>
                </form>

                {verificationResult && (
                  <div className="mt-5 pt-5 border-t border-gray-800/60">
                    {verificationResult === 'not_found' ? (
                      <p className="text-sm font-semibold text-red-400 text-center">Unverified account matching requested parameters.</p>
                    ) : (
                      <div className="p-4 bg-[#00A651]/5 border border-[#00A651]/20 rounded-xl flex justify-between items-center">
                        <div>
                          <p className="text-sm font-bold text-white">{verificationResult.name}</p>
                          <p className="text-xs font-mono text-gray-500 mt-0.5">{verificationResult.memberId}</p>
                        </div>
                        <span className="px-2.5 py-1 bg-[#00A651]/20 text-[#00A651] rounded text-xs font-black uppercase">{verificationResult.status}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Secure Member Entrance Box */}
              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl border-t-4 border-t-[#2096D4]">
                <h2 className="text-lg font-bold text-white mb-2">Member Ledger Terminal</h2>
                <p className="text-xs text-gray-400 mb-6">Access point to evaluate personal credit parameters, outstanding logs, and asset ledger accounts.</p>
                
                <form onSubmit={handleSimulatedLogin} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">Registered Mobile Phone Number</label>
                    <input 
                      type="tel" 
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="Use 0712345678 to run terminal layout preview"
                      className="w-full bg-[#0B0F19] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#2096D4] text-sm font-mono"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 bg-[#2096D4] text-white rounded-lg text-sm font-bold tracking-wide">
                    Initialize Secure Access
                  </button>
                </form>
              </div>

            </div>

            {/* Official Compliance Asset Matrix pulled from Flyer 3 */}
            <div className="bg-[#111827]/40 border border-gray-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-[#2096D4] rounded" /> Mandatory Member Compliance Assets
              </h3>
              <p className="text-xs text-gray-400 mb-6">Make sure you pay directly at our central office. Payment validation is tracked exclusively across active account nodes.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-[#111827] border border-gray-800 rounded-xl">
                  <span className="text-xs font-bold text-gray-500 block uppercase">Motorbike QR Code</span>
                  <span className="text-xl font-black text-[#00A651] font-mono block mt-2">Ksh {UBTA_CONFIG.FEES.MOTORBIKE_QR}</span>
                  <span className="text-[10px] text-gray-400 block mt-1">Reflective digital tracking asset tag</span>
                </div>
                <div className="p-4 bg-[#111827] border border-gray-800 rounded-xl">
                  <span className="text-xs font-bold text-gray-500 block uppercase">Official Member Card</span>
                  <span className="text-xl font-black text-[#F37121] font-mono block mt-2">Ksh {UBTA_CONFIG.FEES.MEMBER_CARD}</span>
                  <span className="text-[10px] text-gray-400 block mt-1">Physical barcode smart validation key</span>
                </div>
                <div className="p-4 bg-[#111827] border border-gray-800 rounded-xl">
                  <span className="text-xs font-bold text-gray-500 block uppercase">UBTA Reflector Jacket</span>
                  <span className="text-xl font-black text-white font-mono block mt-2">From Ksh 500</span>
                  <span className="text-[10px] text-gray-400 block mt-1">Available operational tiers: 500, 700, 1,000</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Authenticated Dashboard Core */
          simulatedUser && (
            <div className="space-y-6">
              <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs text-gray-500">Active Identity Session,</span>
                  <p className="text-xl font-black text-white">{simulatedUser.name}</p>
                </div>
                <div className="text-xs font-mono text-gray-400">
                  <p><strong>Member ID:</strong> {simulatedUser.memberId}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Savings Balance</p>
                  <p className="text-3xl font-black text-[#00A651] mt-2 font-mono">Ksh {simulatedUser.savings.toLocaleString()}</p>
                </div>
                <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Outstanding Loan Balance</p>
                  <p className="text-3xl font-black text-white mt-2 font-mono">Ksh {simulatedUser.activeLoan.toLocaleString()}</p>
                </div>
                <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 border-l-4 border-l-[#F37121]">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Max Borrowing Capacity Limit</p>
                  <p className="text-3xl font-black text-[#F37121] mt-2 font-mono">
                    Ksh {((simulatedUser.savings * 3) - simulatedUser.activeLoan).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 max-w-xl">
                <h3 className="text-base font-bold text-white mb-4">Request 3x Credit Capital Disbursement</h3>
                {loanSuccess ? (
                  <div className="p-3 bg-[#00A651]/10 text-[#00A651] rounded-lg text-xs font-bold text-center">
                    Executing banking micro-service webhooks... Updating balances.
                  </div>
                ) : (
                  <form onSubmit={handleLoanSubmit} className="space-y-4">
                    <input 
                      type="number" 
                      required 
                      max={(simulatedUser.savings * 3) - simulatedUser.activeLoan}
                      value={loanAmount} 
                      onChange={(e) => setLoanAmount(e.target.value)}
                      placeholder="Enter requested amount..." 
                      className="w-full bg-[#0B0F19] border border-gray-800 rounded-lg px-4 py-2.5 text-white font-mono text-sm" 
                    />
                    <button type="submit" className="py-2.5 px-5 bg-[#F37121] text-white rounded-lg text-xs font-bold">
                      Process Emergency Application
                    </button>
                  </form>
                )}
              </div>
            </div>
          )
        )}

      </div>
    </div>
  );
}