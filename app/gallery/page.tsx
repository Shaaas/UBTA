"use client";

import { useState, useEffect } from "react";
import { Camera, Calendar, MapPin } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const GALLERY_CATEGORIES = ["All", "Rider Training", "Community", "SACCO Meetings", "Infrastructure"];

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  image_url: string;
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      const { data } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      setItems(data ?? []);
      setLoading(false);
    }
    fetchGallery();
  }, []);

  const filteredItems = items.filter(
    (item) => activeFilter === "All" || item.category === activeFilter
  );

  return (
    <div className="w-full bg-[#0B0F19] min-h-screen text-slate-200 block py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#F37121] text-xs font-black uppercase tracking-widest mb-3">UBTA Media Log</p>
          <h1 className="text-white font-black text-4xl sm:text-5xl uppercase tracking-tight mb-4">Operations Gallery</h1>
          <p className="text-gray-400 text-sm font-medium">
            Visual updates from our regional registration nodes, rider empowerment campaigns, and CBD SACCO general meetings.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {GALLERY_CATEGORIES.map((category) => (
            <button key={category} onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                activeFilter === category
                  ? "bg-[#F37121] text-white shadow-lg shadow-[#F37121]/10"
                  : "bg-[#111827]/60 border border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
              }`}>
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading gallery...</div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No photos yet in this category.</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id}
                className="group bg-[#111827]/40 border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm hover:border-gray-700 transition-all duration-300">
                <div className="relative w-full h-64 bg-slate-900 flex items-center justify-center overflow-hidden border-b border-gray-800/60">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${item.image_url}')` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80 pointer-events-none" />
                  <Camera size={32} className="text-gray-800/40 relative z-0" />
                  <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider text-white bg-[#0B0F19]/90 border border-gray-800 px-3 py-1 rounded-md shadow-md">
                    {item.category}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-white font-black text-sm uppercase tracking-wide group-hover:text-[#F37121] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium font-mono">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-[#00A651]" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={12} className="text-[#F37121]" />
                      <span className="truncate max-w-[140px]">{item.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
