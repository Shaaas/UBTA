import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SignJWT } from "jose";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? "ubta-admin-secret-change-in-production"
);

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Verify credentials using pgcrypto
    const { data, error } = await supabase
      .from("admins")
      .select("id, full_name, email, role")
      .eq("email", email.toLowerCase().trim())
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password hash
    const { data: verified } = await supabase.rpc("verify_admin_password", {
      input_email: email.toLowerCase().trim(),
      input_password: password,
    });

    if (!verified) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Issue JWT with role
    const token = await new SignJWT({
      id:       data.id,
      email:    data.email,
      name:     data.full_name,
      role:     data.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("8h")
      .sign(JWT_SECRET);

    const res = NextResponse.json({
      success: true,
      role:    data.role,
      name:    data.full_name,
    });

    // Set HTTP-only cookie
    res.cookies.set("ubta_admin_token", token, {
      httpOnly: true,
      secure:   process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge:   60 * 60 * 8, // 8 hours
      path:     "/",
    });

    return res;

  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}