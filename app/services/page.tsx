"use client";

import Link from "next/link";
import { 
  Briefcase, ShieldCheck, TrendingUp, HeartHandshake, 
  CheckCircle2, ArrowRight, ArrowUpRight, HelpCircle 
} from "lucide-react";

const SERVICES = [
  {
    icon: TrendingUp,
    title: "CBD SACCO Savings & Investment Modules",
    description: "Secure, high-yield digital deposit structures tailored for transport operators. Access competitive dividend models and compound interest returns.",
    benefits: ["Flexible daily/weekly deposits via M-Pesa", "Asset financing paths for fleet growth", "Competitive annual dividend distributions"]
  },
  {
    icon: ShieldCheck,
    title: "Institutional & Legal Compliance Clearance",
    description: "Complete legal framework representation including county permits, route authorization allocations, and statutory regulation matching.",
    benefits: ["County parking & operating hub permits", "National government regulatory alignment", "Legal representation and code management"]
  },
  {
    icon: HeartHandshake,
    title: "Member Welfare & Emergency Support Fund",
    description: "A comprehensive safety net providing medical support coverage, unexpected asset breakdown insurance, and direct family allocation checks.",
    benefits: ["Accident medical expense subsidies", "Bailout support for asset downtime", "Education bursary priority pipelines"]
  }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200 block w-full">
      
      {/* Page Header */}
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
            <Briefcase size={12} /> Operational Portfolios
          </div>
          <h1 className="font-bold text-white text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight leading-none mb-4">
            Our<br />
            <span className="text-orange-500">Services</span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl leading-relaxed">
            Explore our specialized financial systems, regulatory umbrellas, and family protection programs designed for the professional transport industry.
          </p>
        </div>
      </div>

      {/* Main Services Breakdown */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full block">
        <div className="space-y-12">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.title}
                className="bg-slate-900/20 border border-slate-800/80 rounded-3xl p-6 sm:p-8 lg:p-10 grid lg:grid-cols-12 gap-8 items-start transition-all hover:border-slate-800"
              >
                {/* Left side info block */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500">
                    <Icon size={22} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
                      Portfolio Tier 0{index + 1}
                    </span>
                    <h2 className="text-white font-bold text-2xl uppercase tracking-wide leading-tight">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Right side benefit metrics checklist */}
                <div className="lg:col-span-7 bg-slate-950/40 border border-slate-900 rounded-2xl p-6 lg:mt-4 space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Features & Deliverables</h3>
                  <div className="grid sm:grid-cols-1 gap-3">
                    {service.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24 w-full block">
        <div className="bg-gradient-to-br from-slate-900/40 to-slate-900/10 border border-slate-800/80 rounded-3xl p-8 lg:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <p className="text-orange-500 text-xs font-bold uppercase tracking-widest mb-3">Onboarding pipeline</p>
          <h2 className="text-white font-bold text-3xl uppercase tracking-wide mb-4">Ready to activate your access?</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Become a fully vetted member today to start saving with the SACCO, secure your operating node permits, and cover your next of kin profile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-4 rounded-xl transition-all uppercase text-sm tracking-wider shadow-lg shadow-orange-500/10">
              Start Application Form <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-500 text-slate-300 font-bold px-6 py-4 rounded-xl transition-all uppercase text-sm tracking-wider bg-slate-900/40">
              Inquire First <HelpCircle size={16} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}