import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Initialize the master admin client using your secure Service Role Key
// This bypasses RLS rules exclusively on the server to seed your users cleanly
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, 
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// =========================================================================
// PASTE YOUR ENTIRE CONVERTED JSON ARRAY FROM CSVJSON.COM RIGHT HERE:
// =========================================================================
const ridersToImport: any[] = [
  {
    full_name: "Example Rider",
    id_number: "12345678",
    phone_number: "0712345678",
    email_address: "rider1@example.com",
    bike_registration_number: "KMCR 123X",
    date_of_birth: "1995-04-20",
    current_operating_location: "Main Stage",
    working_county: "Nairobi",
    sub_county: "Westlands",
    next_of_kin_name: "Jane Doe",
    next_of_kin_contact: "0722111222",
    next_of_kin_relationship: "Spouse"
  }
  // Delete my example row above and paste all 293 of your real rows here!
];

export async function GET() {
  const report = { successful: 0, failed: 0, errors: [] as string[] };

  for (const rider of ridersToImport) {
    try {
      // 1. Fallback for riders missing emails (Supabase Auth absolutely requires an identifier)
      const cleanEmail = rider.email_address && rider.email_address.includes('@')
        ? rider.email_address.trim().toLowerCase()
        : `rider.${rider.id_number || Math.floor(Math.random() * 1000000)}@ubta.co.ke`;

      // 2. Generate a temporary placeholder password based on their National ID
      const tempPassword = `Ubta!${rider.id_number || 'Secure2026'}`;

      // 3. Provision the authentication account profile shell
      const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: cleanEmail,
        password: tempPassword,
        email_confirm: true, // Auto-confirms so riders don't get spam verification emails
        user_metadata: { phone: rider.phone_number }
      });

      if (authError || !authUser.user) {
        throw new Error(`Auth account creation skipped for ${rider.full_name}: ${authError?.message}`);
      }

      // 4. Link the authentication identity directly to their public metadata profile row
      const { error: profileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: authUser.user.id, // The critical foundational UUID link
          full_name: rider.full_name,
          phone_number: rider.phone_number?.toString(),
          id_number: rider.id_number?.toString(),
          bike_registration_number: rider.bike_registration_number,
          date_of_birth: rider.date_of_birth || null,
          current_operating_location: rider.current_operating_location,
          working_county: rider.working_county,
          sub_county: rider.sub_county,
          next_of_kin_name: rider.next_of_kin_name,
          next_of_kin_contact: rider.next_of_kin_contact?.toString(),
          next_of_kin_relationship: rider.next_of_kin_relationship,
          welfare_balance: 0.00,
          sacco_balance: 0.00
        });

      if (profileError) {
        // Garbage collection: wipe the auth identity if profile creation fails so we don't create phantom accounts
        await supabaseAdmin.auth.admin.deleteUser(authUser.user.id);
        throw new Error(`Profile insertion failed for ${rider.full_name}: ${profileError.message}`);
      }

      report.successful++;
    } catch (err: any) {
      report.failed++;
      report.errors.push(err.message || err);
    }
  }

  return NextResponse.json({ message: "Database seeding sequence completed", report });
}