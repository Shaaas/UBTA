"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { Search, CheckCircle2, XCircle, User, Hash, Loader2 } from "lucide-react";

const SHEET_ID  = "1SJevrYGlncKKDXeRcHZUEXHfshKIEk84pYZpyWYZ5pI";
const SHEET_NAME = "Registered members";
const SHEET_GID  = "1494404164";

type Member = {
  ubtaNo: string;
  name: string;
  source: "supabase" | "sheets";
};

function normalize(val: string) {
  return val.replace(/\s+/g, "").toLowerCase();
}

export default function VerifyPage() {
  const [query, setQuery]   = useState("");
  const [result, setResult] = useState<Member | null | "not_found">(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState<string | null>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const handleSearch = async () => {
    const q = query.trim();
    if (!q) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // ── 1. Search Supabase first ──────────────────────────────────
   const { data, error: sbError } = await supabase
  .from("public_member_directory")
  .select("member_number, full_name")
  .eq("member_number", q)
  .maybeSingle();
  
      if (!sbError && data) {
        setResult({
          ubtaNo: String(data.member_number ?? "—"),
          name:   String(data.full_name ?? "—"),
          source: "supabase",
        });
        return;
      }

      // ── 2. Fall back to Google Sheets ─────────────────────────────
      const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}&gid=${SHEET_GID}`;
      const res  = await fetch(url);
      const text = await res.text();
      const json = JSON.parse(text.replace(/^[^{]*/, "").replace(/[^}]*$/, ""));
      const rows = json.table.rows;

      const nq = normalize(q);
      const match = rows.find((row: any) => {
        const ubtaNo = String(row.c[0]?.v ?? "");
        const idNo   = String(row.c[2]?.v ?? "");
        const phone  = String(row.c[3]?.v ?? "");
        return (
          normalize(ubtaNo) === nq ||
          normalize(idNo)   === nq ||
          normalize(phone)  === nq
        );
      });

      if (match) {
        setResult({
          ubtaNo: String(match.c[0]?.v ?? "—"),
          name:   String(match.c[1]?.v ?? "—"),
          source: "sheets",
        });
      } else {
        setResult("not_found");
      }

    } catch (err) {
      setError("Could not reach the membership database. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex flex-col items-center justify-start px-4 py-16">

      {/* Header */}
      <div className="w-full max-w-xl text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[11px] font-bold px-3 py-1.5 rounded-full mb-4">
          <CheckCircle2 size={11} /> Member Verification
        </div>
        <h1 className="text-4xl font-black text-white uppercase tracking-tight mb-3">
          Verify a <span className="text-[#F37121]">Member</span>
        </h1>
        <p className="text-slate-400 text-sm leading-relaxed">
          Search by UBTA number, ID number, or phone number to confirm membership status.
        </p>
      </div>

      {/* Search box */}
      <div className="w-full max-w-xl">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="UBTA No, ID No, or Phone Number"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-4
                         text-white text-sm placeholder:text-slate-600
                         focus:outline-none focus:border-orange-500/50 transition-all"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-6 py-4 bg-[#F37121] hover:bg-orange-600 disabled:opacity-40 disabled:cursor-not-allowed
                       text-white font-bold rounded-xl transition-all flex items-center gap-2 text-sm"
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : "Search"}
          </button>
        </div>
        <p className="text-slate-600 text-xs mt-2 text-center">
          Enter any one — UBTA number, ID number, or phone number
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="w-full max-w-xl mt-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400">
          <XCircle size={15} className="shrink-0" /> {error}
        </div>
      )}

      {/* Not found */}
      {result === "not_found" && (
        <div className="w-full max-w-xl mt-6 text-center bg-slate-900/40 border border-slate-800 rounded-2xl p-8">
          <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <XCircle size={24} className="text-red-400" />
          </div>
          <h2 className="text-white font-bold text-lg uppercase mb-2">No Member Found</h2>
          <p className="text-slate-500 text-sm">
            No active member matched your search. Double-check the details or contact the UBTA office on{" "}
            <a href="tel:0714314342" className="text-[#F37121] font-bold hover:underline">0714 314 342</a>.
          </p>
        </div>
      )}

      {/* Found */}
      {result && result !== "not_found" && (
        <div className="w-full max-w-xl mt-6">
          <div className="bg-slate-900/40 border border-green-500/30 rounded-2xl overflow-hidden">

            {/* Status banner */}
            <div className="bg-green-500/10 border-b border-green-500/20 px-6 py-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 size={16} className="text-green-400" />
              </div>
              <div>
                <p className="text-green-400 font-bold text-sm uppercase tracking-wide">Verified Active Member</p>
                <p className="text-slate-500 text-xs">This person is a registered UBTA member</p>
              </div>
            </div>

            {/* Details */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <Hash size={14} className="text-[#F37121]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">UBTA Number</p>
                  <p className="text-white font-black font-mono text-lg">{result.ubtaNo}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                  <User size={14} className="text-[#F37121]" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Full Name</p>
                  <p className="text-white font-bold text-base">{result.name}</p>
                </div>
              </div>
            </div>

            <div className="px-6 pb-5">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-500 text-center">
                Personal details are private and only accessible to the member directly.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}