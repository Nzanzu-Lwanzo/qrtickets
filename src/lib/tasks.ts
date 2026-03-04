import { Queue, Worker } from "bullmq";
import { getCode } from "./utils.ts";
import { v4 } from "uuid";
import { uploadQrCode } from "./qrCode.ts";
import prisma from "./prisma.ts";

export const uploadQueue = new Queue("qrcodesupload", {
  connection: {
    host: process.env["REDIS_HOST"] || "localhost",
    // port: parseInt(process.env["REDIS_PORT"] || "6379"),
    password: process.env["REDIS_PASSWORD"] || "password",
  },
  defaultJobOptions: {
    attempts: 4,
    removeOnComplete: true,
    removeOnFail: false,
    priority: 0,
    backoff: 4,
  },
});

export const uploadWorker = new Worker(
  "qrcodesupload",
  // Processes one Job added to the Queue at a time
  async () => {
    const codes = getCode();
    const cloudID = v4();

    // Generate the QR Code image and upload it
    const qrCode = await uploadQrCode({
      encodable: codes.hash,
      cloudID,
      folder: "sam-kaya-apotheose",
    });

    if (!qrCode.url) {
      return { ticket: undefined };
    }

    const ticket = await prisma.ticket.create({
      data: {
        code: codes.code, // See README for why we don't save the hash instead
        qrCode: qrCode.url,
        cloudID,
      },
    });

    return { ticket };
  },
  {
    connection: {},
    concurrency: 20,
  },
);

uploadWorker.on("completed", (job, data) => {
  // TODO : Emit event to the client
  console.log({ jobID: job.id, qrCode: data.ticket });
});

uploadWorker.on("failed", (job) => {
  // TODO : Emit event to the client
  console.log({ jobID: job?.id, qrCode: undefined });
});
