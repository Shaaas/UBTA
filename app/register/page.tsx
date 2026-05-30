"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  User, Phone, Calendar, CreditCard, FileText,
  Bike, MapPin, Users, Upload, CheckCircle,
  AlertCircle, ArrowRight, ChevronDown, X
} from "lucide-react";

type UploadedFile = { name: string; size: number } | null;

interface FormData {
  fullName: string;
  phone: string;
  dob: string;
  idNumber: string;
  kraPin: string;
  plateNumber: string;
  county: string;
  subCounty: string;
  stageNode: string;
  kinName: string;
  kinPhone: string;
  kinRelationship: string;
}

const COUNTIES = [
  "Nairobi County",
  "Kiambu County",
  "Machakos County",
  "Mombasa County",
  "Nakuru County",
  "Kisumu County",
];

const SUB_COUNTIES: Record<string, string[]> = {
  "Nairobi County": ["Kasarani", "Starehe", "Njiru", "Embakasi", "Westlands"],
  "Kiambu County":  ["Thika Town", "Ruiru", "Kiambu Town", "Limuru", "Kikuyu"],
  "Machakos County": ["Machakos Town", "Athi River", "Kathiani", "Masinga"],
  "Mombasa County": ["Mvita", "Kisauni", "Nyali", "Likoni", "Changamwe"],
  "Nakuru County":  ["Nakuru Town East", "Nakuru Town West", "Naivasha", "Gilgil"],
  "Kisumu County":  ["Kisumu Central", "Kisumu East", "Kisumu West", "Nyando"],
};

const STAGE_NODES = [
  "Githurai 45",
  "Mwiki",
  "Kasarani Stage",
  "Hunters",
  "Santton",
  "Other / Not Listed",
];

const KIN_RELATIONSHIPS = ["Spouse", "Parent", "Sibling", "Child"];

const EMPTY_FORM: FormData = {
  fullName: "", phone: "", dob: "", idNumber: "", kraPin: "",
  plateNumber: "", county: "", subCounty: "", stageNode: "",
  kinName: "", kinPhone: "", kinRelationship: "",
};

