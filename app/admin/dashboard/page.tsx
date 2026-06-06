"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users, Search, LogOut, Edit2, X, Check,
  ChevronLeft, ChevronRight, CreditCard,
  MapPin, TrendingUp, RefreshCw, Eye, AlertCircle,
  Shield, Phone, ShieldCheck,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Transaction {
  mpesa_receipt_number: string;
  amount: number;
  transaction_type: string;
  payment_status: string;
  created_at: string;
}

interface Member {
  id: string;
  member_number: number;
  full_name: string;
  phone_number: string;
  id_number: string;
  bike_registration_number: string;
  working_county: string;
  sub_county: string;
  current_operating_location: string;
  email_address: string | null;
  date_of_birth: string | null;
  next_of_kin_name: string | null;
  next_of_kin_contact: string | null;
  next_of_kin_relationship: string | null;
  welfare_balance: number;
  sacco_balance: number;
  status: "pending" | "verified" | null;
  created_at: string;
  transactions: Transaction[];
}

interface AdminInfo {
  name: string;
  role: "chairman" | "secretary";
  email: string;
}

interface CertResult {
  certificateUrl: string | null;
  whatsappLink: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmt(date: string) {
  return new Date(date).toLocaleDateString("en-KE", {
    day: "numeric", month: "short", year: "numeric",
  });
}

function fmtMoney(n: number) {
  return `Ksh ${n.toLocaleString()}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color }: {
  label: string; value: string | number;
  icon: React.ElementType; color: string;
}) {
  return (
    <div className="bg-[#111827] border border-gray-800 rounded-xl p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{label}</p>
        <p className="text-white font-black text-xl mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function MemberRow({
  member, isChairman, onView, onEdit,
}: {
  member: Member;
  isChairman: boolean;
  onView: (m: Member) => void;
  onEdit: (m: Member) => void;
}) {
  const latestTx = member.transactions?.[0];
  return (
    <tr className="border-b border-gray-800/60 hover:bg-gray-800/20 transition-colors">
      <td className="px-4 py-3.5 text-sm">
        <span className="font-black text-orange-400 font-mono">#{member.member_number}</span>
      </td>
      <td className="px-4 py-3.5">
        <div className="font-semibold text-white text-sm">{member.full_name}</div>
        <div className="text-gray-500 text-xs mt-0.5">{member.phone_number}</div>
      </td>
      <td className="px-4 py-3.5 text-gray-400 text-sm font-mono">{member.id_number}</td>
      <td className="px-4 py-3.5 text-gray-400 text-xs">{member.working_county}</td>
      <td className="px-4 py-3.5 text-gray-400 text-xs font-mono uppercase">
        {member.bike_registration_number}
      </td>
      <td className="px-4 py-3.5">
        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
          member.status === "verified"
            ? "bg-green-500/10 text-green-400"
            : "bg-amber-500/10 text-amber-400"
        }`}>
          {member.status === "verified" ? "Verified" : "Pending"}
        </span>
        {latestTx && (
          <div className="text-gray-600 text-[10px] mt-1 font-mono">
            {latestTx.mpesa_receipt_number}
          </div>
        )}
      </td>
      <td className="px-4 py-3.5 text-gray-400 text-xs">{fmt(member.created_at)}</td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <button onClick={() => onView(member)}
            className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
            title="View details">
            <Eye size={14} />
          </button>
          {isChairman && (
            <button onClick={() => onEdit(member)}
              className="p-1.5 text-gray-500 hover:text-orange-400 hover:bg-orange-500/10 rounded-lg transition-all"
              title="Edit member">
              <Edit2 size={14} />
            </button>
          )}
        </div>
      </td>
    </tr>
  );
}

// ─── Member modal ─────────────────────────────────────────────────────────────

