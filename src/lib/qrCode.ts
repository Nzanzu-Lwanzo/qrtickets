import { cloudBucket } from "./bucket.ts";
import { BUCKET_FOLDER_NAME } from "./constants.ts";
import QRCode from "qrcode";

export function uploadQrCode({
  encodable,
  folder,
  cloudID,
}: {
  encodable: string;
  folder: string;
  cloudID: string;
}): Promise<{
  url: string | undefined;
  cloudID: string | undefined;
}> {
  return new Promise((res) => {
    const stream = cloudBucket.uploader.upload_stream(
      {
        folder: `/${BUCKET_FOLDER_NAME}/${folder}`,
        format: "png", // QRCode.<toFileStream> only works with png for now
        type: "upload",
        unique_filename: true,
        public_id: cloudID,
      },
      (err, result) => {
        if (err || !result) {
          res({
            url: undefined,
            cloudID: undefined,
          });
        }

        res({
          url: result?.url,
          cloudID: result?.public_id,
        });
      },
    );

    QRCode.toFileStream(stream, encodable);
  });
}
