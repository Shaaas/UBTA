import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-[#111827] border-b border-gray-800 sticky top-0 z-50 backdrop-blur-md bg-opacity-90">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">

        {/* Brand Logo & Institutional Titles */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none max-w-[30%]">
          <div className="bg-white p-1 rounded-full shadow-md flex items-center justify-center h-11 w-11 min-w-[44px]">
            <Image 
              src="/ubta logo.jpeg"   
              alt="UBTA Official Logo"
              width={40}             
              height={40}
              className="object-contain max-h-full max-w-full rounded-full"
              priority              
            />
          </div>
          <div className="flex flex-col leading-tight hidden md:flex">
            <span className="text-base font-black tracking-tight text-white">UBTA</span>
            <span className="text-[10px] text-gray-400 font-medium truncate">United Boda Transport Association</span>
          </div>
        </Link>

        {/* Central Nav Links Cluster */}
        <div className="flex items-center gap-5 text-sm font-semibold overflow-x-auto no-scrollbar px-2">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors duration-150 whitespace-nowrap">Home</Link>
          <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-150 whitespace-nowrap">About</Link>
          <Link href="/sacco" className="text-gray-300 hover:text-white transition-colors duration-150 whitespace-nowrap">CBD SACCO</Link>
          <Link href="/leadership" className="text-gray-300 hover:text-white transition-colors duration-150 whitespace-nowrap">Leadership</Link>
          <Link href="/services" className="text-gray-300 hover:text-white transition-colors duration-150 whitespace-nowrap">Services</Link>
          <Link href="/verify" className="text-gray-300 hover:text-white transition-colors duration-150 whitespace-nowrap">Verify</Link>
          <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-150 whitespace-nowrap">Contact</Link>
        </div>

        {/* Right Action Button Pillars */}
        <div className="flex items-center gap-3 min-w-fit">
          <Link href="/auth/register" className="px-4 py-2 bg-[#00A651] text-white text-sm font-bold rounded-lg hover:bg-[#008c43] transition-colors whitespace-nowrap">
            Register
          </Link>
          <Link href="/auth/login" className="px-4 py-2 bg-transparent text-[#F37121] text-sm font-bold rounded-lg border border-[#F37121] hover:bg-[#F37121]/10 transition-all whitespace-nowrap">
            Member Login
          </Link>
        </div>

      </div>
    </nav>
  );
}