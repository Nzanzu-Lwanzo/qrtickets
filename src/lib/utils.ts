import dotenv from "dotenv";
dotenv.config();
import { randomBytes } from "node:crypto";
import { encrypt } from "./crypter.ts";
import { v2 } from "cloudinary";

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

/**
 * Generate a downloadable link for Cloudinary assets
 */
export function downloadableURL({ cloudID }: { cloudID: string }) {
  return v2.url(cloudID, {
    flags: "attachment",
  });
}

export function getEncodable(from: string) {
  return from;
}
