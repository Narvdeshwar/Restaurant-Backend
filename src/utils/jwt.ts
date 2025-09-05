import jwt, { Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = (process.env.JWT_SECRET || "MustHeyThisIsYouBeGoThroughThisRequired") as Secret;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export function signJwt(payload: object): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
