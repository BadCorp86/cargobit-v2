import { NextResponse } from "next/server";
import { authenticator } from "otplib";
import QRCode from "qrcode";
import { db } from "@/lib/db";
import { verifyAccessToken } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const token = cookieHeader.match(/cb_access_token=([^;]+)/)?.[1];
    if (!token) return NextResponse.json({ ok: false, error: "Nicht eingeloggt." }, { status: 401 });

    const auth = verifyAccessToken(token);
    if (auth.role !== "ADMIN") return NextResponse.json({ ok: false, error: "Kein Zugriff." }, { status: 403 });

    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(auth.email, "CargoBit v2", secret);
    const qrDataUrl = await QRCode.toDataURL(otpauth);

    await db.user.update({
      where: { id: auth.sub },
      data: { twoFASecret: secret, twoFAEnabled: false },
    });

    return NextResponse.json({ ok: true, secret, otpauth, qrDataUrl });
  } catch {
    return NextResponse.json({ ok: false, error: "2FA Enrollment fehlgeschlagen." }, { status: 500 });
  }
}
