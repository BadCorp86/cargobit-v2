import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "change_me_super_secure";

export type AuthPayload = {
  sub: string;
  email: string;
  role: "USER" | "ADMIN";
};

export function signAccessToken(payload: AuthPayload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as AuthPayload;
}
