import dotenv from "dotenv";
dotenv.config();
import { v2 } from "cloudinary";

v2.config({
  cloud_name: process.env["CLOUDINARY_CLOUDNAME"] || "no-name",
  api_key: process.env["CLOUDINARY_APIKEY"] || "no-api-key",
  api_secret: process.env["CLOUDINARY_APISECRET"] || "no-api-secret",
});

/**
 * Generate a downloadable link for Cloudinary assets
 */
export function downloadableURL({ cloudID }: { cloudID: string }) {
  return v2.url(cloudID, {
    flags: "attachment",
  });
}

export { v2 as cloudBucket };
