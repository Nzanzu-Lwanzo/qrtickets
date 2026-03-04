import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { uploadQueue } from "./lib/tasks.ts";
import { decrypt } from "./lib/crypter.ts";
import prisma from "./lib/prisma.ts";

const App = express();
const PORT = process.env["PORT"] || 5555;
const SECRET = process.env["CRYPT_SECRET"] || "i-love-her-she-hates-me";

App.use(express.json());

// Generate Qr Codes
App.get("/generate", async (req, res) => {
  const { c } = req.query as unknown as { c: string };
  const pc = parseInt(c);
  if (Number.isNaN(pc)) return res.status(400);

  for (let x = 0; x <= pc; x++) {
    await uploadQueue.add(`upload-${c}-qrcodes`, {});
  }

  return res.json({ message: `${c} qr codes are being generated ...` });
});

/*

TODO : Uncomment if we need to use this endpoint

// Checks that QR Code corresponds to an entry
// Returns the ID of the entry to be sure that's the number of the ticket
App.get("/check/:code", async (req, res) => {
  const data = req.body as { code: string | undefined } | undefined;
  if (!data || (data && !data.code)) return res.status(400);
  const decoded = decrypt(data.code!, SECRET);
  const ticket = await prisma.ticket.findUnique({
    where: {
      code: decoded,
      used: false,
    },
  });

  if (!ticket) return res.status(404);

  // Mark the ticket as used
  const updatedTicket = await prisma.ticket.update({
    where: { id: ticket.id },
    data: {
      used: true,
      code: null,
    },
  });

  return {
    ticketNumber: updatedTicket.id,
    isValid: true,
  };
});

*/
App.listen(PORT, () =>
  console.log(`API running 🚀 on http://localhost:${PORT}`),
);
