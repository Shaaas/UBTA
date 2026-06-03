'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { LayoutDashboard, User, CreditCard, PiggyBank, FileText, LogOut, ChevronDown } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [firstName, setFirstName] = useState('Member');

  const [supabase] = useState(() => 
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  useEffect(() => {
    const fetchUserContext = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('full_name')
          .eq('id', user.id)
          .single();
        
        if (profile?.full_name) {
          setFirstName(profile.full_name.split(' ')[0]);
        }
      }
    };
    fetchUserContext();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={18} /> },
    { name: 'My Profile', path: '/dashboard/profile', icon: <User size={18} /> },
    { name: 'Payments', path: '/dashboard/payments', icon: <CreditCard size={18} /> },
    { name: 'Savings', path: '/dashboard/savings', icon: <PiggyBank size={18} /> },
    { name: 'Loan Status', path: '/dashboard/loan-status', icon: <FileText size={18} /> },
  ];

  return (
    <div className="flex h-screen bg-[#121318] font-sans antialiased text-slate-300">
      {/* Sidebar navigation drawer */}
      <aside className="w-64 bg-[#1a1b23] flex flex-col justify-between border-r border-white/[0.02]">
        <div>
          <div className="h-20 flex items-center px-6 border-b border-white/[0.02]">
            <h1 className="text-md font-semibold tracking-wide text-white">UBTA Member Portal</h1>
          </div>
          <nav className="mt-6 px-4 space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  href={item.path} 
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive 
                      ? 'bg-orange-500/10 text-orange-400 border border-orange-500/10' 
                      : 'text-slate-400 hover:bg-white/[0.02] hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-orange-400' : 'opacity-70'}>
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-white/[0.02]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-red-950/20 hover:text-red-400 transition"
          >
            <LogOut size={18} className="opacity-70" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      
      {/* Structural view body canvas */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-[#1a1b23] flex items-center justify-end px-8 border-b border-white/[0.02] relative">
          
          {/* Interactive header profile action dropdown */}
          <div className="relative">
            <button 
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="flex items-center space-x-2 text-sm font-medium text-slate-300 hover:text-white transition focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xs uppercase">
                {firstName.charAt(0)}
              </div>
              <span>{firstName}</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${profileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {profileMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setProfileMenuOpen(false)} 
                />
                <div className="absolute right-0 mt-2 w-48 bg-[#1a1b23] border border-white/[0.04] rounded-xl shadow-2xl py-1 z-20 animate-in fade-in slide-in-from-top-1 duration-150">
                  <Link 
                    href="/dashboard/profile" 
                    onClick={() => setProfileMenuOpen(false)}
                    className="block px-4 py-2.5 text-xs text-slate-400 hover:bg-white/[0.02] hover:text-white transition"
                  >
                    View Account Profile
                  </Link>
                  <button 
                    onClick={() => {
                      setProfileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left block px-4 py-2.5 text-xs text-red-400 hover:bg-red-950/10 transition border-t border-white/[0.02]"
                  >
                    Disconnect Session
                  </button>
                </div>
              </>
            )}
          </div>

        </header>
        <main className="flex-1 overflow-y-auto bg-[#13141a] p-8">
          {children}
        </main>
      </div>
    </div>
  );
}