"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Users, Search, LogOut, Edit2, X, Check, Camera,
  ChevronLeft, ChevronRight, Phone, CreditCard,
  MapPin, Bike, Calendar, User, Shield,
  TrendingUp, RefreshCw, Eye, AlertCircle,
  CheckCircle, XCircle, FileText, Download, MessageCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Transaction {
  mpesa_receipt_number: string;
  amount: number;
  transaction_type: string;
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
  created_at: string;
  status: string;
  certificate_url: string | null;
  transactions: Transaction[];
}

interface AdminInfo {
  name: string;
  role: "chairman" | "secretary";
  email: string;
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

// PATCH: Replace MemberRow function in dashboard with this version
// Adds a "Reissue Certificate" button for verified members

function MemberRow({
  member, isChairman, onView, onEdit, onReissue,
}: {
  member: Member;
  isChairman: boolean;
  onView: (m: Member) => void;
  onEdit: (m: Member) => void;
  onReissue: (m: Member) => void;
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
      <td className="px-4 py-3.5 text-gray-400 text-xs font-mono uppercase">{member.bike_registration_number}</td>
      <td className="px-4 py-3.5">
        {latestTx ? (
          <div>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
              latestTx.transaction_type.includes("paid")
                ? "bg-green-500/10 text-green-400"
                : latestTx.transaction_type.includes("failed")
                ? "bg-red-500/10 text-red-400"
                : "bg-orange-500/10 text-orange-400"
            }`}>
              {latestTx.transaction_type.replace(/_/g, " ")}
            </span>
            <div className="text-gray-600 text-[10px] mt-1">{latestTx.mpesa_receipt_number}</div>
          </div>
        ) : (
          <span className="text-gray-600 text-xs">No transaction</span>
        )}
      </td>
      <td className="px-4 py-3.5 text-gray-400 text-xs">{fmt(member.created_at)}</td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1.5">
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
          <button onClick={() => onReissue(member)}
            className="p-1.5 text-gray-500 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-all"
            title="Reissue certificate">
            <FileText size={14} />
          </button>
          {member.certificate_url && (
            <a href={member.certificate_url} target="_blank" rel="noopener noreferrer"
              className="p-1.5 text-gray-500 hover:text-green-400 hover:bg-green-500/10 rounded-lg transition-all"
              title="View certificate">
              <Download size={14} />
            </a>
          )}
        </div>
      </td>
    </tr>
  );
}

function MemberModal({ member, isChairman, onClose, onSave, onReissue }: {
  member: Member;
  isChairman: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Member>) => Promise<void>;
  onReissue: (m: Member) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState<string | null>(null);
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

  const Field = ({ label, field, type = "text" }: {
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
          onChange={(e) => setForm((p) => ({ ...p, [field]: type === "number" ? Number(e.target.value) : e.target.value }))}
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
            </div>
            <p className="text-gray-500 text-xs mt-1">Registered {fmt(member.created_at)}</p>
          </div>
          <div className="flex items-center gap-2">
            {!editing && (
              <button
                onClick={() => onReissue(member)}
                className="flex items-center gap-1.5 px-3 py-2 bg-teal-500/10 border border-teal-500/30
                           text-teal-400 text-xs font-bold rounded-lg hover:bg-teal-500/20 transition-all"
                title="Reissue certificate">
                <FileText size={13} /> Reissue
              </button>
            )}
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
                  {saving ? <RefreshCw size={13} className="animate-spin" /> : <Check size={13} />}
                  {saving ? "Saving..." : "Save"}
                </button>
                <button onClick={() => { setEditing(false); setError(null); }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-gray-800 text-gray-400 text-xs font-bold rounded-lg hover:bg-gray-700 transition-all">
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

        {error && (
          <div className="mx-6 mt-4 flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl px-4 py-3">
            <AlertCircle size={14} /> {error}
          </div>
        )}

        <div className="p-6 space-y-6">

          {/* Balances */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0B0F19] border border-gray-800 rounded-xl p-4">
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1">Welfare Balance</p>
              {editing ? (
                <input type="number" value={form.welfare_balance}
                  onChange={(e) => setForm((p) => ({ ...p, welfare_balance: Number(e.target.value) }))}
                  className="w-full bg-transparent border-b border-gray-700 text-green-400 font-black text-xl
                             focus:outline-none focus:border-orange-500 pb-1" />
              ) : (
                <p className="text-green-400 font-black text-xl font-mono">{fmtMoney(form.welfare_balance)}</p>
              )}
            </div>
            <div className="bg-[#0B0F19] border border-gray-800 rounded-xl p-4">
              <p className="text-gray-500 text-[11px] font-bold uppercase tracking-wider mb-1">SACCO Balance</p>
              {editing ? (
                <input type="number" value={form.sacco_balance}
                  onChange={(e) => setForm((p) => ({ ...p, sacco_balance: Number(e.target.value) }))}
                  className="w-full bg-transparent border-b border-gray-700 text-teal-400 font-black text-xl
                             focus:outline-none focus:border-orange-500 pb-1" />
              ) : (
                <p className="text-teal-400 font-black text-xl font-mono">{fmtMoney(form.sacco_balance)}</p>
              )}
            </div>
          </div>

          {/* Personal details */}
          <div>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Personal Details</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Full Name"        field="full_name" />
              <Field label="Phone Number"     field="phone_number" />
              <Field label="National ID"      field="id_number" />
              <Field label="Email Address"    field="email_address" type="email" />
              <Field label="Bike Plate"       field="bike_registration_number" />
              <Field label="County"           field="working_county" />
              <Field label="Sub-County"       field="sub_county" />
              <Field label="Stage Node"       field="current_operating_location" />
            </div>
          </div>

          {/* Next of kin */}
          <div>
            <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Next of Kin</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Name"         field="next_of_kin_name" />
              <Field label="Phone"        field="next_of_kin_contact" />
              <Field label="Relationship" field="next_of_kin_relationship" />
            </div>
          </div>

          {/* Transactions */}
          {member.transactions?.length > 0 && (
            <div>
              <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-4">Payment History</p>
              <div className="space-y-2">
                {member.transactions.map((tx, i) => (
                  <div key={i} className="flex items-center justify-between bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3">
                    <div>
                      <p className="text-white text-xs font-bold">{tx.transaction_type.replace(/_/g, " ")}</p>
                      <p className="text-gray-500 text-[11px] font-mono mt-0.5">{tx.mpesa_receipt_number}</p>
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
          <img src="/logo.jpeg" alt="UBTA" className="w-14 h-14 rounded-full mx-auto mb-4 bg-white p-1" />
          <h1 className="font-black text-white text-2xl uppercase tracking-tight">Admin Portal</h1>
          <p className="text-gray-500 text-xs mt-1">United Boda Transport Association</p>
        </div>

        <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-800">
            <Shield size={16} className="text-orange-400" />
            <span className="text-white font-bold text-sm">Restricted Access</span>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl px-4 py-3 mb-4">
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
                         uppercase tracking-wide py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
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

// ─── Pending member row ───────────────────────────────────────────────────────

function PendingRow({ member, onVerify, onReject }: {
  member: Member;
  onVerify: (m: Member) => void;
  onReject:  (m: Member) => void;
}) {
  const tx = member.transactions?.[0];
  return (
    <tr className="border-b border-gray-800/60 hover:bg-gray-800/20 transition-colors">
      <td className="px-4 py-3.5">
        <div className="font-semibold text-white text-sm">{member.full_name}</div>
        <div className="text-gray-500 text-xs mt-0.5">{member.phone_number}</div>
      </td>
      <td className="px-4 py-3.5 text-gray-400 text-sm font-mono">{member.id_number}</td>
      <td className="px-4 py-3.5 text-gray-400 text-xs">{member.working_county}</td>
      <td className="px-4 py-3.5">
        {tx ? (
          <div>
            <span className="text-xs font-bold text-orange-400 font-mono">{tx.mpesa_receipt_number}</span>
            <div className="text-gray-600 text-[10px] mt-0.5">Ksh {tx.amount?.toLocaleString()}</div>
          </div>
        ) : (
          <span className="text-gray-600 text-xs">No receipt</span>
        )}
      </td>
      <td className="px-4 py-3.5 text-gray-500 text-xs">{fmt(member.created_at)}</td>
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-2">
          <button onClick={() => onVerify(member)}
            className="flex items-center gap-1 px-3 py-1.5 bg-green-500/10 border border-green-500/30
                       text-green-400 text-xs font-bold rounded-lg hover:bg-green-500/20 transition-all">
            <Check size={12} /> Verify
          </button>
          <button onClick={() => onReject(member)}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500/10 border border-red-500/30
                       text-red-400 text-xs font-bold rounded-lg hover:bg-red-500/20 transition-all">
            <X size={12} /> Reject
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── Verify modal ─────────────────────────────────────────────────────────────

function VerifyModal({ member, onClose, onDone }: {
  member: Member;
  onClose: () => void;
  onDone:  (certUrl: string, waLink: string) => void;
}) {
  const [receipt,    setReceipt]    = useState(member.transactions?.[0]?.mpesa_receipt_number ?? "");
  const [amount,     setAmount]     = useState(member.transactions?.[0]?.amount ?? 1200);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [certResult, setCertResult] = useState<{ certUrl: string; waLink: string } | null>(null);

  const handleVerify = async () => {
    setError(null);
    setLoading(true);
    try {
      // 1. Verify member
      const vRes = await fetch("/api/admin/verify-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id, mpesaReceipt: receipt, amount }),
      });
      const vData = await vRes.json();
      if (!vRes.ok) throw new Error(vData.error);

      // 2. Generate certificate
      const cRes = await fetch("/api/admin/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id }),
      });
      const cData = await cRes.json();
      if (!cRes.ok) throw new Error(cData.error);

      setCertResult({ certUrl: cData.certificateUrl, waLink: cData.whatsappLink });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <h3 className="font-black text-white uppercase tracking-tight">Verify & Issue Certificate</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl px-4 py-3">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          {certResult ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                <CheckCircle size={20} className="text-green-400 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Certificate issued!</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {member.full_name} is now a verified UBTA member.
                  </p>
                </div>
              </div>

              <a href={certResult.certUrl} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-orange-500/10 border border-orange-500/30
                           text-orange-400 font-bold text-sm py-3 rounded-xl hover:bg-orange-500/20 transition-all">
                <Eye size={15} /> View Certificate PDF
              </a>

              <a href={certResult.waLink} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500
                           text-white font-bold text-sm py-3 rounded-xl transition-all">
                <Phone size={15} /> Send to Member via WhatsApp
              </a>

              <button onClick={() => onDone(certResult.certUrl, certResult.waLink)}
                className="w-full text-gray-500 hover:text-gray-300 text-xs font-semibold py-2 transition-colors">
                Close
              </button>
            </div>
          ) : (
            <>
              <div className="bg-[#0B0F19] border border-gray-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Member</span>
                  <span className="text-white font-semibold">{member.full_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-white font-mono">{member.phone_number}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">ID Number</span>
                  <span className="text-white font-mono">{member.id_number}</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  M-Pesa Receipt Code
                </label>
                <input type="text" value={receipt}
                  onChange={(e) => setReceipt(e.target.value.toUpperCase())}
                  placeholder="e.g. RCX1A2B3C4D"
                  className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white
                             text-sm font-mono focus:outline-none focus:border-green-500/60 transition-all" />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Amount Paid (Ksh)
                </label>
                <input type="number" value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white
                             text-sm font-mono focus:outline-none focus:border-green-500/60 transition-all" />
              </div>

              <button onClick={handleVerify} disabled={loading}
                className="w-full bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed
                           text-white font-bold uppercase tracking-wide py-3.5 rounded-xl transition-all
                           flex items-center justify-center gap-2 text-sm">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
                ) : (
                  <><Check size={15} /> Confirm & Issue Certificate</>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Reissue modal ────────────────────────────────────────────────────────────

function ReissueModal({ member, onClose, onDone }: {
  member: Member;
  onClose: () => void;
  onDone: () => void;
}) {
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState<string | null>(null);
  const [certResult, setCertResult] = useState<{ certUrl: string; waLink: string } | null>(null);

  const handleReissue = async () => {
    setError(null);
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ memberId: member.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCertResult({ certUrl: data.certificateUrl, waLink: data.whatsappLink });
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#111827] border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <FileText size={15} className="text-teal-400" />
            <h3 className="font-black text-white uppercase tracking-tight">Reissue Certificate</h3>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl px-4 py-3">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          {certResult ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 bg-teal-500/10 border border-teal-500/30 rounded-xl p-4">
                <CheckCircle size={20} className="text-teal-400 shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Certificate reissued!</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    A new certificate has been generated for {member.full_name}.
                  </p>
                </div>
              </div>

              <a href={certResult.certUrl} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-teal-500/10 border border-teal-500/30
                           text-teal-400 font-bold text-sm py-3 rounded-xl hover:bg-teal-500/20 transition-all">
                <Eye size={15} /> View Certificate PDF
              </a>

              <a href={certResult.waLink} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500
                           text-white font-bold text-sm py-3 rounded-xl transition-all">
                <Phone size={15} /> Send to Member via WhatsApp
              </a>

              <button onClick={onDone}
                className="w-full text-gray-500 hover:text-gray-300 text-xs font-semibold py-2 transition-colors">
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Member summary */}
              <div className="bg-[#0B0F19] border border-gray-800 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Member</span>
                  <span className="text-white font-semibold">{member.full_name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Member #</span>
                  <span className="text-orange-400 font-black font-mono">#{member.member_number}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Phone</span>
                  <span className="text-white font-mono">{member.phone_number}</span>
                </div>
              </div>

              {/* Existing cert link if present */}
              {member.certificate_url && (
                <div className="flex items-center justify-between bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3">
                  <span className="text-gray-500 text-xs">Current certificate</span>
                  <a href={member.certificate_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-teal-400 text-xs font-bold hover:text-teal-300 transition-colors">
                    <Eye size={12} /> View
                  </a>
                </div>
              )}

              <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
                <p className="text-amber-400 text-xs">
                  This will regenerate and replace the existing certificate PDF for this member.
                </p>
              </div>

              <button onClick={handleReissue} disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-500 disabled:opacity-50 disabled:cursor-not-allowed
                           text-white font-bold uppercase tracking-wide py-3.5 rounded-xl transition-all
                           flex items-center justify-center gap-2 text-sm">
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
                ) : (
                  <><FileText size={15} /> Regenerate Certificate</>
                )}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main dashboard ───────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [admin,           setAdmin]           = useState<AdminInfo | null>(null);
  const [activeTab,       setActiveTab]       = useState<"pending" | "verified" | "gallery">("pending");
  const [members,         setMembers]         = useState<Member[]>([]);
  const [pendingMembers,  setPendingMembers]  = useState<Member[]>([]);
  const [total,           setTotal]           = useState(0);
  const [page,            setPage]            = useState(1);
  const [search,          setSearch]          = useState("");
  const [searchInput,     setSearchInput]     = useState("");
  const [loading,         setLoading]         = useState(false);
  const [viewMember,      setViewMember]      = useState<Member | null>(null);
  const [editMember,      setEditMember]      = useState<Member | null>(null);
  const [verifyMember,    setVerifyMember]    = useState<Member | null>(null);
  const [reissueMember,   setReissueMember]   = useState<Member | null>(null);

  const isChairman = admin?.role === "chairman";
  const totalPages = Math.ceil(total / 20);

  const fetchMembers = useCallback(async () => {
    if (!admin) return;
    setLoading(true);
    try {
      const [verRes, penRes] = await Promise.all([
        fetch(`/api/admin/members?page=${page}&search=${encodeURIComponent(search)}&status=verified`),
        fetch(`/api/admin/members?page=1&search=&status=pending`),
      ]);
      const verData = await verRes.json();
      const penData = await penRes.json();
      if (verRes.ok) { setMembers(verData.members ?? []); setTotal(verData.total ?? 0); }
      if (penRes.ok)   setPendingMembers(penData.members ?? []);
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

  const handleReject = async (member: Member) => {
    if (!confirm(`Reject application from ${member.full_name}?`)) return;
    await fetch("/api/admin/members", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: member.id, status: "rejected" }),
    });
    setPendingMembers((prev) => prev.filter((m) => m.id !== member.id));
  };

  const handleVerifyDone = () => {
    setVerifyMember(null);
    fetchMembers();
  };

  // Open reissue modal; close any open view/edit modal first so they don't stack
  const handleReissueOpen = (member: Member) => {
    setViewMember(null);
    setEditMember(null);
    setReissueMember(member);
  };

  const handleReissueDone = () => {
    setReissueMember(null);
    fetchMembers();
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
            <StatCard label="Total Verified"   value={total}  icon={Users}     color="bg-orange-500/10 text-orange-400" />
            <StatCard label="Pending Review"   value={pendingMembers.length} icon={AlertCircle} color="bg-amber-500/10 text-amber-400" />
            <StatCard label="Counties Active"  value={[...new Set(members.map((m) => m.working_county))].length} icon={MapPin} color="bg-blue-500/10 text-blue-400" />
            <StatCard label="Total SACCO Bal"  value={fmtMoney(members.reduce((s, m) => s + m.sacco_balance, 0))} icon={TrendingUp} color="bg-green-500/10 text-green-400" />
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-[#111827] border border-gray-800 rounded-xl p-1 w-fit">
          <button onClick={() => setActiveTab("pending")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all
              ${activeTab === "pending"
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "text-gray-500 hover:text-gray-300"}`}>
            <AlertCircle size={13} /> Pending
            {pendingMembers.length > 0 && (
              <span className="bg-amber-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full">
                {pendingMembers.length}
              </span>
            )}
          </button>
          <button onClick={() => setActiveTab("verified")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all
              ${activeTab === "verified"
                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                : "text-gray-500 hover:text-gray-300"}`}>
            <CheckCircle size={13} /> Verified Members
          </button>
          <button onClick={() => setActiveTab("gallery")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${activeTab === "gallery" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" : "text-gray-500 hover:text-gray-300"}`}>
            <Camera size={13} /> Gallery
          </button>
        </div>

        {activeTab !== "gallery" && (
        <div className="bg-[#111827] border border-gray-800 rounded-2xl overflow-hidden">

          {/* Table header */}
          <div className="p-5 border-b border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-black text-white text-lg uppercase tracking-tight">
                {activeTab === "pending" ? "Pending Applications" : "Verified Members"}
              </h2>
              <p className="text-gray-500 text-xs mt-0.5">
                {activeTab === "pending"
                  ? `${pendingMembers.length} application${pendingMembers.length !== 1 ? "s" : ""} awaiting review`
                  : `${total} verified members`}
              </p>
            </div>
            {activeTab === "verified" && (
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
                    className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all">
                    Search
                  </button>
                </form>
                <button onClick={fetchMembers}
                  className="p-2.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
                  <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
                </button>
              </div>
            )}
            {activeTab === "pending" && (
              <button onClick={fetchMembers}
                className="p-2.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
                <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              </button>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {activeTab === "pending" ? (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800/60">
                    {["Applicant", "ID Number", "County", "M-Pesa Receipt", "Applied", "Actions"].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500 text-sm">
                      <RefreshCw size={20} className="animate-spin mx-auto mb-2" />Loading...
                    </td></tr>
                  ) : pendingMembers.length === 0 ? (
                    <tr><td colSpan={6} className="px-4 py-12 text-center text-gray-500 text-sm">
                      No pending applications 🎉
                    </td></tr>
                  ) : pendingMembers.map((m) => (
                    <PendingRow
                      key={m.id}
                      member={m}
                      onVerify={setVerifyMember}
                      onReject={handleReject}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800/60">
                    {["#", "Member", "ID Number", "County", "Plate", "Status", "Joined", ""].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-gray-500 uppercase tracking-widest">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-500 text-sm">
                      <RefreshCw size={20} className="animate-spin mx-auto mb-2" />Loading members...
                    </td></tr>
                  ) : members.length === 0 ? (
                    <tr><td colSpan={8} className="px-4 py-12 text-center text-gray-500 text-sm">
                      {search ? "No members match your search" : "No verified members yet"}
                    </td></tr>
                  ) : members.map((m) => (
                    <MemberRow
                      key={m.id}
                      member={m}
                      isChairman={isChairman}
                      onView={setViewMember}
                      onEdit={setEditMember}
                      onReissue={handleReissueOpen}
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-800 flex items-center justify-between">
              <p className="text-gray-500 text-xs">
                Page {page} of {totalPages} · {total} members
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg disabled:opacity-30 transition-all">
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg disabled:opacity-30 transition-all">
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      </div>
      {activeTab === "gallery" && (
        <div className="p-6">
          <GalleryTab />
        </div>
      )}
      {/* Modals */}
      {viewMember && (
        <MemberModal
          member={viewMember}
          isChairman={isChairman}
          onClose={() => setViewMember(null)}
          onSave={handleSave}
          onReissue={handleReissueOpen}
        />
      )}
      {editMember && (
        <MemberModal
          member={editMember}
          isChairman={isChairman}
          onClose={() => setEditMember(null)}
          onSave={handleSave}
          onReissue={handleReissueOpen}
        />
      )}
      {verifyMember && (
        <VerifyModal
          member={verifyMember}
          onClose={() => setVerifyMember(null)}
          onDone={handleVerifyDone}
        />
      )}
      {reissueMember && (
        <ReissueModal
          member={reissueMember}
          onClose={() => setReissueMember(null)}
          onDone={handleReissueDone}
        />
      )}
    </div>
  );
}
function GalleryTab() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Community");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/gallery").then(r => r.json()).then(d => setItems(d.items ?? []));
  }, [success]);

  const handleUpload = async () => {
    if (!file || !title || !date || !location) {
      setError("All fields required"); return;
    }
    setLoading(true); setError(null);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", title);
    fd.append("category", category);
    fd.append("date", date);
    fd.append("location", location);
    const res = await fetch("/api/admin/gallery", { method: "POST", body: fd });
    const data = await res.json();
    if (!res.ok) setError(data.error);
    else { setSuccess(true); setTitle(""); setDate(""); setLocation(""); setFile(null); setTimeout(() => setSuccess(false), 3000); }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this photo?")) return;
    await fetch("/api/admin/gallery", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6">
        <h3 className="font-black text-white text-lg uppercase tracking-tight mb-6">Upload Photo</h3>
        {error && <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs rounded-xl px-4 py-3 mb-4">{error}</div>}
        {success && <div className="bg-green-500/10 border border-green-500/30 text-green-400 text-xs rounded-xl px-4 py-3 mb-4">Photo uploaded successfully!</div>}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Safety Training Day"
              className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/60" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/60">
              {["Community", "Rider Training", "SACCO Meetings", "Infrastructure"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Date</label>
            <input value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. July 2026"
              className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/60" />
          </div>
          <div>
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Location</label>
            <input value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Githurai Hub"
              className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/60" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-2">Photo</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] ?? null)}
              className="w-full bg-[#0B0F19] border border-gray-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-orange-500/60" />
          </div>
        </div>
        <button onClick={handleUpload} disabled={loading}
          className="mt-6 w-full bg-[#F37121] hover:bg-[#d65f17] disabled:opacity-50 text-white font-bold uppercase tracking-wide py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm">
          {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Uploading...</> : "Upload Photo"}
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item: any) => (
          <div key={item.id} className="bg-[#111827] border border-gray-800 rounded-xl overflow-hidden">
            <div className="h-40 bg-cover bg-center" style={{ backgroundImage: `url('${item.image_url}')` }} />
            <div className="p-4">
              <p className="text-white font-bold text-sm">{item.title}</p>
              <p className="text-gray-500 text-xs mt-1">{item.category} · {item.date}</p>
              <p className="text-gray-600 text-xs">{item.location}</p>
              <button onClick={() => handleDelete(item.id)}
                className="mt-3 w-full text-red-400 hover:text-red-300 text-xs font-bold border border-red-500/20 hover:border-red-500/40 rounded-lg py-1.5 transition-all">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
