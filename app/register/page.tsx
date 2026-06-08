"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  User, Phone, Calendar, CreditCard, FileText,
  Bike, MapPin, Users, Upload, CheckCircle,
  AlertCircle, ArrowRight, ChevronDown, X,
  Building2, Landmark, ShieldCheck, ChevronLeft,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

type RegistrantType = "individual" | "sacco_affiliate" | null;
type MembershipOption = "ubta_only" | "sacco_only" | "both" | null;
type Step = "who" | "membership" | "form" | "payment";

type UploadedFile = { name: string; size: number } | null;

interface IndividualForm {
  fullName: string;
  phone: string;
  dob: string;
  idNumber: string;
  kraPin: string;
  plateNumber: string;
  county: string;
  subCounty: string;
  stageNode: string;
  stageNodeCustom: string;
  kinName: string;
  kinPhone: string;
  kinRelationship: string;
}

interface AffiliateForm {
  saccoName: string;
  regNumber: string;
  contactPerson: string;
  phone: string;
  email: string;
  county: string;
  subCounty: string;
  memberCount: string;
  kraPin: string;
  yearEstablished: string;
  description: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const COUNTIES = [
  "Nairobi County", "Kiambu County", "Machakos County",
  "Mombasa County", "Nakuru County", "Kisumu County",
];

const SUB_COUNTIES: Record<string, string[]> = {
  "Nairobi County":  ["Kasarani", "Starehe", "Njiru", "Embakasi", "Westlands"],
  "Kiambu County":   ["Thika Town", "Ruiru", "Kiambu Town", "Limuru", "Kikuyu"],
  "Machakos County": ["Machakos Town", "Athi River", "Kathiani", "Masinga"],
  "Mombasa County":  ["Mvita", "Kisauni", "Nyali", "Likoni", "Changamwe"],
  "Nakuru County":   ["Nakuru Town East", "Nakuru Town West", "Naivasha", "Gilgil"],
  "Kisumu County":   ["Kisumu Central", "Kisumu East", "Kisumu West", "Nyando"],
};

const STAGE_NODES = [
  "Githurai 45", "Mwiki", "Kasarani Stage",
  "Hunters", "Santton", "Other / Not Listed",
];

const KIN_RELATIONSHIPS = ["Spouse", "Parent", "Sibling", "Child"];

const EMPTY_INDIVIDUAL: IndividualForm = {
  fullName: "", phone: "", dob: "", idNumber: "", kraPin: "",
  plateNumber: "", county: "", subCounty: "", stageNode: "",
  stageNodeCustom: "", kinName: "", kinPhone: "", kinRelationship: "",
};

const EMPTY_AFFILIATE: AffiliateForm = {
  saccoName: "", regNumber: "", contactPerson: "", phone: "",
  email: "", county: "", subCounty: "", memberCount: "",
  kraPin: "", yearEstablished: "", description: "",
};

// ─── Fee calculator ───────────────────────────────────────────────────────────

function getFees(opt: MembershipOption) {
  const base = { registration: 1000 };
  if (opt === "ubta_only")  return [{ label: "UBTA Registration Fee", amount: base.registration }];
  if (opt === "sacco_only") return [{ label: "CBD SACCO Registration Fee", amount: base.registration }];
  if (opt === "both")       return [
    { label: "UBTA Registration Fee", amount: base.registration },
    { label: "CBD SACCO Registration Fee", amount: base.registration },
  ];
  return [];
}

function getTotal(opt: MembershipOption) {
  return getFees(opt).reduce((s, f) => s + f.amount, 0);
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function SectionHeading({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-800">
      <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center font-bold text-white text-sm shrink-0">
        {number}
      </div>
      <div>
        <h2 className="font-bold text-white text-xl uppercase tracking-wide">{title}</h2>
        <p className="text-slate-500 text-xs mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

function Field({
  icon: Icon, label, name, type = "text", placeholder, value,
  onChange, required = true, pattern, hint, disabled,
}: {
  icon: React.ElementType; label: string; name: string;
  type?: string; placeholder: string; value: string;
  onChange: (n: string, v: string) => void;
  required?: boolean; pattern?: string; hint?: string; disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          <Icon size={15} />
        </div>
        <input
          type={type} name={name} value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder} required={required}
          pattern={pattern} disabled={disabled}
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3.5
                     text-white text-sm placeholder:text-slate-600
                     focus:outline-none focus:border-orange-500/60 focus:bg-slate-900
                     disabled:opacity-40 transition-all"
        />
      </div>
      {hint && <p className="mt-1.5 text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

function SelectField({
  icon: Icon, label, name, value, onChange, options, placeholder, required = true, disabled,
}: {
  icon: React.ElementType; label: string; name: string;
  value: string; onChange: (n: string, v: string) => void;
  options: string[]; placeholder: string; required?: boolean; disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          <Icon size={15} />
        </div>
        <select
          name={name} value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required} disabled={disabled}
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-10 py-3.5
                     text-sm focus:outline-none focus:border-orange-500/60 focus:bg-slate-900
                     transition-all appearance-none cursor-pointer
                     disabled:opacity-40 disabled:cursor-not-allowed
                     text-white [&>option]:bg-slate-950 [&>option]:text-white"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={13} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
      </div>
    </div>
  );
}

function Textarea({
  icon: Icon, label, name, placeholder, value, onChange, required = true, hint,
}: {
  icon: React.ElementType; label: string; name: string;
  placeholder: string; value: string;
  onChange: (n: string, v: string) => void;
  required?: boolean; hint?: string;
}) {
  return (
    <div className="w-full">
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute left-3.5 top-4 text-slate-500 pointer-events-none">
          <Icon size={15} />
        </div>
        <textarea
          name={name} value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder} required={required} rows={3}
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3.5
                     text-white text-sm placeholder:text-slate-600 resize-none
                     focus:outline-none focus:border-orange-500/60 focus:bg-slate-900 transition-all"
        />
      </div>
      {hint && <p className="mt-1.5 text-[11px] text-slate-500">{hint}</p>}
    </div>
  );
}

function UploadField({
  label, hint, file, onFile, accept = "image/*,.pdf", required = true,
}: {
  label: string; hint: string; file: UploadedFile;
  onFile: (f: UploadedFile) => void; accept?: string; required?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const fmt = (b: number) => b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`;

  return (
    <div className="w-full">
      <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      {file ? (
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3.5">
          <CheckCircle size={15} className="text-green-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{file.name}</p>
            <p className="text-xs text-slate-500">{fmt(file.size)}</p>
          </div>
          <button type="button" onClick={() => { onFile(null); if (ref.current) ref.current.value = ""; }}
            className="text-slate-500 hover:text-white transition-colors" aria-label="Remove">
            <X size={14} />
          </button>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()}
          className="w-full border border-dashed border-slate-700 rounded-xl px-4 py-5
                     flex flex-col items-center gap-2 hover:border-orange-500/50
                     hover:bg-orange-500/5 transition-all group">
          <Upload size={18} className="text-slate-500 group-hover:text-orange-500 transition-colors" />
          <span className="text-sm text-slate-400 group-hover:text-slate-300">Click to upload</span>
          <span className="text-xs text-slate-600">{hint}</span>
        </button>
      )}
      <input ref={ref} type="file" accept={accept} className="hidden"
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onFile({ name: f.name, size: f.size }); }}
        required={required && !file} />
    </div>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

const INDIVIDUAL_STEPS = ["Who are you?", "Membership", "Your Details", "Payment"];
const AFFILIATE_STEPS  = ["Who are you?", "Organisation Details", "Payment"];

function ProgressBar({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {steps.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`flex items-center gap-1.5 text-[11px] ${i <= current ? "text-orange-400 font-semibold" : "text-slate-600"}`}>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold
              ${i < current ? "bg-green-500 text-white" : i === current ? "bg-orange-500 text-white" : "bg-slate-800 text-slate-500"}`}>
              {i < current ? "✓" : i + 1}
            </div>
            {label}
          </div>
          {i < steps.length - 1 && <div className="w-5 h-px bg-slate-800" />}
        </div>
      ))}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const [registrantType, setRegistrantType] = useState<RegistrantType>(null);
  const [membership, setMembership] = useState<MembershipOption>(null);
  const [step, setStep] = useState<Step>("who");

  // Individual form
  const [form, setForm] = useState<IndividualForm>(EMPTY_INDIVIDUAL);
  const [idFile,     setIdFile]     = useState<UploadedFile>(null);
  const [idBackFile, setIdBackFile] = useState<UploadedFile>(null);
  const [photoFile,  setPhotoFile]  = useState<UploadedFile>(null);

  // Affiliate form
  const [affForm, setAffForm] = useState<AffiliateForm>(EMPTY_AFFILIATE);
  const [affRegDoc,    setAffRegDoc]    = useState<UploadedFile>(null);
  const [affKraDoc,    setAffKraDoc]    = useState<UploadedFile>(null);
  const [affLetterDoc, setAffLetterDoc] = useState<UploadedFile>(null);

  const [submitting,   setSubmitting]   = useState(false);
  const [submitted,    setSubmitted]    = useState(false);
  const [error,        setError]        = useState<string | null>(null);
  const [mpesaReceipt, setMpesaReceipt] = useState("");

  // Derived
  const subCountyOpts    = form.county    ? (SUB_COUNTIES[form.county]    ?? []) : [];
  const affSubCountyOpts = affForm.county ? (SUB_COUNTIES[affForm.county] ?? []) : [];

  const updateForm = (n: string, v: string) => {
    setForm((prev) => {
      const val = (n === "kraPin" || n === "plateNumber") ? v.toUpperCase() : v;
      const next = { ...prev, [n]: val } as IndividualForm;
      if (n === "county") next.subCounty = "";
      return next;
    });
  };

  const updateAff = (n: string, v: string) => {
    setAffForm((prev) => {
      const val = n === "kraPin" ? v.toUpperCase() : v;
      const next = { ...prev, [n]: val } as AffiliateForm;
      if (n === "county") next.subCounty = "";
      return next;
    });
  };

  const currentStepIndex = (() => {
    if (registrantType === "individual") {
      return { who: 0, membership: 1, form: 2, payment: 3 }[step] ?? 0;
    }
    return { who: 0, form: 1, payment: 2 }[step] ?? 0;
  })();

  // ── Step: WHO ARE YOU ──────────────────────────────────────────────────────

  if (step === "who") {
    return (
      <PageShell>
        <PageHeader
          badge="Membership Registration"
          title={<>Join <span className="text-orange-500">UBTA</span></>}
          subtitle="Select how you want to register. Individual riders can join UBTA, CBD SACCO, or both. SACCOs and organisations can apply to affiliate under UBTA."
          progress={<ProgressBar steps={INDIVIDUAL_STEPS} current={0} />}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Who are you registering as?</h2>
          <div className="grid sm:grid-cols-2 gap-4">

            {/* Individual */}
            <button
              onClick={() => { setRegistrantType("individual"); setStep("membership"); }}
              className="group text-left p-6 bg-slate-900/40 border-2 border-slate-800
                         hover:border-orange-500/60 hover:bg-orange-500/5
                         rounded-2xl transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors">
                <Bike size={22} className="text-orange-400" />
              </div>
              <h3 className="font-bold text-white text-base uppercase tracking-tight mb-2">
                Individual Rider
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                A boda boda or taxi rider registering as an individual member of UBTA, CBD SACCO, or both.
              </p>
              <div className="mt-4 flex items-center gap-1 text-orange-400 text-xs font-semibold">
                Continue <ArrowRight size={13} />
              </div>
            </button>

            {/* SACCO Affiliate */}
            <button
              onClick={() => { setRegistrantType("sacco_affiliate"); setStep("form"); }}
              className="group text-left p-6 bg-slate-900/40 border-2 border-slate-800
                         hover:border-teal-500/60 hover:bg-teal-500/5
                         rounded-2xl transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center mb-4 group-hover:bg-teal-500/20 transition-colors">
                <Building2 size={22} className="text-teal-400" />
              </div>
              <h3 className="font-bold text-white text-base uppercase tracking-tight mb-2">
                SACCO / Organisation
              </h3>
              <p className="text-slate-500 text-xs leading-relaxed">
                An existing SACCO or transport organisation applying to affiliate under the UBTA umbrella.
              </p>
              <div className="mt-4 flex items-center gap-1 text-teal-400 text-xs font-semibold">
                Continue <ArrowRight size={13} />
              </div>
            </button>
          </div>
        </div>
      </PageShell>
    );
  }

  // ── Step: MEMBERSHIP SELECTION (Individual only) ───────────────────────────

  if (step === "membership" && registrantType === "individual") {
    const options: { id: MembershipOption; label: string; sub: string; fees: string; color: string; accent: string }[] = [
      {
        id: "ubta_only",
        label: "UBTA Membership Only",
        sub: "Join the association. Access leadership, welfare, and advocacy services.",
        fees: "Ksh 1,000",
        color: "border-orange-500/60 bg-orange-500/5",
        accent: "text-orange-400",
      },
      {
        id: "sacco_only",
        label: "CBD SACCO Only",
        sub: "Join the cooperative. Save monthly, build credit, access loans up to 3× savings.",
        fees: "Ksh 1,000",
        color: "border-teal-500/60 bg-teal-500/5",
        accent: "text-teal-400",
      },
      {
        id: "both",
        label: "UBTA + CBD SACCO",
        sub: "Full membership — join both the association and the cooperative for complete benefits.",
        fees: "Ksh 2,000 total (Ksh 1,000 per membership)",
        color: "border-green-500/60 bg-green-500/5",
        accent: "text-green-400",
      },
    ];

    return (
      <PageShell>
        <PageHeader
          badge="Step 2 of 4"
          title={<>Choose <span className="text-orange-500">Membership</span></>}
          subtitle="Select what you want to join. You can join UBTA, CBD SACCO, or both. Fees shown are one-time registration + monthly office management."
          progress={<ProgressBar steps={INDIVIDUAL_STEPS} current={1} />}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <BackButton onClick={() => setStep("who")} />
          <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 mt-6">Select your membership type</h2>

          <div className="space-y-4">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => { setMembership(opt.id); setStep("form"); }}
                className={`group w-full text-left p-5 sm:p-6 bg-slate-900/40 border-2 border-slate-800
                             hover:${opt.color} rounded-2xl transition-all duration-200
                             ${membership === opt.id ? opt.color : ""}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-white text-sm uppercase tracking-tight mb-1">
                      {opt.label}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed mb-3">{opt.sub}</p>
                    <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold ${opt.accent} bg-slate-900/60 px-3 py-1.5 rounded-lg`}>
                      <CreditCard size={11} /> {opt.fees}
                    </div>
                  </div>
                  <ArrowRight size={16} className={`${opt.accent} shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity`} />
                </div>
              </button>
            ))}
          </div>

          <p className="mt-6 text-slate-600 text-xs text-center">
            Combined membership pricing is subject to review. Individual fee structure shown for now.
          </p>
        </div>
      </PageShell>
    );
  }

  // ── Step: INDIVIDUAL REGISTRATION FORM ────────────────────────────────────

  if (step === "form" && registrantType === "individual") {
    const handleProceed = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      const required: (keyof IndividualForm)[] = [
        "fullName","phone","dob","idNumber","kraPin","plateNumber",
        "county","subCounty","stageNode","kinName","kinPhone","kinRelationship",
      ];
      if (required.some((f) => !form[f].trim())) {
        setError("Please complete all required fields before proceeding.");
        return;
      }
      if (!idFile || !idBackFile || !photoFile) {
        setError("Please upload all three required documents.");
        return;
      }
      setStep("payment");
    };

    return (
      <PageShell>
        <PageHeader
          badge="Step 3 of 4 — Rider Details"
          title={<>Your <span className="text-orange-500">Details</span></>}
          subtitle="Complete your registration details accurately. All information is used for legal records."
          progress={<ProgressBar steps={INDIVIDUAL_STEPS} current={2} />}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <BackButton onClick={() => setStep("membership")} />

          {/* Membership badge */}
          {membership && (
            <div className="mt-5 mb-6 inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border
              bg-orange-500/10 border-orange-500/30 text-orange-400">
              <CheckCircle size={12} />
              {membership === "ubta_only" ? "UBTA Membership" : membership === "sacco_only" ? "CBD SACCO Membership" : "UBTA + CBD SACCO Membership"}
              {" "}— Ksh {getTotal(membership).toLocaleString()}
            </div>
          )}

          {error && <ErrorBanner msg={error} />}

          <form onSubmit={handleProceed} noValidate className="space-y-8 mt-4">

            {/* Section 1 */}
            <Section>
              <SectionHeading number="01" title="Personal Details"
                subtitle="Provide accurate legal records for institutional compliance." />
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <Field icon={User} label="Full Legal Name" name="fullName"
                    placeholder="e.g. John Kamau Njoroge" value={form.fullName} onChange={updateForm}
                    hint="Exactly as it appears on your National ID" />
                </div>
                <Field icon={Phone} label="Mobile Number" name="phone" type="tel"
                  placeholder="e.g. 0712 345 678" value={form.phone} onChange={updateForm}
                  hint="Active Safaricom line for M-Pesa and communication" />
                <Field icon={Calendar} label="Date of Birth" name="dob" type="date"
                  placeholder="" value={form.dob} onChange={updateForm} />
                <Field icon={CreditCard} label="National ID Number" name="idNumber"
                  placeholder="e.g. 12345678" value={form.idNumber} onChange={updateForm}
                  pattern="[0-9]{7,8}" hint="7 or 8 digit number on your National ID" />
                <Field icon={FileText} label="KRA PIN Number" name="kraPin"
                  placeholder="e.g. A012345678Z" value={form.kraPin} onChange={updateForm}
                  hint="From itax.kra.go.ke" />
                <div className="sm:col-span-2">
                  <Field icon={Bike} label="Motorbike Plate No." name="plateNumber"
                    placeholder="e.g. KMCD 123A" value={form.plateNumber} onChange={updateForm}
                    hint="Your registered motorbike number plate" />
                </div>
              </div>
            </Section>

            {/* Section 2 */}
            <Section>
              <SectionHeading number="02" title="Location & Stage"
                subtitle="Your operating county, sub-county, and the stage where you operate." />
              <div className="grid sm:grid-cols-2 gap-5">
                <SelectField icon={MapPin} label="Operating County" name="county"
                  value={form.county} onChange={updateForm} options={COUNTIES} placeholder="Select county" />
                <SelectField icon={MapPin} label="Sub-County" name="subCounty"
                  value={form.subCounty} onChange={updateForm} options={subCountyOpts}
                  placeholder={form.county ? "Select sub-county" : "Select county first"} disabled={!form.county} />
                <div className="sm:col-span-2">
                  <SelectField icon={Bike} label="Your Stage" name="stageNode"
                    value={form.stageNode} onChange={updateForm} options={STAGE_NODES} placeholder="Select your stage or choose Other" />
                </div>
                {form.stageNode === "Other / Not Listed" && (
                  <div className="sm:col-span-2">
                    <Field icon={MapPin} label="Enter Your Stage Name" name="stageNodeCustom"
                      placeholder="e.g. Roysambu, Mwea, Thika Town Stage"
                      value={form.stageNodeCustom} onChange={updateForm}
                      hint="Type the name of your stage as it's commonly known" />
                  </div>
                )}
              </div>
            </Section>

            {/* Section 3 */}
            <Section>
              <SectionHeading number="03" title="Next of Kin"
                subtitle="Emergency contact — required for all members." />
              <div className="grid sm:grid-cols-2 gap-5">
                <Field icon={User} label="Kin Full Name" name="kinName"
                  placeholder="e.g. Mary Wanjiru Kamau" value={form.kinName} onChange={updateForm} />
                <Field icon={Phone} label="Kin Phone" name="kinPhone" type="tel"
                  placeholder="e.g. 0722 987 654" value={form.kinPhone} onChange={updateForm} />
                <div className="sm:col-span-2">
                  <SelectField icon={Users} label="Relationship" name="kinRelationship"
                    value={form.kinRelationship} onChange={updateForm}
                    options={KIN_RELATIONSHIPS} placeholder="Select relationship" />
                </div>
              </div>
            </Section>

            {/* Section 4 */}
            <Section>
              <SectionHeading number="04" title="Document Upload"
                subtitle="Clear scans or photos. JPG, PNG, or PDF. Max 5MB each." />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <UploadField label="National ID — Front" hint="Photo side showing your name & ID number · JPG, PNG or PDF · Max 5MB"
                  file={idFile} onFile={setIdFile} />
                <UploadField label="National ID — Back" hint="Back side showing your fingerprint & serial number · JPG, PNG or PDF · Max 5MB"
                  file={idBackFile} onFile={setIdBackFile} />
                <UploadField label="Passport Photo" hint="Plain background · Clear face"
                  file={photoFile} onFile={setPhotoFile} accept="image/*" />
              </div>
            </Section>

            <button type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-base uppercase tracking-wide
                         py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-500/10">
              Proceed to Payment <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </PageShell>
    );
  }

  // ── Step: SACCO AFFILIATE FORM ─────────────────────────────────────────────

  if (step === "form" && registrantType === "sacco_affiliate") {
    const handleProceed = (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      const required: (keyof AffiliateForm)[] = [
        "saccoName","regNumber","contactPerson","phone","email",
        "county","subCounty","memberCount","kraPin",
      ];
      if (required.some((f) => !affForm[f].trim())) {
        setError("Please complete all required fields before proceeding.");
        return;
      }
      if (!affRegDoc || !affKraDoc || !affLetterDoc) {
        setError("Please upload all three required documents.");
        return;
      }
      setStep("payment");
    };

    return (
      <PageShell>
        <PageHeader
          badge="SACCO Affiliate Application"
          title={<>Affiliate <span className="text-teal-400">Application</span></>}
          subtitle="Apply to register your SACCO or transport organisation under the UBTA umbrella. Affiliation fees are under discussion — indicative pricing shown."
          progress={<ProgressBar steps={AFFILIATE_STEPS} current={1} />}
        />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
          <BackButton onClick={() => setStep("who")} />

          {/* Pricing notice */}
          <div className="mt-5 mb-6 flex items-start gap-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs text-amber-400">
            <AlertCircle size={15} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">Affiliate pricing is under review</p>
              <p className="text-amber-500/80">Indicative fees are shown below. Final pricing will be confirmed upon application review. Application fee: <strong className="text-amber-400">Ksh 5,000</strong> (non-refundable processing fee). Annual affiliation: <strong className="text-amber-400">TBD</strong>.</p>
            </div>
          </div>

          {error && <ErrorBanner msg={error} />}

          <form onSubmit={handleProceed} noValidate className="space-y-8">

            {/* Section 1 — Organisation Details */}
            <Section>
              <SectionHeading number="01" title="Organisation Details"
                subtitle="Legal registration details of your SACCO or transport body." />
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <Field icon={Building2} label="SACCO / Organisation Name" name="saccoName"
                    placeholder="e.g. Githurai Riders SACCO" value={affForm.saccoName} onChange={updateAff}
                    hint="Full legal name as registered" />
                </div>
                <Field icon={FileText} label="Registration Number" name="regNumber"
                  placeholder="e.g. CS/009876" value={affForm.regNumber} onChange={updateAff}
                  hint="From your SASRA or cooperative registration certificate" />
                <Field icon={FileText} label="KRA PIN Number" name="kraPin"
                  placeholder="e.g. P012345678A" value={affForm.kraPin} onChange={updateAff} />
                <Field icon={Calendar} label="Year Established" name="yearEstablished"
                  placeholder="e.g. 2018" value={affForm.yearEstablished} onChange={updateAff} required={false} />
                <Field icon={Users} label="Approximate Member Count" name="memberCount"
                  placeholder="e.g. 150" value={affForm.memberCount} onChange={updateAff}
                  hint="Number of active members in your organisation" />
              </div>
            </Section>

            {/* Section 2 — Contact */}
            <Section>
              <SectionHeading number="02" title="Contact & Location"
                subtitle="Primary contact person and operational base." />
              <div className="grid sm:grid-cols-2 gap-5">
                <Field icon={User} label="Contact Person Full Name" name="contactPerson"
                  placeholder="e.g. Peter Njoroge Kamau" value={affForm.contactPerson} onChange={updateAff} />
                <Field icon={Phone} label="Phone Number" name="phone" type="tel"
                  placeholder="e.g. 0712 345 678" value={affForm.phone} onChange={updateAff} />
                <div className="sm:col-span-2">
                  <Field icon={FileText} label="Email Address" name="email" type="email"
                    placeholder="e.g. sacco@example.co.ke" value={affForm.email} onChange={updateAff} />
                </div>
                <SelectField icon={MapPin} label="Operating County" name="county"
                  value={affForm.county} onChange={updateAff} options={COUNTIES} placeholder="Select county" />
                <SelectField icon={MapPin} label="Sub-County" name="subCounty"
                  value={affForm.subCounty} onChange={updateAff} options={affSubCountyOpts}
                  placeholder={affForm.county ? "Select sub-county" : "Select county first"} disabled={!affForm.county} />
                <div className="sm:col-span-2">
                  <Textarea icon={FileText} label="Brief Description" name="description"
                    placeholder="Briefly describe your SACCO's operations, focus area, and why you want to affiliate with UBTA."
                    value={affForm.description} onChange={updateAff} required={false}
                    hint="Optional but recommended — helps our review committee process your application faster." />
                </div>
              </div>
            </Section>

            {/* Section 3 — Documents */}
            <Section>
              <SectionHeading number="03" title="Required Documents"
                subtitle="Upload clear scans or photos. JPG, PNG, or PDF. Max 5MB each." />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <UploadField label="Registration Certificate"
                  hint="SASRA or cooperative certificate"
                  file={affRegDoc} onFile={setAffRegDoc} />
                <UploadField label="Back Side of ID"
                  hint="ID back page · Max 5MB"
                  file={affKraDoc} onFile={setAffKraDoc} />
                <UploadField label="Letter of Intent"
                  hint="Signed letter from your leadership"
                  file={affLetterDoc} onFile={setAffLetterDoc} />
              </div>
            </Section>

            {/* Fee summary */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Indicative fee summary</p>
              <div className="space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Application Processing Fee</span>
                  <span className="text-white font-bold">Ksh 5,000</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Annual Affiliation Fee</span>
                  <span className="text-amber-400 font-semibold">TBD — pending review</span>
                </div>
                <div className="pt-2.5 border-t border-slate-800 flex justify-between">
                  <span className="text-white font-bold text-sm">Payable Now</span>
                  <span className="text-teal-400 font-black text-lg">Ksh 5,000</span>
                </div>
              </div>
            </div>

            <button type="submit"
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-base uppercase tracking-wide
                         py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-teal-600/10">
              Proceed to Payment <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </PageShell>
    );
  }

  // ── Step: PAYMENT (Manual M-Pesa receipt submission) ──────────────────────

  if (step === "payment") {
    const isAffiliate = registrantType === "sacco_affiliate";
    const payPhone    = isAffiliate ? affForm.phone : form.phone;
    const payName     = isAffiliate ? affForm.contactPerson : form.fullName;
    const fees        = isAffiliate
      ? [{ label: "Affiliate Application Processing Fee", amount: 5000 }]
      : getFees(membership);
    const total = fees.reduce((s, f) => s + f.amount, 0);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (!mpesaReceipt.trim()) {
        setError("Please enter your M-Pesa receipt code.");
        return;
      }
      setSubmitting(true);
      try {
        const res = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mpesaReceipt:     mpesaReceipt.trim().toUpperCase(),
            amount:           total,
            membershipType:   isAffiliate ? "affiliate" : membership,
            fullName:         isAffiliate ? affForm.contactPerson : form.fullName,
            phone:            payPhone,
            idNumber:         isAffiliate ? "" : form.idNumber,
            bikeRegistration: isAffiliate ? "" : form.plateNumber,
            county:           isAffiliate ? affForm.county : form.county,
            subCounty:        isAffiliate ? affForm.subCounty : form.subCounty,
            stageNode:        isAffiliate ? "" : (form.stageNode === "Other / Not Listed" ? form.stageNodeCustom : form.stageNode),
            dateOfBirth:      isAffiliate ? null : form.dob,
            kraPin:           isAffiliate ? affForm.kraPin : form.kraPin,
            emailAddress:     isAffiliate ? affForm.email : "",
            kinName:          isAffiliate ? null : form.kinName,
            kinPhone:         isAffiliate ? null : form.kinPhone,
            kinRelationship:  isAffiliate ? null : form.kinRelationship,
          }),
        });
        const data = await res.json();
        if (res.ok) {
          setSubmitted(true);
        } else {
          setError(data.error || "Submission failed. Please try again.");
        }
      } catch {
        setError("A network error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
    };

    if (submitted) {
      return (
        <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={36} className="text-green-500" />
            </div>
            <h1 className="font-bold text-white text-3xl uppercase mb-4">Application Submitted!</h1>
            <p className="text-slate-400 leading-relaxed mb-2">
              Thank you, <strong className="text-white">{payName}</strong>. Your application has been received and is pending verification.
            </p>
            <p className="text-slate-500 text-sm mb-3">
              Our team will verify your M-Pesa payment and issue your membership certificate. You will be contacted at <strong className="text-slate-300">{payPhone}</strong>.
            </p>
            <p className="text-slate-600 text-xs mb-8">
              Verification typically takes 1–2 business hours during working hours (Mon–Sat, 8am–6pm).
            </p>
            <div className="space-y-3">
              <a
                href={`https://wa.me/254714314342?text=Hello%20UBTA,%20I%20just%20submitted%20my%20membership%20application.%20My%20name%20is%20${encodeURIComponent(payName)}%20and%20my%20M-Pesa%20receipt%20is%20${encodeURIComponent(mpesaReceipt)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-full justify-center inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
              >
                <Phone size={16} /> Follow Up on WhatsApp
              </a>
              <Link href="/" className="w-full justify-center inline-flex items-center border border-slate-700 hover:border-slate-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all bg-slate-900/40">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <PageShell>
        <PageHeader
          badge={isAffiliate ? "Step 3 of 3 — Payment" : "Step 4 of 4 — Payment"}
          title={<>Confirm <span className="text-green-400">Payment</span></>}
          subtitle="Pay via M-Pesa paybill, then enter your receipt code below to complete your application."
          progress={<ProgressBar steps={isAffiliate ? AFFILIATE_STEPS : INDIVIDUAL_STEPS} current={isAffiliate ? 2 : 3} />}
        />
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-10">
          <BackButton onClick={() => setStep("form")} />

          {error && <ErrorBanner msg={error} />}

          {/* Payment instructions */}
          <div className="mt-5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 mb-5">
            <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">
              How to pay via M-Pesa
            </p>
            <ol className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">1</span>
                Go to <strong className="text-white">M-Pesa → Lipa Na M-Pesa → Pay Bill</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">2</span>
                Business No: <strong className="text-white font-mono">4146697</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">3</span>
                Account No: <strong className="text-white">{payName}</strong> (your full name)
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">4</span>
                Amount: <strong className="text-white font-mono">Ksh {total.toLocaleString()}</strong>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5">5</span>
                Enter your PIN and complete payment, then copy the <strong className="text-white">receipt code</strong> from the confirmation SMS
              </li>
            </ol>
          </div>

          <form onSubmit={handleSubmit} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 space-y-6">

            {/* Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0">
                <CreditCard size={18} />
              </div>
              <div>
                <h2 className="font-bold text-white text-lg uppercase tracking-wide">Confirm Your Payment</h2>
                <p className="text-slate-500 text-xs mt-0.5">Enter the receipt code from your M-Pesa SMS</p>
              </div>
            </div>

            {/* Order summary */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Applicant</span>
                <span className="text-white font-medium">{payName}</span>
              </div>
              {!isAffiliate && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Plate No.</span>
                  <span className="text-white font-mono uppercase">{form.plateNumber}</span>
                </div>
              )}
              {isAffiliate && (
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Organisation</span>
                  <span className="text-white font-medium">{affForm.saccoName}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-800/60 space-y-2">
                {fees.map((f) => (
                  <div key={f.label} className="flex justify-between text-xs">
                    <span className="text-slate-500">{f.label}</span>
                    <span className="text-slate-300 font-semibold">Ksh {f.amount.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-white font-bold">Total</span>
                <span className="text-orange-500 font-black text-xl">Ksh {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Receipt code */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">
                M-Pesa Receipt Code <span className="text-orange-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500">
                  <FileText size={15} />
                </div>
                <input
                  type="text"
                  value={mpesaReceipt}
                  onChange={(e) => setMpesaReceipt(e.target.value.toUpperCase())}
                  placeholder="e.g. RCX1A2B3C4D"
                  required
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3.5
                             text-white text-sm font-mono tracking-wider placeholder:text-slate-600
                             focus:outline-none focus:border-orange-500/60 transition-all"
                />
              </div>
              <p className="mt-1.5 text-[11px] text-slate-500">
                Found in the M-Pesa confirmation SMS after payment e.g. <span className="font-mono text-slate-400">RCX1A2B3C4D confirmed</span>
              </p>
            </div>

            <div className="flex gap-3">
              <button type="button" disabled={submitting}
                onClick={() => { setError(null); setStep("form"); }}
                className="px-5 py-3.5 bg-slate-950 border border-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-900 disabled:opacity-40 transition-all">
                <ChevronLeft size={14} className="inline mr-1" /> Back
              </button>
              <button type="submit" disabled={submitting}
                className="flex-1 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed
                           text-white font-bold uppercase tracking-wide py-3.5 rounded-xl transition-all
                           flex items-center justify-center gap-2 text-sm shadow-lg shadow-emerald-600/10">
                {submitting ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
                ) : (
                  <><CheckCircle size={15} /> Submit Application</>
                )}
              </button>
            </div>
          </form>
        </div>
      </PageShell>
    );
  }

  return null;
}

// ─── Layout helpers ───────────────────────────────────────────────────────────

function PageShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#0B1220]">{children}</div>;
}

function PageHeader({ badge, title, subtitle, progress }: {
  badge: string;
  title: React.ReactNode;
  subtitle: string;
  progress: React.ReactNode;
}) {
  return (
    <div className="relative bg-[#0B1220] border-b border-slate-800/60 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-orange-500 via-green-600 to-orange-500" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-10 lg:py-14">
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30
                        text-orange-400 text-[11px] font-bold px-3 py-1.5 rounded-full mb-4">
          <ShieldCheck size={11} /> {badge}
        </div>
        <h1 className="font-black text-white text-4xl sm:text-5xl uppercase leading-none mb-3">{title}</h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-lg mb-6">{subtitle}</p>
        {progress}
      </div>
    </div>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 lg:p-8">
      {children}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 text-slate-500 hover:text-slate-300 text-xs font-semibold transition-colors">
      <ChevronLeft size={14} /> Back
    </button>
  );
}

function ErrorBanner({ msg }: { msg: string }) {
  return (
    <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-400 mb-4">
      <AlertCircle size={15} className="shrink-0 mt-0.5" /> {msg}
    </div>
  );
}