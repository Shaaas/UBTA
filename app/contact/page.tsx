"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Mail, Phone, MapPin, Clock, Send, 
  MessageSquare, CheckCircle, AlertCircle, ArrowRight 
} from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      setError("Please fill in all required fields.");
      return;
    }
    setError(null);
    setSubmitting(true);

    // Mock API processing pass
    await new Promise((r) => setTimeout(r, 1500));
    
    setSubmitting(false);
    setSubmitted(true);
    setForm({ name: "", phone: "", subject: "General Inquiry", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 block w-full">
      
      {/* ── HEADER STAGE ────────────────────────────────────────── */}
      <div className="relative bg-[#0B1220] border-b border-slate-800/60 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-green-600 to-orange-500" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <MessageSquare size={12} /> Contact Desk
          </div>
          <h1 className="font-bold text-white text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-none mb-4">
            Get In<br />
            <span className="text-orange-500">Touch</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Have questions about CBD SACCO membership, registration fees, or operations? Reach out directly and our support team will assist you.
          </p>
        </div>
      </div>

      {/* ── CORE GRID SECTION ───────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full block">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: EDITORIAL OFFICE CARD HUB (5 Columns) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-2">Office details</p>
              <h2 className="text-white font-bold text-2xl uppercase tracking-wide">Communication channels</h2>
            </div>

            <div className="grid gap-4 w-full">
              {/* Direct Hotlines */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Call / WhatsApp</h3>
                  <a href="tel:0714314342" className="block text-xl font-bold text-white hover:text-orange-400 transition-colors tracking-tight">
                    0714 314 342
                  </a>
                  <p className="text-slate-500 text-xs mt-1">Official Desk Line</p>
                </div>
              </div>

              {/* Email Communications */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-green-600/10 border border-green-600/20 flex items-center justify-center text-green-400 shrink-0">
                  <Mail size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Support</h3>
                  <a href="mailto:info@ubta.co.ke" className="block text-lg font-bold text-white hover:text-green-400 transition-colors break-all">
                    info@ubta.co.ke
                  </a>
                  <p className="text-slate-500 text-xs mt-1">Compliance & Registry records</p>
                </div>
              </div>

              {/* Head Operations Office */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
                  <MapPin size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Headquarters</h3>
                  <p className="text-white font-bold text-sm leading-snug">
                    Nairobi CBD Hub, Kenya
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Serving Githurai 45, Ngara, Njiru, & Mlolongo stages</p>
                </div>
              </div>

              {/* Office Operational Hours */}
              <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 flex items-start gap-4 transition-all hover:border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Office Hours</h3>
                  <p className="text-white font-bold text-sm">
                    Monday – Saturday: 8:00 AM – 6:00 PM
                  </p>
                  <p className="text-slate-500 text-xs mt-1">Closed on Sundays and Public Holidays</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: GLASSMORPHIC INTERACTIVE FORM STAGE (7 Columns) */}
          <div className="lg:col-span-7 bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 lg:p-10 relative">
            <div className="mb-8">
              <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-1">Digital Intake</p>
              <h2 className="text-white font-bold text-xl uppercase tracking-wide">Send a Secure Message</h2>
            </div>

            {submitted ? (
              <div className="py-8 text-center animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={28} className="text-green-500" />
                </div>
                <h3 className="text-white font-bold text-xl uppercase mb-2">Message Dispatched!</h3>
                <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
                  Thank you for reaching out. Your transmission has been safely logged. Our operational team will contact you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex items-center gap-2 text-xs font-bold text-orange-500 hover:text-orange-400 transition-colors uppercase tracking-wider"
                >
                  Send another message <ArrowRight size={14} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                
                {/* Full Name Input */}
                <div className="group w-full block">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                    Your Name <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Boniface Mwangi"
                      required
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3.5
                                 text-white text-sm placeholder:text-slate-600
                                 focus:outline-none focus:border-orange-500/60 focus:bg-slate-900
                                 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Mobile Number Input */}
                <div className="group w-full block">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                    Mobile Number <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative w-full">
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="e.g. 0712 345 678"
                      required
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3.5
                                 text-white text-sm placeholder:text-slate-600
                                 focus:outline-none focus:border-orange-500/60 focus:bg-slate-900
                                 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Department / Subject Select */}
                <div className="group w-full block">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                    Inquiry Subject
                  </label>
                  <div className="relative w-full">
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3.5
                                 text-sm focus:outline-none focus:border-orange-500/60 focus:bg-slate-900
                                 transition-all duration-200 appearance-none cursor-pointer text-white
                                 [&>option]:bg-slate-950 [&>option]:text-white"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="SACCO Membership">CBD SACCO Savings & Loans</option>
                      <option value="Rider Registration">Rider Registration Help</option>
                      <option value="Compliance / Legal">Compliance & Legal Records</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                      <Clock size={14} className="rotate-90 hidden" /> {/* Placeholder spacing fix */}
                    </div>
                  </div>
                </div>

                {/* Message TextArea */}
                <div className="group w-full block">
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
                    Message Details <span className="text-orange-500">*</span>
                  </label>
                  <div className="relative w-full">
                    <textarea
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Write your question or request here in detail..."
                      required
                      className="w-full bg-slate-900/60 border border-slate-800 rounded-xl px-4 py-3.5
                                 text-white text-sm placeholder:text-slate-600 resize-none
                                 focus:outline-none focus:border-orange-500/60 focus:bg-slate-900
                                 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Error Output Pass */}
                {error && (
                  <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-sm text-red-400">
                    <AlertCircle size={16} className="shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                {/* Submission Action */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-orange-500 text-white font-bold text-sm uppercase tracking-wide py-4 rounded-xl hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing Dispatch...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={14} />
                    </>
                  )}
                </button>

              </form>
            )}
          </div>

        </div>
      </section>

      {/* ── FOOTER REGISTER BANNER ──────────────────────────────── */}
      <section className="py-12 bg-slate-950 w-full block border-t border-slate-900 text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-slate-500 text-xs uppercase tracking-widest mb-2">Ready to take action?</p>
          <p className="text-slate-300 text-sm mb-4">Skip the contact desk and sign up directly as an official member today.</p>
          <Link href="/auth/register" className="inline-flex items-center gap-2 text-orange-500 font-bold text-sm uppercase tracking-wider hover:text-orange-400 transition-colors">
            Go to Registration Form <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  );
}