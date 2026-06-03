import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Calendar, ArrowRight, User, Tag } from "lucide-react";

export const metadata: Metadata = {
  title: "News & Bulletins — UBTA",
  description: "Stay updated on operational milestones, legal policy modifications, and financial notices from UBTA and CBD SACCO.",
};

const ARTICLES = [
  {
    slug: "sacco-dividend-framework-2026",
    title: "CBD SACCO Announces Capital Reserves Optimization Path",
    excerpt: "The executive committee outlines interest payout structures and localized credit allocations for active registered compliance members this quarter.",
    date: "June 02, 2026",
    author: "Sarah Wanjiku",
    tag: "SACCO Update",
    bgCover: "/news/sacco.jpeg"
  },
  {
    slug: "githurai-compliance-milestone",
    title: "Githurai 45 Node Crosses 300+ Verified Rider Registrations",
    excerpt: "Increased field agent deployments optimize safety matrix tracking and verification processes across transport lines on Thika Road.",
    date: "May 24, 2026",
    author: "James Muigai",
    tag: "Association",
    bgCover: "/news/riders.jpeg"
  },
  {
    slug: "digital-id-card-distribution",
    title: "Rollout of QR-Integrated Member Identification Jackets",
    excerpt: "New distribution networks are ready. Members can verify their active accounts at assigned satellite offices starting Monday morning.",
    date: "May 11, 2026",
    author: "Operations Desk",
    tag: "Operational",
    bgCover: "/news/security.jpeg"
  }
];

export default function NewsPage() {
  return (
    <div className="w-full bg-[#0B0F19] min-h-screen text-slate-200 block py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="border-b border-gray-800 pb-12 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[#F37121] text-xs font-black uppercase tracking-widest mb-3">Official Noticeboard</p>
            <h1 className="text-white font-black text-4xl sm:text-5xl uppercase tracking-tight mb-4">
              News & Bulletins
            </h1>
            <p className="text-gray-400 text-sm font-medium">
              Track strategic breakthroughs, administrative updates, and institutional advocacy actions directly from the leadership council.
            </p>
          </div>
          
          <div className="bg-[#111827]/40 border border-gray-800 p-4 rounded-xl backdrop-blur-sm shrink-0">
            <span className="text-[10px] font-black text-[#00A651] uppercase tracking-wider block mb-1">System Status</span>
            <p className="text-white text-xs font-semibold">All 4 Regional Registration Nodes Online</p>
          </div>
        </div>

        {/* Article Grid Map */}
        <div className="grid gap-8">
          {ARTICLES.map((article) => (
            <article 
              key={article.slug}
              className="bg-[#111827]/40 border border-gray-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm grid md:grid-cols-12 transition-all hover:border-gray-700 group"
            >
              {/* Cover Mock Block */}
              <div className="md:col-span-4 bg-gradient-to-br from-[#1F2937] to-[#0B0F19] min-h-[200px] relative flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-800">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{ backgroundImage: `url('${article.bgCover}')` }}
                />
                <FileText size={36} className="text-gray-800 relative z-0" />
              </div>

              {/* Content Panel */}
              <div className="md:col-span-8 p-6 lg:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-wider mb-3">
                    <span className="inline-flex items-center gap-1 text-[#F37121] bg-[#F37121]/5 border border-[#F37121]/10 px-2.5 py-0.5 rounded-md">
                      <Tag size={10} /> {article.tag}
                    </span>
                    <span className="text-gray-500 font-mono flex items-center gap-1">
                      <Calendar size={11} /> {article.date}
                    </span>
                  </div>

                  <h2 className="text-white font-black text-lg lg:text-xl uppercase tracking-wide group-hover:text-[#F37121] transition-colors mb-3">
                    {article.title}
                  </h2>
                  
                  <p className="text-gray-400 text-xs sm:text-sm font-medium leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-800/60 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center text-[9px] uppercase font-black text-gray-400">
                      {article.author[0]}
                    </div>
                    <span>By {article.author}</span>
                  </div>

                  <Link 
                    href={`/news/${article.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-wide text-[#00A651] hover:text-[#008f45] transition-colors"
                  >
                    Read Directive <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

            </article>
          ))}
        </div>

      </div>
    </div>
  );
}