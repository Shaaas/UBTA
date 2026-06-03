import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0B0F19] border-t border-slate-800/60 text-gray-400 text-xs py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Column 1: Institutional Core Summary */}
        <div className="space-y-3">
          <h3 className="text-base font-black text-white tracking-tight uppercase">UBTA</h3>
          <p className="leading-relaxed text-gray-400 max-w-xs text-xs font-medium">
            United Boda Transport Association! Empowering riders through structured leadership, digital verification, and long-term financial growth.
          </p>
        </div>

        {/* Column 2: Quick Navigation Links */}
        <div className="space-y-2.5">
          <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Quick Links</h4>
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link href="/about" className="hover:text-white transition-colors">About UBTA</Link>
            <Link href="/sacco" className="hover:text-white transition-colors">CBD SACCO</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/gallery" className="hover:text-white transition-colors">Operations Gallery</Link>
            <Link href="/news" className="hover:text-white transition-colors">News & Bulletins</Link>
            <Link href="/verify" className="hover:text-white transition-colors">Verify Member</Link>
          </div>
        </div>

        {/* Column 3: Regional Agent Clearance Nodes */}
        <div className="space-y-2.5">
          <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Agent Locations</h4>
          <div className="flex flex-col space-y-2 text-sm text-gray-300 font-medium">
            <span className="block hover:text-white transition-colors">📍 Githurai 45 Hub</span>
            <span className="block hover:text-white transition-colors">📍 Ngara – Fig Tree</span>
            <span className="block hover:text-white transition-colors">📍 Njiru – Kangundo Rd</span>
          </div>
        </div>

        {/* Column 4: Contact & Social Links */}
        <div className="space-y-4">
          <div>
            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">Contact</h4>
            <div className="flex flex-col space-y-2 text-sm font-medium">
              <a href="tel:0714314342" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-mono">
                <span className="text-xs">📞</span> 0714 314 342
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2.5">Follow Us</h4>
            {/* Inline Row of Official Social Icons */}
            <div className="flex items-center gap-4">
              
              {/* WhatsApp */}
              <a 
                href="https://wa.me/254714314342" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.436 0 9.86-4.413 9.863-9.84.001-2.63-1.019-5.101-2.871-6.954C16.353 1.96 13.89 .941 11.265.941c-5.436 0-9.861 4.413-9.864 9.84-.001 2.126.554 4.2 1.611 5.973l-.979 3.578 3.664-.961zm11.218-5.183c-.302-.15-.1.545-.302-.151l-.755-.377c-.15-.076-.26-.112-.372.056-.112.168-.43.542-.527.654-.097.112-.194.127-.496.023-1.014-.418-1.722-.924-2.279-1.881-.148-.255-.015-.393.117-.525.119-.119.261-.305.392-.458.131-.153.175-.261.262-.436.087-.175.044-.329-.022-.462-.065-.133-.527-1.272-.722-1.742-.19-.459-.382-.397-.527-.404-.136-.007-.292-.008-.449-.008-.157 0-.413.059-.629.295-.216.236-.824.805-.824 1.963 0 1.158.843 2.278.96 2.436.118.158 1.66 2.534 4.021 3.556.561.242 1.0.387 1.343.496.564.179 1.077.154 1.482.094.452-.067 1.393-.569 1.589-1.118.196-.549.196-1.019.137-1.118-.058-.099-.216-.15-.518-.301z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://www.facebook.com/share/1KEszq9f5m/" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-[#1877F2] transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@united.boda.trans?_r=1&_t=ZS-96uapdNcpPM" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.05 1.62 4.2 1.23 1.33 2.97 2.09 4.77 2.27v3.6c-1.4-.12-2.78-.65-3.92-1.49-.66-.49-1.22-1.11-1.65-1.81v6.24c.02 2.44-.9 4.88-2.61 6.6-1.79 1.86-4.43 2.75-6.98 2.41-2.91-.34-5.46-2.5-6.16-5.34-.88-3.41.93-7.23 4.26-8.39.82-.29 1.7-.42 2.57-.38v3.63c-.69-.07-1.41.07-2.02.43-1.07.61-1.61 1.89-1.39 3.11.22 1.28 1.32 2.25 2.63 2.29 1.5.07 2.82-1.04 2.97-2.54.02-.21.02-.43.02-.64V0h1.16z"/>
                </svg>
              </a>

              {/* X (formerly Twitter) */}
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="text-gray-400 hover:text-[#0A66C2] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>

            </div>
          </div>
        </div>

      </div>

      {/* Baseline Attributions Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-slate-800/40 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
        <p className="font-medium text-gray-500">
          © 2026 CBD United Boda Transport Co-Operative Society Limited. All Rights Reserved.
        </p>
        <p className="font-semibold text-gray-500 tracking-wide">
          Built by <span className="text-[#F37121] hover:underline cursor-pointer">Mutanu Studio</span>
        </p>
      </div>
    </footer>
  );
}