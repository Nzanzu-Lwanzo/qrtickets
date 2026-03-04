import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { uploadQueue } from "./lib/tasks.ts";

const App = express();
const PORT = process.env["PORT"] || 5555;

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

App.listen(PORT, () =>
  console.log(`API running 🚀 on http://localhost:${PORT}`),
);
