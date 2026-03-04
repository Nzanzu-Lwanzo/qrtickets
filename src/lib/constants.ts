// For the crypter
export const SALT_LENGTH = process.env["SALT_LENGTH"]
  ? parseInt(process.env["SALT_LENGTH"])
  : undefined;
export const ITERATIONS = process.env["ITERATIONS"]
  ? parseInt(process.env["ITERATIONS"])
  : undefined;
export const KEY_LENGTH = process.env["KEY_LENGTH"]
  ? parseInt(process.env["KEY_LENGTH"])
  : undefined;
export const DIGEST = "sha512";

export const BACKEND_ORIGIN =
  process.env["BACKEND_ORIGIN"] || "https://qrtickets.lwanzo.site";
export const BUCKET_FOLDER_NAME = "qrTickets";
