import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#111827] border-t border-gray-800 text-gray-400 text-xs py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1: Institutional Core Summary */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-white tracking-tight">UBTA</h3>
          <p className="leading-relaxed text-gray-400 max-w-xs">
            United Boda Transport Association — empowering riders through structured leadership and financial growth.
          </p>
        </div>

        {/* Column 2: Quick Navigation Links */}
        <div className="space-y-2.5">
          <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link href="/about" className="hover:text-white transition-colors">About UBTA</Link>
            <Link href="/sacco" className="hover:text-white transition-colors">CBD SACCO</Link>
            <Link href="/leadership" className="hover:text-white transition-colors">Leadership</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        {/* Column 3: Regional Agent Clearance Nodes */}
        <div className="space-y-2.5">
          <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Agent Locations</h4>
          <div className="flex flex-col space-y-2 text-sm text-gray-300 font-medium">
            <span className="block">Githurai 45</span>
            <span className="block">Ngara – Fig Tree</span>
            <span className="block">Njiru – Kangundo Rd</span>
          
          </div>
        </div>

        {/* Column 4: Contact & Social Nodes */}
        <div className="space-y-2.5">
          <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col space-y-2.5 text-sm font-medium">
            <a href="tel:0714314342" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-mono">
              <span>📞</span> 0714 314 342
            </a>
            <a href="https://wa.me/254714314342" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <span className="text-[#00A651]">💬</span> WhatsApp Us
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
              <span className="text-[#2096D4]">👤</span> UBTA Kenya
            </a>
          </div>
        </div>

      </div>

      {/* Baseline Attributions Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
        <p className="font-medium text-gray-500">
          © 2026 CBD United Boda Transport Co-Operative Society Limited. All Rights Reserved.
        </p>
        <p className="font-semibold text-gray-500">
          Built by <span className="text-[#F37121] hover:underline cursor-pointer">Mutanu Studio</span>
        </p>
      </div>
    </footer>
  );
}