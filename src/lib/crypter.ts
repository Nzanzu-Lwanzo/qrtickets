import crypto from "crypto";

const algorithm = "aes-256-gcm";

export function encrypt(text: string, secret: string) {
  const iv = crypto.randomBytes(16);
  const key = crypto.createHash("sha256").update(secret).digest();

  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${tag.toString("hex")}:${encrypted.toString("hex")}`;
}

export function decrypt(encryptedData: string, secret: string) {
  const hexs = encryptedData.split(":");

  if (hexs.some((hex) => typeof hex !== "string")) {
    throw new Error("Corrupted encrypted string");
  }
  const [ivHex, tagHex, dataHex] = hexs;

  const iv = Buffer.from(ivHex!, "hex");
  const tag = Buffer.from(tagHex!, "hex");
  const encrypted = Buffer.from(dataHex!, "hex");
  const key = crypto.createHash("sha256").update(secret).digest();

  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}
