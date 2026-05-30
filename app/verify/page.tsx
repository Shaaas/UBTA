"use client";

import React, { useState } from 'react';

const MOCK_REGISTRY = [
  { id: "1", name: "John Kamau Omondi", plate: "KMCX 123A", idNo: "32145678", stage: "Khoja Stage", status: "Active", sacco: "CBD Co-operative" },
  { id: "2", name: "David Mwangi Njoroge", plate: "KMDQ 789B", idNo: "28765432", stage: "Commercial", status: "Pending Payment", sacco: "CBD Co-operative" },
  { id: "3", name: "Evans Kipchirchir", plate: "KMCE 456Z", idNo: "30459812", stage: "Ambassadeur", status: "Active", sacco: "CBD Co-operative" }
];

export default function VerifyRider() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState<typeof MOCK_REGISTRY | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    if (!searchQuery.trim()) {
      setSearchResult([]);
      return;
    }
    const filtered = MOCK_REGISTRY.filter(rider => 
      rider.plate.toLowerCase().includes(searchQuery.toLowerCase()) || rider.idNo.includes(searchQuery)
    );
    setSearchResult(filtered);
  };

  return (
    <div className="min-h-[calc(100vh-73px)] bg-[#0B0F19] px-4 sm:px-6 py-12 flex flex-col items-center">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">UBTA Compliance Registry Lookup</h1>
          <p className="text-sm text-gray-400 mt-2">Verify rider enrollment parameters, active operational clearance, and affiliated SACCO branches instantly.</p>
        </div>
        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-xl mb-8">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Enter Plate No. (e.g. KMCX 123A) or National ID..." className="w-full bg-[#0B0F19] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#2096D4] text-sm uppercase" />
            </div>
            <button type="submit" className="btn-accent py-3 sm:py-auto px-6 font-bold text-sm">Search Registry</button>
          </form>
        </div>
        {hasSearched && searchResult && (
          <div className="space-y-4">
            {searchResult.length > 0 ? (
              searchResult.map((rider) => (
                <div key={rider.id} className="bg-[#111827] border border-gray-800 rounded-xl p-5 sm:p-6 shadow-md">
                  <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white leading-tight">{rider.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">ID Number: {rider.idNo}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${rider.status === 'Active' ? 'bg-[#00A651]/10 text-[#00A651]' : 'bg-[#F37121]/10 text-[#F37121]'}`}>{rider.status}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Plate Number</span>
                      <span className="text-white font-mono font-bold mt-0.5 inline-block bg-[#0B0F19] px-2 py-0.5 rounded border border-gray-800 text-xs">{rider.plate}</span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Assigned Stage</span>
                      <span className="text-gray-300 font-medium mt-0.5 inline-block">{rider.stage}</span>
                    </div>
                    <div className="col-span-2 pt-2 border-t border-gray-800/40 mt-2">
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">Affiliated Ecosystem Group</span>
                      <span className="text-[#2096D4] font-semibold mt-0.5 inline-block">{rider.sacco}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-[#111827]/40 border border-gray-800 border-dashed rounded-xl p-8 text-center text-gray-400">
                <p className="font-semibold text-white">No Record Located</p>
                <p className="text-xs mt-1 max-w-sm mx-auto text-gray-500">The identifier requested does not match any authenticated operator parameters inside the active UBTA database grid.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}