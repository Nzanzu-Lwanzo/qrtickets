import dotenv from "dotenv";
dotenv.config();
import { randomBytes } from "node:crypto";
import { encrypt } from "./crypter.ts";

const secret = process.env["CRYPT_SECRET"];
if (!secret) throw new Error("No secret found to crypt data");

export function getCode() {
  const code = randomBytes(10).toString("hex").slice(0, 10);
  return {
    code,
    hash: hasCode(code),
  };
}

export function hasCode(code: string) {
  return encrypt(code, secret!);
}
