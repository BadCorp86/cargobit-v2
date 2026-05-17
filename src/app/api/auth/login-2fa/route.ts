import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { authenticator } from "otplib";
import { db } from "@/lib/db";
import { signAccessToken } from "@/lib/auth";

const JWT_SECRET = process.env.JWT_SECRET || "change_me_super_secure";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const challenge = String(body?.challenge || "");
    const code = String(body?.code || "").trim();

    if (!challenge || !code) {
      return NextResponse.json({ ok: false, error: "Challenge und Code erforderlich." }, { status: 400 });
    }

    const payload = jwt.verify(challenge, JWT_SECRET) as { sub: string; t?: string };
    if (payload.t !== "2fa_challenge") {
      return NextResponse.json({ ok: false, error: "Ungültige Challenge." }, { status: 401 });
    }

    const user = await db.user.findUnique({ where: { id: payload.sub } });
    if (!user || !user.twoFAEnabled || !user.twoFASecret) {
      return NextResponse.json({ ok: false, error: "2FA ist nicht korrekt eingerichtet." }, { status: 401 });
    }

    const isValid = authenticator.verify({ token: code, secret: user.twoFASecret });
    if (!isValid) {
      return NextResponse.json({ ok: false, error: "Ungültiger 2FA-Code." }, { status: 401 });
    }

    const token = signAccessToken({ sub: user.id, email: user.email, role: user.role });
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
  } catch {
    return NextResponse.json({ ok: false, error: "Challenge ungültig oder abgelaufen." }, { status: 401 });
  }
}
