import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { signAccessToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body?.email || "").toLowerCase().trim();
    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email und Passwort sind erforderlich." }, { status: 400 });
    }

    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ ok: false, error: "Ungültige Zugangsdaten." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ ok: false, error: "Ungültige Zugangsdaten." }, { status: 401 });
    }

    const token = signAccessToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const res = NextResponse.json({
      ok: true,
      user: { id: user.id, email: user.email, role: user.role, twoFAEnabled: user.twoFAEnabled },
    });

    res.cookies.set("cb_access_token", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return res;
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Serverfehler beim Login." }, { status: 500 });
  }
}