function MemberModal({ member, isChairman, onClose, onSave, onVerified }: {
  member: Member;
  isChairman: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Member>) => Promise<void>;
  onVerified: (id: string) => void;
}) {
  const [editing,    setEditing]    = useState(false);
  const [saving,     setSaving]     = useState(false);
  const [issuing,    setIssuing]    = useState(false);
  const [certResult, setCertResult] = useState<CertResult | null>(null);
  const [error,      setError]      = useState<string | null>(null);
  const [certError,  setCertError]  = useState<string | null>(null);

  const [form, setForm] = useState({
    full_name:                  member.full_name,
    phone_number:               member.phone_number,
    id_number:                  member.id_number,
    bike_registration_number:   member.bike_registration_number,
    working_county:             member.working_county,
    sub_county:                 member.sub_county,
    current_operating_location: member.current_operating_location,
    email_address:              member.email_address ?? "",
    next_of_kin_name:           member.next_of_kin_name ?? "",
    next_of_kin_contact:        member.next_of_kin_contact ?? "",
    next_of_kin_relationship:   member.next_of_kin_relationship ?? "",
    welfare_balance:            member.welfare_balance,
    sacco_balance:              member.sacco_balance,
  });

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await onSave(member.id, form);
      setEditing(false);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const handleIssue = async () => {
    setIssuing(true);
    setCertError(null);
    try {
      // Step 1: verify payment
      const verifyRes = await fetch("/api/admin/verify-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId:     member.id,
          mpesaReceipt: member.transactions?.[0]?.mpesa_receipt_number ?? "",
          amount:       member.transactions?.[0]?.amount ?? 0,
        }),
      });
      if (!verifyRes.ok) {
        const d = await verifyRes.json();
        throw new Error(d.error ?? "Verification failed");
      }

      // Step 2: generate certificate + WhatsApp link
      const certRes  = await fetch("/api/admin/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id }),
      });
      const certData = await certRes.json();
      if (!certRes.ok) throw new Error(certData.error ?? "Certificate generation failed");

      setCertResult({
        certificateUrl: certData.certificateUrl,
        whatsappLink:   certData.whatsappLink,
      });
      onVerified(member.id);
    } catch (e: unknown) {
      setCertError(e instanceof Error ? e.message : "Failed");
    } finally {
      setIssuing(false);
    }
  };

  const InlineField = ({ label, field, type = "text" }: {
    label: string; field: keyof typeof form; type?: string;
  }) => (
    <div>
      <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      {editing ? (
        <input
          type={type}
          value={form[field] as string}
          onChange={(e) => setForm((p) => ({
            ...p,
            [field]: type === "number" ? Number(e.target.value) : e.target.value,
          }))}
          className="w-full bg-[#0B0F19] border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm
                     focus:outline-none focus:border-orange-500/60 transition-all"
        />
      ) : (
        <p className="text-white text-sm font-medium">
          {(form[field] as string | number) || <span className="text-gray-600">—</span>}
        </p>
      )}
    </div>
  );

  const isVerified = member.status === "verified";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-[#111827] border border-gray-800 rounded-2xl w-full max-w-2xl my-8 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-black text-orange-400 text-lg font-mono">
                #{member.member_number}
              </span>
              <h2 className="font-black text-white text-lg uppercase tracking-tight">
                {member.full_name}
              </h2>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                isVerified
                  ? "bg-green-500/10 text-green-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}>
                {isVerified ? "Verified" : "Pending"}
              </span>
            </div>
            <p className="text-gray-500 text-xs mt-1">Registered {fmt(member.created_at)}</p>
          </div>
          <div className="flex items-center gap-2">
            {isChairman && !editing && (
              <button onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-3 py-2 bg-orange-500/10 border border-orange-500/30
                           text-orange-400 text-xs font-bold rounded-lg hover:bg-orange-500/20 transition-all">
                <Edit2 size={13} /> Edit
              </button>
            )}
            {editing && (
              <>
                <button onClick={handleSave} disabled={saving}
                  className="flex items-center gap-1.5 px-3 py-2 bg-green-500/10 border border-green-500/30
                             text-green-400 text-xs font-bold rounded-lg hover:bg-green-500/20 transition-all disabled:opacity-50">
                  {saving
                    ? <><RefreshCw size={13} className="animate-spin" /> Saving...</>
                    : <><Check size={13} /> Save</>}
                </button>
                <button onClick={() => { setEditing(false); setError(null); }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 text-gray-400
                             text-xs font-bold rounded-lg hover:bg-gray-700 transition-all">
                  <X size={13} /> Cancel
                </button>
              </>
            )}
            <button onClick={onClose}
              className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-all">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* General error */}
        {error && (
          <div className="mx-6 mt-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30
                          text-red-400 text-xs rounded-xl px-4 py-3">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        {/* Certificate issuance panel */}
        {!editing && (
          <div className="mx-6 mt-5">
            {isVerified && !certResult ? (
              <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/30
                              text-green-400 text-xs rounded-xl px-4 py-3">
                <Check size={14} /> Member verified — certificate already issued
              </div>
            ) : certResult ? (
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 space-y-3">
                <p className="text-green-400 text-xs font-bold uppercase tracking-wider">
                  ✓ Certificate issued successfully
                </p>
                {certResult.certificateUrl && (
                  <a href={certResult.certificateUrl} target="_blank" rel="noopener noreferrer"
                    className="block text-xs text-blue-400 underline truncate">
                    {certResult.certificateUrl}
                  </a>
                )}
                <a href={certResult.whatsappLink} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700
                             text-white font-bold text-xs uppercase tracking-wide py-3 rounded-xl transition-all">
                  <Phone size={14} /> Send via WhatsApp
                </a>
              </div>
            ) : (
              <>
                {certError && (
                  <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30
                                  text-red-400 text-xs rounded-xl px-4 py-3 mb-3">
                    <AlertCircle size={14} /> {certError}
                  </div>
                )}
                <button
                  onClick={handleIssue}
                  disabled={issuing}
                  className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600
                             disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold text-sm
                             uppercase tracking-wide py-3.5 rounded-xl transition-all">
                  {issuing ? (
                    <><RefreshCw size={14} className="animate-spin" /> Generating Certificate...</>
                  ) : (
                    <><ShieldCheck size={14} /> Verify & Issue Certificate</>
                  )}
                </button>
              </>
            )}
          </div>
        )}

        <div className="p-6 space-y-6">

          {/* Balances */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0B0F19] border border-gray-800 rounded-xl p-4">
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1">
                Welfare Balance
              </p>
              {editing ? (
                <input type="number" value={form.welfare_balance}
                  onChange={(e) => setForm((p) => ({ ...p, welfare_balance: Number(e.target.value) }))}
                  className="w-full bg-transparent border-b border-gray-700 text-green-400 font-black text-xl
                             focus:outline-none focus:border-orange-500 pb-1" />
              ) : (
                <p className="text-green-400 font-black text-xl font-mono">
                  {fmtMoney(form.welfare_balance)}
                </p>
              )}
            </div>
            <div className="bg-[#0B0F19] border border-gray-800 rounded-xl p-4">
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1">
                SACCO Balance
              </p>
              {editing ? (
                <input type="number" value={form.sacco_balance}
                  onChange={(e) => setForm((p) => ({ ...p, sacco_balance: Number(e.target.value) }))}
                  className="w-full bg-transparent border-b border-gray-700 text-teal-400 font-black text-xl
                             focus:outline-none focus:border-orange-500 pb-1" />
              ) : (
                <p className="text-teal-400 font-black text-xl font-mono">
                  {fmtMoney(form.sacco_balance)}
                </p>
              )}
            </div>
          </div>

          {/* Personal details */}
          <div>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">
              Personal Details
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <InlineField label="Full Name"     field="full_name" />
              <InlineField label="Phone Number"  field="phone_number" />
              <InlineField label="National ID"   field="id_number" />
              <InlineField label="Email Address" field="email_address" type="email" />
              <InlineField label="Bike Plate"    field="bike_registration_number" />
              <InlineField label="County"        field="working_county" />
              <InlineField label="Sub-County"    field="sub_county" />
              <InlineField label="Stage Node"    field="current_operating_location" />
            </div>
          </div>

          {/* Next of kin */}
          <div>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">
              Next of Kin
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <InlineField label="Name"         field="next_of_kin_name" />
              <InlineField label="Phone"        field="next_of_kin_contact" />
              <InlineField label="Relationship" field="next_of_kin_relationship" />
            </div>
          </div>

          {/* Transactions */}
          {member.transactions?.length > 0 && (
            <div>
              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">
                Payment History
              </p>
              <div className="space-y-2">
                {member.transactions.map((tx, i) => (
                  <div key={i}
                    className="flex items-center justify-between bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-white text-xs font-bold">
                        {tx.transaction_type.replace(/_/g, " ")}
                      </p>
                      <p className="text-gray-500 text-[11px] font-mono mt-0.5">
                        {tx.mpesa_receipt_number}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-orange-400 font-black text-sm">{fmtMoney(tx.amount)}</p>
                      <p className="text-gray-600 text-[11px]">{fmt(tx.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Login page ───────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }: { onLogin: (info: AdminInfo) => void }) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res  = await fetch("/api/auth/admin-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed");
      } else {
        onLogin({ name: data.name, role: data.role, email });
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpeg" alt="UBTA"
            className="w-14 h-14 rounded-full mx-auto mb-4 bg-white p-1" />
          <h1 className="font-black text-white text-2xl uppercase tracking-tight">Admin Portal</h1>
          <p className="text-gray-500 text-xs mt-1">United Boda Transport Association</p>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-800">
            <Shield size={16} className="text-orange-400" />
            <span className="text-white font-bold text-sm">Restricted Access</span>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30
                            text-red-400 text-xs rounded-xl px-4 py-3 mb-4">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Email Address
              </label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ubta.co.ke" required
                className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm
                           placeholder:text-gray-700 focus:outline-none focus:border-orange-500/60 transition-all" />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                Password
              </label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" required
                className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm
                           placeholder:text-gray-700 focus:outline-none focus:border-orange-500/60 transition-all" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold
                         uppercase tracking-wide py-3.5 rounded-xl transition-all
                         flex items-center justify-center gap-2 text-sm">
              {loading
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in...</>
                : <><Shield size={15} /> Sign In</>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [admin,       setAdmin]       = useState<AdminInfo | null>(null);
  const [members,     setMembers]     = useState<Member[]>([]);
  const [total,       setTotal]       = useState(0);
  const [page,        setPage]        = useState(1);
  const [search,      setSearch]      = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading,     setLoading]     = useState(false);
  const [viewMember,  setViewMember]  = useState<Member | null>(null);
  const [editMember,  setEditMember]  = useState<Member | null>(null);

  const isChairman = admin?.role === "chairman";
  const totalPages = Math.ceil(total / 20);

  const fetchMembers = useCallback(async () => {
    if (!admin) return;
    setLoading(true);
    try {
      const res  = await fetch(
        `/api/admin/members?page=${page}&search=${encodeURIComponent(search)}`
      );
      const data = await res.json();
      if (res.ok) {
        setMembers(data.members ?? []);
        setTotal(data.total ?? 0);
      }
    } finally {
      setLoading(false);
    }
  }, [admin, page, search]);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const handleSave = async (id: string, updates: Partial<Member>) => {
    const res  = await fetch("/api/admin/members", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...updates }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, ...updates } : m));
    setViewMember((prev) => prev?.id === id ? { ...prev, ...updates } as Member : prev);
    setEditMember(null);
  };

  // Called after certificate is issued — flips status in local state immediately
  const handleVerified = (id: string) => {
    setMembers((prev) =>
      prev.map((m) => m.id === id ? { ...m, status: "verified" } : m)
    );
    setViewMember((prev) =>
      prev?.id === id ? { ...prev, status: "verified" } : prev
    );
  };

  const handleLogout = async () => {
    await fetch("/api/auth/admin-logout", { method: "POST" });
    setAdmin(null);
    setMembers([]);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  if (!admin) return <AdminLogin onLogin={setAdmin} />;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">

      {/* Top bar */}
      <div className="bg-[#111827] border-b border-gray-800 sticky top-0 z-40">
        <div className="h-[2px] bg-gradient-to-r from-orange-500 via-green-600 to-orange-500" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.jpeg" alt="UBTA" className="w-8 h-8 rounded-full bg-white p-0.5" />
            <div>
              <span className="font-black text-white text-sm">UBTA Admin</span>
              <span className={`ml-2 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md
                ${isChairman ? "bg-orange-500/10 text-orange-400" : "bg-blue-500/10 text-blue-400"}`}>
                {admin.role}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 text-xs hidden sm:block">{admin.name}</span>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 text-gray-500 hover:text-white
                         hover:bg-gray-800 rounded-lg text-xs font-semibold transition-all">
              <LogOut size={13} /> Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Stats */}
        {isChairman && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Members"
              value={total} icon={Users} color="bg-orange-500/10 text-orange-400" />
            <StatCard label="Latest Member #"
              value={members[0]?.member_number ?? "—"} icon={CreditCard} color="bg-teal-500/10 text-teal-400" />
            <StatCard label="Counties Active"
              value={[...new Set(members.map((m) => m.working_county))].length}
              icon={MapPin} color="bg-blue-500/10 text-blue-400" />
            <StatCard label="Total SACCO Bal"
              value={fmtMoney(members.reduce((s, m) => s + m.sacco_balance, 0))}
              icon={TrendingUp} color="bg-green-500/10 text-green-400" />
          </div>
        )}

        {/* Members table */}
        <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex flex-col sm:flex-row
                          items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-black text-white text-lg uppercase tracking-tight">Members</h2>
              <p className="text-gray-500 text-xs mt-0.5">{total} registered members</p>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <form onSubmit={handleSearch} className="flex gap-2 flex-1 sm:flex-none">
                <div className="relative flex-1 sm:w-64">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Name, phone, ID, or member #"
                    className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl pl-9 pr-4 py-2.5
                               text-white text-xs placeholder:text-gray-700
                               focus:outline-none focus:border-orange-500/60 transition-all"
                  />
                </div>
                <button type="submit"
                  className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white
                             text-xs font-bold rounded-xl transition-all">
                  Search
                </button>
              </form>
              <button onClick={fetchMembers}
                className="p-2.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
                <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800/60">
                  {["#", "Member", "ID Number", "County", "Plate", "Status", "Joined", ""].map((h) => (
                    <th key={h}
                      className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-gray-500 text-sm">
                      <RefreshCw size={20} className="animate-spin mx-auto mb-2" />
                      Loading members...
                    </td>
                  </tr>
                ) : members.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-gray-500 text-sm">
                      {search ? "No members match your search" : "No members yet"}
                    </td>
                  </tr>
                ) : (
                  members.map((m) => (
                    <MemberRow
                      key={m.id}
                      member={m}
                      isChairman={isChairman}
                      onView={setViewMember}
                      onEdit={setEditMember}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-800 flex items-center justify-between">
              <p className="text-gray-500 text-xs">
                Page {page} of {totalPages} · {total} members
              </p>
              <div className="flex items-center gap-2">
                <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                  className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg
                             disabled:opacity-30 transition-all">
                  <ChevronLeft size={15} />
                </button>
                <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg
                             disabled:opacity-30 transition-all">
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {viewMember && (
        <MemberModal
          member={viewMember}
          isChairman={isChairman}
          onClose={() => setViewMember(null)}
          onSave={handleSave}
          onVerified={handleVerified}
        />
      )}
      {editMember && (
        <MemberModal
          member={editMember}
          isChairman={isChairman}
          onClose={() => setEditMember(null)}
          onSave={handleSave}
          onVerified={handleVerified}
        />
      )}
    </div>
  );
}