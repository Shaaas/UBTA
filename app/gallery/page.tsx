"use client";

import { useState } from "react";
import type { Metadata } from "next";
import { Image, Camera, Calendar, MapPin, Layers } from "lucide-react";

// Mock Data for Gallery Items
const GALLERY_CATEGORIES = ["All", "Rider Training", "Community", "SACCO Meetings", "Infrastructure"];

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Safety Reflector Launch",
    category: "Community",
    date: "April 2026",
    location: "Githurai 45 Hub",
    image: "/gallery/launch.jpeg",
  },
  {
    id: 2,
    title: "Financial Literacy Seminar",
    category: "SACCO Meetings",
    date: "May 2026",
    location: "Ngara Fig Tree",
    image: "/gallery/sacco-meet.jpeg",
  },
  {
    id: 3,
    title: "First Aid & Safety Training",
    category: "Rider Training",
    date: "March 2026",
    location: "Kasarani Node",
    image: "/gallery/training.jpeg",
  },
  {
    id: 4,
    title: "Regional Agent Setup",
    category: "Infrastructure",
    date: "May 2026",
    location: "Mlolongo Station",
    image: "/gallery/agent.jpeg",
  },
  {
    id: 5,
    title: "Welfare Committee Review",
    category: "Community",
    date: "February 2026",
    location: "Main Office",
    image: "/gallery/welfare.jpeg",
  },
  {
    id: 6,
    title: "Digital Registration Rollout",
    category: "Infrastructure",
    date: "June 2026",
    location: "Njiru Hub",
    image: "/gallery/digital.jpeg",
  },
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeFilter === "All" || item.category === activeFilter
  );

  return (
    <div className="w-full bg-[#0B0F19] min-h-screen text-slate-200 block py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#F37121] text-xs font-black uppercase tracking-widest mb-3">
            UBTA Media Log
          </p>
          <h1 className="text-white font-black text-4xl sm:text-5xl uppercase tracking-tight mb-4">
            Operations Gallery
          </h1>
          <p className="text-gray-400 text-sm font-medium">
            Visual updates from our regional registration nodes, rider empowerment campaigns, and CBD SACCO general meetings.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {GALLERY_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                activeFilter === category
                  ? "bg-[#F37121] text-white shadow-lg shadow-[#F37121]/10"
                  : "bg-[#111827]/60 border border-gray-800 text-gray-400 hover:border-gray-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Display Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-[#111827]/40 border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm hover:border-gray-700 transition-all duration-300"
            >
              {/* Picture Shell Container */}
              <div className="relative w-full h-64 bg-slate-900 flex items-center justify-center overflow-hidden border-b border-gray-800/60">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent opacity-80 pointer-events-none" />
                <Camera size={32} className="text-gray-800/40 relative z-0" />
                
                <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider text-white bg-[#0B0F19]/90 border border-gray-800 px-3 py-1 rounded-md shadow-md">
                  {item.category}
                </span>
              </div>

              {/* Data Strip */}
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

      </div>
    </div>
  );
}