function Field({
  icon: Icon, label, name, type = "text", placeholder, value,
  onChange, required = true, pattern, hint,
}: {
  icon: React.ElementType; label: string; name: keyof FormData;
  type?: string; placeholder: string; value: string;
  onChange: (n: keyof FormData, v: string) => void;
  required?: boolean; pattern?: string; hint?: string;
}) {
  return (
    <div className="w-full block">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative w-full">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          <Icon size={16} />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          placeholder={placeholder}
          required={required}
          pattern={pattern}
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-4 py-3.5
                     text-white text-sm placeholder:text-slate-600
                     focus:outline-none focus:border-orange-500/60 focus:bg-slate-900
                     transition-all duration-200"
        />
      </div>
      {hint && <p className="mt-1.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

function SelectField({
  icon: Icon, label, name, value, onChange, options, placeholder, required = true, disabled,
}: {
  icon: React.ElementType; label: string; name: keyof FormData;
  value: string; onChange: (n: keyof FormData, v: string) => void;
  options: string[]; placeholder: string; required?: boolean; disabled?: boolean;
}) {
  return (
    <div className="w-full block">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="relative w-full">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
          <Icon size={16} />
        </div>
        <select
          name={name}
          value={value}
          onChange={(e) => onChange(name, e.target.value)}
          required={required}
          disabled={disabled}
          className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-10 pr-10 py-3.5
                     text-sm focus:outline-none focus:border-orange-500/60 focus:bg-slate-900
                     transition-all duration-200 appearance-none cursor-pointer
                     disabled:opacity-40 disabled:cursor-not-allowed
                     text-white [&>option]:bg-slate-950 [&>option]:text-white"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
      </div>
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onFile({ name: f.name, size: f.size });
  };

  const formatSize = (bytes: number) =>
    bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(0)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  return (
    <div className="w-full block">
      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      {file ? (
        <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3.5">
          <CheckCircle size={16} className="text-green-500 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-white truncate">{file.name}</p>
            <p className="text-xs text-slate-500">{formatSize(file.size)}</p>
          </div>
          <button
            type="button"
            onClick={() => { onFile(null); if (ref.current) ref.current.value = ""; }}
            className="text-slate-500 hover:text-white transition-colors"
            aria-label="Remove file"
          >
            <X size={15} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className="w-full border border-dashed border-slate-700 rounded-xl px-4 py-5
                     flex flex-col items-center gap-2 hover:border-orange-500/50
                     hover:bg-orange-500/5 transition-all group"
        >
          <Upload size={20} className="text-slate-500 group-hover:text-orange-500 transition-colors" />
          <span className="text-sm text-slate-400 group-hover:text-slate-300">Click to upload</span>
          <span className="text-xs text-slate-600">{hint}</span>
        </button>
      )}
      <input
        ref={ref}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        required={required && !file}
      />
    </div>
  );
}

function SectionHeading({
  number, title, subtitle,
}: { number: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4 mb-8 pb-6 border-b border-slate-800">
      <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center
                      font-bold text-white text-sm shrink-0">
        {number}
      </div>
      <div>
        <h2 className="font-bold text-white text-xl uppercase tracking-wide">
          {title}
        </h2>
        <p className="text-slate-500 text-xs mt-1">{subtitle}</p>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [idFile, setIdFile]   = useState<UploadedFile>(null);
  const [kraFile, setKraFile] = useState<UploadedFile>(null);
  const [photoFile, setPhotoFile] = useState<UploadedFile>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = (name: keyof FormData, value: string) => {
    setForm((prev) => {
      let normalizedValue = value;
      
      // Auto-uppercase string data for license plate numbers and KRA PIN strings
      if (name === "kraPin" || name === "plateNumber") {
        normalizedValue = value.toUpperCase();
      }

      const next = { ...prev, [name]: normalizedValue };
      if (name === "county") next.subCounty = "";
      return next;
    });
  };

  const subCountyOptions = form.county ? (SUB_COUNTIES[form.county] ?? []) : [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idFile || !kraFile || !photoFile) {
      setError("Please upload all three required documents before submitting.");
      return;
    }
    setError(null);
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border-2 border-green-500
                          flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-green-500" />
          </div>
          <h1 className="font-bold text-white text-3xl uppercase mb-4">
            Application submitted!
          </h1>
          <p className="text-slate-400 leading-relaxed mb-3">
            Thank you, <strong className="text-white">{form.fullName}</strong>. Your membership
            application has been received and is under review.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            Our team will contact you on <strong className="text-slate-300">{form.phone}</strong> to
            confirm your registration and guide you on next steps including payment of the
            Ksh 1,000 registration fee via M-Pesa.
          </p>
          <div className="space-y-3">
            <a
              href={`https://wa.me/254714314342?text=Hello%20UBTA,%20I%20just%20submitted%20my%20membership%20application.%20My%20name%20is%20${encodeURIComponent(form.fullName)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
            >
              <Phone size={16} /> Follow up on WhatsApp
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
    <div className="min-h-screen bg-[#0B1220]">
      
      {/* Page header */}
      <div className="relative bg-[#0B1220] border-b border-slate-800/60 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-green-600 to-orange-500" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30
                          text-orange-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
            <User size={12} /> Membership Registration
          </div>
          <h1 className="font-bold text-white text-4xl sm:text-5xl uppercase leading-none mb-4">
            Join<br /><span className="text-orange-500">UBTA</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-lg">
            Complete this form accurately. All information is used for legal records and
            institutional compliance. Registration fee: <strong className="text-white">Ksh 1,000</strong> (non-refundable),
            payable via M-Pesa after your application is reviewed.
          </p>

          {/* Progress steps */}
          <div className="flex items-center gap-2 mt-8 flex-wrap">
            {["Personal Details", "Location & Stage", "Next of Kin", "Documents"].map((step, i) => (
              <div key={step} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs text-slate-400 font-semibold">
                    {i + 1}
                  </div>
                  {step}
                </div>
                {i < 3 && <div className="w-6 h-px bg-slate-800" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form body */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-10">

          {/* SECTION 1 */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 lg:p-8">
            <SectionHeading
              number="01"
              title="Personal Details"
              subtitle="Provide completely accurate legal records for institutional compliance clearance."
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <Field
                  icon={User}
                  label="Full Legal Name"
                  name="fullName"
                  placeholder="e.g. John Kamau Njoroge"
                  value={form.fullName}
                  onChange={update}
                  hint="Enter your full name exactly as it appears on your National ID"
                />
              </div>
              <Field
                icon={Phone}
                label="Mobile Contact Number"
                name="phone"
                type="tel"
                placeholder="e.g. 0712 345 678"
                value={form.phone}
                onChange={update}
                hint="Active Safaricom number for M-Pesa and communication"
              />
              <Field
                icon={Calendar}
                label="Date of Birth"
                name="dob"
                type="date"
                placeholder=""
                value={form.dob}
                onChange={update}
              />
              <Field
                icon={CreditCard}
                label="National ID Number"
                name="idNumber"
                placeholder="e.g. 12345678"
                value={form.idNumber}
                onChange={update}
                pattern="[0-9]{7,8}"
                hint="7 or 8 digit number on your National ID card"
              />
              <Field
                icon={FileText}
                label="KRA PIN Number"
                name="kraPin"
                placeholder="e.g. A012345678Z"
                value={form.kraPin}
                onChange={update}
                hint="Found on your KRA PIN certificate (itax.kra.go.ke)"
              />
              <div className="sm:col-span-2">
                <Field
                  icon={Bike}
                  label="Motorbike Plate No."
                  name="plateNumber"
                  placeholder="e.g. KMCD 123A"
                  value={form.plateNumber}
                  onChange={update}
                  hint="Your registered motorbike number plate"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2 */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 lg:p-8">
            <SectionHeading
              number="02"
              title="Location & Stage"
              subtitle="Select your operating county, sub-county, and base operation stage node."
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <SelectField
                icon={MapPin}
                label="Operating County"
                name="county"
                value={form.county}
                onChange={update}
                options={COUNTIES}
                placeholder="Select county"
              />
              <SelectField
                icon={MapPin}
                label="Sub-County Hub"
                name="subCounty"
                value={form.subCounty}
                onChange={update}
                options={subCountyOptions}
                placeholder={form.county ? "Select sub-county" : "Select county first"}
                disabled={!form.county}
              />
              <div className="sm:col-span-2">
                <SelectField
                  icon={Bike}
                  label="Base Operation Stage Node"
                  name="stageNode"
                  value={form.stageNode}
                  onChange={update}
                  options={STAGE_NODES}
                  placeholder="Select your stage"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3 */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 lg:p-8">
            <SectionHeading
              number="03"
              title="Next of Kin Identification Profile"
              subtitle="Emergency contact information — required for all members."
            />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                icon={User}
                label="Kin Full Name"
                name="kinName"
                placeholder="e.g. Mary Wanjiru Kamau"
                value={form.kinName}
                onChange={update}
              />
              <Field
                icon={Phone}
                label="Kin Emergency Contact"
                name="kinPhone"
                type="tel"
                placeholder="e.g. 0722 987 654"
                value={form.kinPhone}
                onChange={update}
              />
              <div className="sm:col-span-2">
                <SelectField
                  icon={Users}
                  label="Legal Relationship"
                  name="kinRelationship"
                  value={form.kinRelationship}
                  onChange={update}
                  options={KIN_RELATIONSHIPS}
                  placeholder="Select relationship"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4 */}
          <div className="bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 lg:p-8">
            <SectionHeading
              number="04"
              title="Required Document Upload"
              subtitle="Upload clear scans or photos. Accepted formats: JPG, PNG, PDF. Max 5MB each."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <UploadField
                label="National ID Copy"
                hint="JPG, PNG or PDF · Max 5MB"
                file={idFile}
                onFile={setIdFile}
              />
              <UploadField
                label="KRA PIN Document"
                hint="JPG, PNG or PDF · Max 5MB"
                file={kraFile}
                onFile={setKraFile}
                accept="image/*,.pdf"
              />
              <UploadField
                label="Passport Size Photo"
                hint="Clear photo · Plain background"
                file={photoFile}
                onFile={setPhotoFile}
                accept="image/*"
              />
            </div>
            <div className="mt-5 flex items-start gap-2 text-xs text-slate-500 bg-slate-900/40 rounded-xl p-4 border border-slate-800">
              <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
              <span>
                All documents are stored securely and used solely for UBTA membership verification
                and SACCO registration compliance. No cash accepted — registration fee of
                Ksh 1,000 paid via M-Pesa after application review.
              </span>
            </div>
          </div>

          {/* Error display */}
          {error && (
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-400">
              <AlertCircle size={16} className="shrink-0 mt-0.5" />
              {error}
            </div>
          )}

          {/* Submit block */}
          <div className="pb-10">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-orange-500 text-white font-bold text-lg uppercase tracking-wide py-4 rounded-2xl hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3 shadow-lg shadow-orange-500/10 cursor-pointer"
            >
              {submitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting Application...
                </>
              ) : (
                <>
                  Submit Registration Application
                  <ArrowRight size={20} />
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-600 mt-4">
              By submitting, you confirm all information is accurate and agree to UBTA's
              membership terms.{" "}
              <Link href="/contact" className="text-orange-500 hover:underline">
                Contact us
              </Link>{" "}
              if you have questions.
            </p>
          </div>

        </div>
      </form>
    </div>
  );
}