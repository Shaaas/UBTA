'use client';

import React, { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  // Safely instantiate the Supabase client once per component mount lifecycle
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(data);
      }
    };
    fetchProfile();
  }, [supabase]);

  if (!profile) return <div className="text-slate-400 p-8">Loading profile metrics...</div>;

  return (
    <div className="p-4 max-w-2xl text-slate-200">
      <h2 className="text-xl font-semibold text-white mb-6 tracking-tight">Personal Information</h2>
      
      <div className="bg-[#1a1b23] rounded-2xl border border-white/[0.01] p-6 space-y-6 shadow-xl">
        {[
          { label: 'Full Name', value: profile.full_name },
          { label: 'Phone Number', value: profile.phone_number },
          { label: 'Working County', value: profile.working_county },
          { label: 'Operating Location', value: profile.current_operating_location },
          { label: 'National ID', value: profile.id_number },
          { label: 'Date of Birth', value: profile.date_of_birth },
        ].map((item) => (
          <div key={item.label} className="flex justify-between items-center border-b border-white/[0.02] pb-4 last:border-none last:pb-0">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">{item.label}</span>
            <span className="font-medium text-white text-sm">{item.value || 'Not Provided'}</span>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-semibold text-white mt-10 mb-6 tracking-tight">Next of Kin Details</h2>
      <div className="bg-[#1a1b23] rounded-2xl border border-white/[0.01] p-6 space-y-6 shadow-xl">
        {[
          { label: 'Name', value: profile.next_of_kin_name },
          { label: 'Contact', value: profile.next_of_kin_contact },
          { label: 'Relationship', value: profile.next_of_kin_relationship },
        ].map((item) => (
          <div key={item.label} className="flex justify-between items-center border-b border-white/[0.02] pb-4 last:border-none last:pb-0">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-medium">{item.label}</span>
            <span className="font-medium text-white text-sm">{item.value || 'Not Provided'}</span>
          </div>
        ))}
      </div>
    </div>
  );
}